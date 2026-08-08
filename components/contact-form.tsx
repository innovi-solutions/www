"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { Check } from "lucide-react";
import { useRef, useState } from "react";

const PROJECT_TYPES = [
  "Custom Software",
  "SaaS Application",
  "AI Agents & Automation",
  "Data Engineering",
  "Website",
  "Hosting & Maintenance",
  "Not sure yet",
];

const SESSION_TYPES = [
  {
    id: "discovery",
    label: "Discovery Call",
    hint: "30 min · scoping conversation",
  },
  {
    id: "technical",
    label: "Technical Deep-Dive",
    hint: "60 min · architecture & feasibility",
  },
];

const labelCls =
  "block font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground";
const fieldBase =
  "mt-2 w-full border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:ring-1";

type FormValues = {
  name: string;
  email: string;
  company: string;
  date: string;
  type: string;
  message: string;
  consent: boolean;
};

const EMPTY: FormValues = {
  name: "",
  email: "",
  company: "",
  date: "",
  type: "",
  message: "",
  consent: false,
};

type Errors = Partial<Record<keyof FormValues, string>>;

function validate(values: FormValues): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your full name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your work email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.company.trim()) errors.company = "Please enter your company.";
  if (!values.date) {
    // ← changed from here…
    errors.date = "Please choose a preferred date.";
  } else if (values.date < new Date().toISOString().split("T")[0]) {
    errors.date = "Please choose a date from today onwards.";
  } // ← …to here
  if (!values.type) errors.type = "Please select a focus area.";
  if (!values.message.trim())
    errors.message = "Please tell us about the problem.";
  if (!values.consent)
    errors.consent = "Consent is required before we can contact you.";
  return errors;
}

export function ContactForm() {
  const [session, setSession] = useState("discovery");
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const mountedAt = useRef(Date.now()); // for elapsed_ms
  const honeypotRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    // clear the error for a field as soon as the user corrects it
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(firstKey)?.focus();
      return;
    }
    setErrors({});
    setServerError(null);
    setSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session,
          name: values.name,
          email: values.email,
          company: values.company,
          date: values.date,
          type: values.type,
          message: values.message,
          consent: values.consent,
          website: honeypotRef.current?.value ?? "",
          elapsed_ms: Date.now() - mountedAt.current,
          turnstile_token: turnstileToken,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else if (res.status === 429) {
        setServerError(
          "Too many requests — please wait a minute and try again.",
        );
      } else if (res.status === 403) {
        setServerError(
          "Verification failed. Please refresh the page and try again.",
        );
      } else if (res.status === 422) {
        setServerError(
          "Some details couldn't be accepted please check the form and try again.",
        );
      } else {
        setServerError(
          "Something went wrong on our side. Please try again shortly.",
        );
      }
    } catch {
      setServerError(
        "Could not reach the server. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function fieldCls(hasError?: string) {
    return `${fieldBase} ${
      hasError
        ? "border-destructive focus:border-destructive focus:ring-destructive"
        : "border-input focus:border-accent focus:ring-accent"
    }`;
  }

  if (submitted) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center border border-border bg-card p-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center border border-accent text-accent">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
          Successfully Submitted
        </h3>
        <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          Thank you, {values.name.split(" ")[0] || "there"}. Your request has
          been submitted successfully —{" "}
          <span className="text-foreground">
            INNOVI Solutions will be in contact with you soon
          </span>{" "}
          to confirm your session and next steps.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setSession("discovery");
            setSubmitted(false);
          }}
          className="mt-8 font-mono text-[11px] uppercase tracking-[0.15em] text-accent transition-colors hover:text-foreground"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border border-border bg-card p-6 sm:p-8"
    >
      {/* honeypot — humans never see or fill this */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          height: 0,
          overflow: "hidden",
        }}
      >
        <label htmlFor="xf_note">Leave this field empty</label>
        <input
          ref={honeypotRef}
          id="xf_note"
          name="xf_note"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* session type */}
      <fieldset>
        <legend className={labelCls}>Session Type</legend>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SESSION_TYPES.map((s) => {
            const active = session === s.id;
            return (
              <button
                type="button"
                key={s.id}
                onClick={() => setSession(s.id)}
                className={`flex flex-col items-start border p-4 text-left transition-colors ${
                  active
                    ? "border-accent bg-accent/5"
                    : "border-input hover:border-foreground/40"
                }`}
              >
                <span className="text-sm font-semibold text-foreground">
                  {s.label}
                </span>
                <span className="mt-1 text-xs text-muted-foreground">
                  {s.hint}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Full Name
          </label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            className={fieldCls(errors.name)}
            placeholder="Jane Doe"
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Work Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            className={fieldCls(errors.email)}
            placeholder="jane@company.com"
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="company" className={labelCls}>
            Company
          </label>
          <input
            id="company"
            name="company"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            aria-invalid={!!errors.company}
            className={fieldCls(errors.company)}
            placeholder="Company Inc."
          />
          {errors.company && (
            <p className="mt-1.5 text-xs text-destructive">{errors.company}</p>
          )}
        </div>
        <div>
          <label htmlFor="date" className={labelCls}>
            Preferred Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={values.date}
            onChange={(e) => update("date", e.target.value)}
            aria-invalid={!!errors.date}
            className={fieldCls(errors.date)}
          />

          {errors.date && (
            <p className="mt-1.5 text-xs text-destructive">{errors.date}</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="type" className={labelCls}>
            What do you need built?
          </label>
          <select
            id="type"
            name="type"
            value={values.type}
            onChange={(e) => update("type", e.target.value)}
            aria-invalid={!!errors.type}
            className={fieldCls(errors.type)}
          >
            <option value="" disabled>
              Select a focus area
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.type && (
            <p className="mt-1.5 text-xs text-destructive">{errors.type}</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelCls}>
            Tell us about the problem
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={!!errors.message}
            className={fieldCls(errors.message)}
            placeholder="What are you trying to build, replace, or automate?"
          />
          {errors.message && (
            <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>
          )}
        </div>
      </div>

      {/* POPIA consent — unbundled, explicit */}
      <div className="mt-6 border border-border bg-secondary/50 p-4">
        <label
          htmlFor="consent"
          className="flex cursor-pointer items-start gap-3"
        >
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-accent"
          />
          <span className="text-xs leading-relaxed text-muted-foreground">
            I consent to INNOVI Solutions storing and using the details
            I&apos;ve provided for the sole purpose of responding to this
            enquiry and booking my session, in line with the Protection of
            Personal Information Act (POPIA). I understand I can request removal
            of my data at any time.
          </span>
        </label>
        {errors.consent && (
          <p className="mt-2 text-xs text-destructive">{errors.consent}</p>
        )}
      </div>

      {/* human verification */}
      <div className="mt-6">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={setTurnstileToken}
          onExpire={() => setTurnstileToken("")}
          options={{ theme: "auto" }}
        />
      </div>

      {serverError && (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || !turnstileToken}
        className="mt-7 w-full bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {submitting ? "Submitting…" : "Request Session"}
      </button>
    </form>
  );
}
