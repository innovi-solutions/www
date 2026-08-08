import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Clock, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Session — INNOVI Solutions",
  description:
    "Book a discovery call or technical deep-dive with INNOVI Solutions to scope your custom software, SaaS, AI automation, or data engineering project.",
};

const STEPS = [
  {
    n: "01",
    text: "Pick a session type and share a little about the problem.",
  },
  { n: "02", text: "We confirm a time and send a short prep note." },
  {
    n: "03",
    text: "We meet, scope the work, and map the shortest path to a fit.",
  },
];

const DETAILS = [
  { icon: Mail, label: "Email", value: "queries@innovi.solutions" },
  { icon: Clock, label: "Response time", value: "Within 1 business day" },
  {
    icon: MapPin,
    label: "Working with",
    value: "Remote-first, global clients",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                Book a Session
              </span>
              <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
                Let&apos;s Scope What You Need Built
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Book a free discovery call or a technical deep-dive. Tell us the
                problem and we&apos;ll map the shortest path to a system that
                fits — from custom software and SaaS to AI automation and data
                engineering.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
              {/* form */}
              <div className="order-2 lg:order-1">
                <ContactForm />
              </div>

              {/* side info */}
              <aside className="order-1 lg:order-2">
                <div className="border-t border-border pt-6">
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    How It Works
                  </h2>
                  <ul className="mt-6 flex flex-col gap-6">
                    {STEPS.map((s) => (
                      <li key={s.n} className="flex gap-4">
                        <span className="font-mono text-sm text-accent">
                          {s.n}
                          <span className="text-muted-foreground">/</span>
                        </span>
                        <p className="text-sm leading-relaxed text-foreground">
                          {s.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 border-t border-border pt-6">
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Direct
                  </h2>
                  <ul className="mt-6 flex flex-col gap-5">
                    {DETAILS.map((d) => (
                      <li key={d.label} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-border text-accent">
                          <d.icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                            {d.label}
                          </p>
                          <p className="mt-0.5 text-sm text-foreground">
                            {d.value}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
