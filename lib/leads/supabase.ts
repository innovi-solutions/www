import type { LeadInput } from "./schema";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const MIN_ELAPSED_MS = 3000; // forms filled in under 3s are bots
const DUPLICATE_WINDOW_MIN = 10; // same email within 10 min = duplicate
const DAILY_EMAIL_CAP = 50; // max notification emails per day
const RATE_LIMIT_PER_MINUTE = 3;
const RATE_LIMIT_PER_DAY = 10;

function headers(extra?: Record<string, string>) {
  return {
    apikey: SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function isHoneypotFilled(payload: LeadInput): boolean {
  return payload.website.trim().length > 0;
}

export function isTooFast(payload: LeadInput): boolean {
  return payload.elapsedMs < MIN_ELAPSED_MS;
}

async function countLeads(params: URLSearchParams): Promise<number> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/leads?${params.toString()}`, {
    headers: headers({ Prefer: "count=exact", Range: "0-0" }),
  });
  const range = res.headers.get("content-range"); // "0-0/<total>"
  const total = range?.split("/")[1];
  return total ? parseInt(total, 10) : 0;
}

export async function isRecentDuplicate(email: string): Promise<boolean> {
  const cutoff = new Date(Date.now() - DUPLICATE_WINDOW_MIN * 60_000).toISOString();
  try {
    const params = new URLSearchParams({
      email: `eq.${email.toLowerCase()}`,
      created_at: `gte.${cutoff}`,
      select: "id",
    });
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads?${params.toString()}`, {
      headers: headers({ Range: "0-0" }),
    });
    if (!res.ok) return false;
    const rows = await res.json();
    return Array.isArray(rows) && rows.length > 0;
  } catch {
    return false; // fail-open, matches the Python backend
  }
}

export async function isRateLimited(ipHash: string): Promise<boolean> {
  try {
    const minuteCutoff = new Date(Date.now() - 60_000).toISOString();
    const dayCutoff = new Date(Date.now() - 24 * 60 * 60_000).toISOString();

    const perMinute = await countLeads(
      new URLSearchParams({ ip_hash: `eq.${ipHash}`, created_at: `gte.${minuteCutoff}` }),
    );
    if (perMinute >= RATE_LIMIT_PER_MINUTE) return true;

    const perDay = await countLeads(
      new URLSearchParams({ ip_hash: `eq.${ipHash}`, created_at: `gte.${dayCutoff}` }),
    );
    return perDay >= RATE_LIMIT_PER_DAY;
  } catch {
    return false; // fail-open
  }
}

export async function emailCapReached(): Promise<boolean> {
  try {
    const midnight = new Date();
    midnight.setUTCHours(0, 0, 0, 0);
    const count = await countLeads(
      new URLSearchParams({ email_sent: "eq.true", created_at: `gte.${midnight.toISOString()}` }),
    );
    return count >= DAILY_EMAIL_CAP;
  } catch {
    return true; // fail-closed, protect the quota - matches the Python backend
  }
}

export async function insertLead(payload: LeadInput, ip: string): Promise<string | null> {
  try {
    const ipHash = await hashIp(ip);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: headers({ Prefer: "return=representation" }),
      body: JSON.stringify({
        session_type: payload.session,
        name: payload.name,
        email: payload.email.toLowerCase(),
        company: payload.company,
        preferred_date: payload.date,
        project_type: payload.type,
        message: payload.message,
        consent: payload.consent,
        ip_hash: ipHash,
      }),
    });
    if (!res.ok) return null;
    const rows = await res.json();
    return rows?.[0]?.id ?? null;
  } catch {
    return null;
  }
}

export async function markEmailSent(leadId: string): Promise<void> {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/leads?id=eq.${leadId}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify({ email_sent: true }),
    });
  } catch {
    // non-fatal - the lead is already safely stored
  }
}
