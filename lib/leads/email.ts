import type { LeadInput } from "./schema";
import { markEmailSent } from "./supabase";
import { SITE_URL } from "../site";

const SESSION_LABELS: Record<string, string> = {
  discovery: "Discovery Call, 30 minutes",
  technical: "Technical Deep Dive, 60 minutes",
};
const SESSION_SHORT: Record<string, string> = {
  discovery: "Discovery Call (30 min)",
  technical: "Technical Deep Dive (60 min)",
};

const ACCENT = "#0a0a0a";
const FG = "#0a0a0a";
const MUTED = "#6b7280";
const BORDER = "#e5e7eb";
const BG = "#f4f4f5";
const CARD = "#ffffff";
const MONO = "'Courier New', Courier, monospace";
const SANS = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function label(text: string): string {
  return `<span style="font-family:${MONO};font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${MUTED};">${text}</span>`;
}

function numberedRow(n: string, fieldLabel: string, value: string, last = false): string {
  const border = last ? "" : `border-bottom:1px solid ${BORDER};`;
  return `
    <tr>
      <td style="padding:16px 0;${border}width:48px;vertical-align:top;">
        <span style="font-family:${MONO};font-size:13px;color:${ACCENT};">${n}<span style="color:${MUTED};">/</span></span>
      </td>
      <td style="padding:16px 0;${border}vertical-align:top;">
        ${label(fieldLabel)}
        <div style="margin-top:6px;font-family:${SANS};font-size:16px;color:${FG};">${value}</div>
      </td>
    </tr>`;
}

