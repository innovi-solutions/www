import { NextResponse } from "next/server";

// Triggered by Vercel Cron (vercel.json), not pg_cron - Supabase only counts
// external requests toward its inactivity pause, not internal DB cron jobs.

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json(
      { ok: false, message: "SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY not configured" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/rpc/archive_stale_leads`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json({ ok: false, status: res.status, body: text }, { status: 502 });
    }
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 502 });
  }

  return NextResponse.json({ ok: true, ranAt: new Date().toISOString() });
}
