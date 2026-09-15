// innovi-solutions.com redirects to this www subdomain, which is the one
// actually serving the site - confirmed live 2026-09-15. NEXT_PUBLIC_SITE_URL
// still works as an override if the domain ever changes, but nothing needs
// to be set in Vercel for this to be correct.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.innovi-solutions.com";

export const SITE_NAME = "INNOVI Solutions";

export const SITE_DESCRIPTION =
  "INNOVI Solutions designs and builds custom software, SaaS, data systems, and AI agents shaped around how your business actually operates, plus hosting and maintenance.";
