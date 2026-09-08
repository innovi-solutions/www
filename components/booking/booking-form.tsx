"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

const sessionTypes = [
  {
    id: "discovery",
    title: "Discovery Call",
    duration: "30 min",
    detail: "scoping conversation",
  },
  {
    id: "technical",
    title: "Technical Deep Dive",
    duration: "60 min",
    detail: "architecture & feasibility",
  },
];

const focusAreas = [
  "Custom Software & Web Design",
  "SaaS, Customized for You",
  "Data Engineering & Automation",
  "AI Agents",
  "Hosting & Maintenance",
  "Not sure yet, help me scope it",
];

const steps = [
  { number: "01", text: "Pick a session type and share a little about the problem." },
  { number: "02", text: "We confirm a time and send a short prep note." },
  { number: "03", text: "We meet, scope the work, and map the shortest path to a fit." },
];

export function BookingForm() {
  const [mounted, setMounted] = useState(false);
  const [sessionType, setSessionType] = useState("discovery");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) {
      setError("Please accept the consent statement so we can respond to your enquiry.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-start">
      {/* Form card */}
      <div
        className={`relative bg-card border border-foreground/10 rounded-2xl p-6 sm:p-10 shadow-sm transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {submitted ? (
          <div className="flex flex-col items-start gap-6 py-8">
            <div>
              <h2 className="text-3xl font-display tracking-tight mb-3">Request received.</h2>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Thanks for reaching out. We&apos;ll confirm a time and send a short prep note within one
                business day. For anything urgent, email{" "}
                <a
                  href="mailto:queries@innovi-solutions.com"
                  className="text-foreground underline underline-offset-4"
                >
                  queries@innovi-solutions.com
                </a>
                .
              </p>
            </div>
            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="rounded-full border-foreground/20 hover:bg-foreground/5"
            >
              Book another session
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Session type */}
            <fieldset className="flex flex-col gap-4">
              <legend className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                Session Type
              </legend>
              <div className="grid sm:grid-cols-2 gap-4">
                {sessionTypes.map((type) => {
                  const active = sessionType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSessionType(type.id)}
                      aria-pressed={active}
                      className={`text-left rounded-xl border p-5 transition-all duration-300 ${
                        active
                          ? "border-foreground bg-foreground/[0.04] shadow-sm"
                          : "border-foreground/15 hover:border-foreground/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{type.title}</span>
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                            active ? "border-foreground bg-foreground" : "border-foreground/30"
                          }`}
                        >
                          {active && <span className="w-1.5 h-1.5 rounded-full bg-background" />}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground font-mono">
                        {type.duration} · {type.detail}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Name + email */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Full Name" htmlFor="fullName">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className={inputClass}
                />
              </Field>
              <Field label="Work Email" htmlFor="email">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className={inputClass}
                />
              </Field>
            </div>

            {/* Company + date */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Company" htmlFor="company">
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Company Inc."
                  className={inputClass}
                />
              </Field>
              <Field label="Preferred Date" htmlFor="date">
                <input id="date" name="date" type="date" className={inputClass} />
              </Field>
            </div>

            {/* Focus area */}
            <Field label="What do you need built?" htmlFor="focus">
              <select id="focus" name="focus" required defaultValue="" className={`${inputClass} pr-10`}>
                <option value="" disabled>
                  Select a focus area
                </option>
                {focusAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </Field>

            {/* Message */}
            <Field label="Tell us about the problem" htmlFor="message">
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="What are you trying to build, replace, or automate?"
                className={`${inputClass} resize-y min-h-32`}
              />
            </Field>

            {/* Consent */}
            <label className="flex items-start gap-3 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 cursor-pointer">
              <span className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="peer sr-only"
                />
                <span
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    consent ? "border-foreground bg-foreground" : "border-foreground/30"
                  }`}
                />
              </span>
              <span className="text-xs leading-relaxed text-muted-foreground">
                I consent to INNOVI Solutions storing and using the details I&apos;ve provided for the
                sole purpose of responding to this enquiry and booking my session, in line with the
                Protection of Personal Information Act (POPIA). I understand I can request removal of
                my data at any time.
              </span>
            </label>

            {error && <p className="text-sm text-destructive -mt-4">{error}</p>}

            {/* Assurance strip (themed replacement for captcha) */}
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              Encrypted in transit · Reviewed by a real person · POPIA aligned
            </div>

            <Button
              type="submit"
              size="lg"
              className="bg-foreground hover:bg-foreground/90 text-background rounded-full h-14 px-8 text-base group w-full sm:w-auto"
            >
              Request Session
            </Button>
          </form>
        )}
      </div>

      {/* Sidebar */}
      <aside
        className={`flex flex-col gap-12 lg:pt-4 transition-all duration-700 delay-150 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-8">
            How It Works
          </h3>
          <ol className="flex flex-col divide-y divide-foreground/10">
            {steps.map((step) => (
              <li key={step.number} className="flex items-start gap-5 py-5 first:pt-0">
                <span className="font-mono text-sm text-foreground/40 tabular-nums">{step.number}/</span>
                <span className="text-sm text-foreground/80 leading-relaxed">{step.text}</span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
            Direct
          </h3>
          <ul className="flex flex-col gap-5">
            <ContactRow label="Email">
              <a
                href="mailto:queries@innovi-solutions.com"
                className="text-sm text-foreground hover:underline underline-offset-4 break-all"
              >
                queries@innovi-solutions.com
              </a>
            </ContactRow>
            <ContactRow label="Response Time">
              <span className="text-sm text-foreground">Within 1 business day</span>
            </ContactRow>
            <ContactRow label="Working With">
              <span className="text-sm text-foreground">Remote, global clients</span>
            </ContactRow>
          </ul>
        </div>
      </aside>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-foreground/15 bg-background px-4 h-12 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-foreground focus:ring-2 focus:ring-foreground/10";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex flex-col gap-1">
      <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </li>
  );
}
