import { NextResponse } from "next/server";

// Runs on Vercel's own cron scheduler (see vercel.json), not GitHub Actions
// and not Supabase's pg_cron. This matters specifically because Supabase only
// counts real external API requests toward its 7-day free-tier inactivity
// pause - pg_cron executions happen inside the database and don't count at
// all. This route makes a genuine external HTTP call every time it fires,
// which does count, and reuses that call to run the stale-leads archive job
// on the same trip (safe to call more than strictly necessary - the SQL
// function gates itself and no-ops if it already ran within the last 4 days).

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
