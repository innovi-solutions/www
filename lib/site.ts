// Falls back to the known-working Vercel URL until a custom domain is
// pointed here - set NEXT_PUBLIC_SITE_URL once innovi-solutions.com (or
// whichever domain) is actually live, no code changes needed.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.innovi-solutions.com/";

export const SITE_NAME = "INNOVI Solutions";

export const SITE_DESCRIPTION =
  "INNOVI Solutions designs and builds custom software, SaaS, data systems, and AI agents shaped around how your business actually operates, plus hosting and maintenance.";
