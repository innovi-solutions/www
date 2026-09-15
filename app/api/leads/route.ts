import { NextResponse, after } from "next/server";
import { leadSchema } from "@/lib/leads/schema";
import {
  hashIp,
  isHoneypotFilled,
  isTooFast,
  isRateLimited,
  isRecentDuplicate,
  emailCapReached,
  insertLead,
} from "@/lib/leads/supabase";
import { verifyTurnstile } from "@/lib/leads/turnstile";
import { sendLeadNotification, sendLeadConfirmation } from "@/lib/leads/email";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

const OK_RESPONSE = { ok: true, message: "Request received. We'll be in touch soon." };

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, message: firstIssue?.message ?? "Invalid submission." },
      { status: 400 },
    );
  }
  const payload = parsed.data;
  const ip = clientIp(request);

  if (isHoneypotFilled(payload)) {
    console.warn(`[leads] Silent drop (honeypot filled) from ${ip}`);
    return NextResponse.json(OK_RESPONSE);
  }
  if (isTooFast(payload)) {
    console.warn(`[leads] Silent drop (too fast: ${payload.elapsedMs}ms) from ${ip}`);
    return NextResponse.json(OK_RESPONSE);
  }

  const ipHash = await hashIp(ip);
  if (await isRateLimited(ipHash)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  if (!(await verifyTurnstile(payload.turnstileToken, ip))) {
    console.warn(`[leads] Turnstile failed from ${ip}`);
    return NextResponse.json(
      { ok: false, message: "Verification failed. Please refresh and try again." },
      { status: 403 },
    );
  }

  if (await isRecentDuplicate(payload.email)) {
    console.log(`[leads] Duplicate suppressed: ${payload.email}`);
    return NextResponse.json(OK_RESPONSE);
  }

  const leadId = await insertLead(payload, ip);
  if (!leadId) {
    return NextResponse.json({ ok: false, message: "Please try again shortly." }, { status: 503 });
  }

  if (await emailCapReached()) {
    console.warn(`[leads] Daily email cap reached - lead ${leadId} stored, notification skipped`);
    return NextResponse.json(OK_RESPONSE);
  }

  after(() => Promise.all([sendLeadNotification(leadId, payload), sendLeadConfirmation(payload)]));
  return NextResponse.json(OK_RESPONSE);
}