export function buildLeadEmailHtml(leadId: string, payload: LeadInput): string {
  const name = esc(payload.name);
  const firstName = name.split(" ")[0] || "lead";
  const email = esc(payload.email);
  const company = esc(payload.company);
  const message = esc(payload.message);
  const preferredDate = new Date(`${payload.date}T00:00:00`).toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const received = new Date().toLocaleString("en-ZA", {
    timeZone: "Africa/Johannesburg",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:${BG};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0"
             style="max-width:600px;width:100%;background:${CARD};border:2px solid ${ACCENT};">
        <tr>
          <td style="padding:28px 36px 22px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="left" style="vertical-align:middle;font-family:${SANS};font-weight:700;font-size:18px;color:${FG};">
                  INNOVI SOLUTIONS
                </td>
                <td align="right" style="vertical-align:middle;">
                  <span style="display:inline-block;background:#f4f4f5;border:1px solid ${ACCENT};padding:6px 12px;font-family:${MONO};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${ACCENT};">
                    New Lead
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 36px 0 36px;">
            ${label("New session request")}
            <h1 style="margin:12px 0 0 0;font-family:${SANS};font-size:34px;font-weight:800;letter-spacing:-0.5px;line-height:1.1;color:${FG};">${name}</h1>
            <p style="margin:10px 0 0 0;font-family:${MONO};font-size:13px;letter-spacing:2px;text-transform:uppercase;color:${MUTED};">${company}</p>
            <p style="margin:16px 0 0 0;font-family:${SANS};font-size:16px;color:${ACCENT};">&mdash; ${SESSION_LABELS[payload.session]}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:26px 36px 0 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BORDER};">
              ${numberedRow("01", "Email", `<a href="mailto:${email}" style="color:${ACCENT};text-decoration:none;">${email}</a>`)}
              ${numberedRow("02", "Preferred date", preferredDate)}
              ${numberedRow("03", "Project type", esc(payload.type), true)}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:22px 36px 0 36px;">
            ${label("The problem, in their words")}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
              <tr>
                <td style="width:36px;vertical-align:top;font-family:${SERIF};font-size:44px;line-height:1;color:${ACCENT};font-weight:700;">&ldquo;</td>
                <td style="vertical-align:top;font-family:${SERIF};font-size:18px;font-style:italic;line-height:1.65;color:${FG};white-space:pre-wrap;padding-top:8px;">${message}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:30px 36px 0 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:${ACCENT};" align="center">
                  <a href="mailto:${email}" style="display:block;padding:16px 24px;font-family:${MONO};font-size:14px;letter-spacing:3px;text-transform:uppercase;color:#ffffff;text-decoration:none;font-weight:700;">
                    Reply to ${firstName} &nbsp;&rarr;
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin:12px 0 0 0;font-family:${SANS};font-size:13px;color:${MUTED};">Or just hit reply &mdash; this message replies straight to the client.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:22px 36px 24px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BORDER};">
              <tr>
                <td style="padding-top:16px;" align="left">
                  <span style="font-family:${MONO};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${MUTED};">INNOVI Solutions</span>
                </td>
                <td style="padding-top:16px;" align="right">
                  <span style="font-family:${MONO};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${MUTED};">Received ${received}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <p style="margin:16px 0 0 0;font-family:${MONO};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${MUTED};">
        Lead ID ${leadId} &middot; POPIA consent given at submission
      </p>
    </td></tr>
  </table>
</body>
</html>`;
}

function confirmationFields(payload: LeadInput) {
  const firstName = payload.name.split(" ")[0] || "there";
  const preferredDate = new Date(`${payload.date}T00:00:00`).toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return { firstName, preferredDate };
}

// Plain text fallback (sent alongside the HTML version below for clients
// that prefer/require it). No styling is possible here by definition, which
// is fine - this is the backup, not the primary rendered version.
export function buildLeadConfirmationText(payload: LeadInput): string {
  const { firstName, preferredDate } = confirmationFields(payload);

  return `Hi ${firstName},

Thanks for reaching out to INNOVI Solutions. We've received your ${SESSION_LABELS[payload.session]} request and will confirm a time and send a short prep note within 3-5 business days.

Here's what you sent us:

Session: ${SESSION_LABELS[payload.session]}
Preferred date: ${preferredDate}
What you need built: ${payload.type}

Your message:
"${payload.message}"

For anything urgent, email queries@innovi-solutions.com.

- INNOVI Solutions`;
}

// Deliberately NOT the branded card template used for the stakeholder email
// above - no colors, borders, or boxes, just default system font on a plain
// background, so it reads like a person wrote it rather than an automated
// notification. The one intentional exception is the small logo signature
// at the end, which plain text can't render at all (images require HTML).
export function buildLeadConfirmationHtml(payload: LeadInput): string {
  const { firstName, preferredDate } = confirmationFields(payload);
  const message = esc(payload.message);
  const logoUrl = `${SITE_URL}/innovi-logo.png`;

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;background:#ffffff;font-family:${SANS};font-size:15px;line-height:1.6;color:#000000;">
  <p style="margin:0 0 16px 0;">Hi ${firstName},</p>
  <p style="margin:0 0 16px 0;">
    Thanks for reaching out to INNOVI Solutions. We've received your ${SESSION_LABELS[payload.session]}
    request and will confirm a time and send a short prep note within 3-5 business days.
  </p>
  <p style="margin:0 0 4px 0;">Here's what you sent us:</p>
  <p style="margin:0 0 16px 0;">
    Session: ${SESSION_LABELS[payload.session]}<br>
    Preferred date: ${preferredDate}<br>
    What you need built: ${esc(payload.type)}
  </p>
  <p style="margin:0 0 4px 0;">Your message:</p>
  <p style="margin:0 0 16px 0;font-style:italic;">&ldquo;${message}&rdquo;</p>
  <p style="margin:0 0 24px 0;">
    For anything urgent, email <a href="mailto:queries@innovi-solutions.com" style="color:#1a73e8;">queries@innovi-solutions.com</a>.
  </p>
  <p style="margin:0 0 12px 0;">- INNOVI Solutions</p>
  <img src="${logoUrl}" alt="INNOVI Solutions" width="140" style="display:block;border:0;">
  <p style="margin:20px 0 0 0;font-size:12px;color:#666666;">
    You're receiving this because you requested a session at innovi-solutions.com. We only use these
    details to respond to your enquiry, in line with POPIA.
  </p>
</body>
</html>`;
}

export async function sendLeadConfirmation(payload: LeadInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY ?? "";
  const fromEmail = process.env.FROM_EMAIL ?? "leads@innovi-solutions.com";

  if (!apiKey) {
    console.log(`[leads] Skipping confirmation email to ${payload.email} - RESEND_API_KEY not configured`);
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `INNOVI Solutions <${fromEmail}>`,
        to: [payload.email],
        reply_to: "queries@innovi-solutions.com",
        subject: "We've received your request - INNOVI Solutions",
        html: buildLeadConfirmationHtml(payload),
        text: buildLeadConfirmationText(payload),
      }),
    });
    if (!res.ok) {
      console.error(`[leads] Confirmation email failed for ${payload.email}: ${res.status} ${await res.text()}`);
    }
  } catch (err) {
    console.error(`[leads] Confirmation email errored for ${payload.email}`, err);
  }
}

export async function sendLeadNotification(leadId: string, payload: LeadInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY ?? "";
  const stakeholders = (process.env.STAKEHOLDER_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  const fromEmail = process.env.FROM_EMAIL ?? "leads@innovi-solutions.com";

  if (!apiKey || stakeholders.length === 0) {
    console.log(`[leads] Skipping notification email for lead ${leadId} - RESEND_API_KEY/STAKEHOLDER_EMAILS not configured`);
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `INNOVI SOLUTIONS Leads <${fromEmail}>`,
        to: stakeholders,
        reply_to: payload.email,
        subject: `[LEAD] ${SESSION_SHORT[payload.session]} — ${payload.name} (${payload.company})`,
        html: buildLeadEmailHtml(leadId, payload),
      }),
    });
    if (!res.ok) {
      console.error(`[leads] Resend send failed for lead ${leadId}: ${res.status} ${await res.text()}`);
      return; // lead is already safe in the DB - do not crash, do not retry here
    }
  } catch (err) {
    console.error(`[leads] Email send errored for lead ${leadId}`, err);
    return;
  }

  await markEmailSent(leadId);
}
