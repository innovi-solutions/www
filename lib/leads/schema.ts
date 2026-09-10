import { z } from "zod";

export const PROJECT_TYPES = [
  "Custom Software & Web Design",
  "SaaS, Customized for You",
  "Data Engineering & Automation",
  "AI Agents",
  "Hosting & Maintenance",
  "Not sure yet, help me scope it",
] as const;

export const SESSION_TYPES = ["discovery", "technical"] as const;

function isNotInPast(value: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(`${value}T00:00:00`);
  return date >= today;
}

export const leadSchema = z.object({
  session: z.enum(SESSION_TYPES),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  company: z.string().trim().min(1).max(150),
  date: z.string().refine(isNotInPast, "Preferred date cannot be in the past."),
  type: z.enum(PROJECT_TYPES),
  message: z.string().trim().min(10).max(2000),
  consent: z.literal(true),

  // Anti-spam fields - accepted from the client, enforced server-side.
  website: z.string().optional().default(""), // honeypot
  elapsedMs: z.number().optional().default(0), // time-to-submit
  turnstileToken: z.string().optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;
