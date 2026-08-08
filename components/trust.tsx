import { BracketButton } from "./bracket-button";

export function Trust() {
  return (
    <section className="border-b border-border bg-primary text-primary-foreground">
      <div className="relative overflow-hidden">
        {/* faint grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-amber">
            Trust &amp; Security
          </span>
          <h2 className="mx-auto mt-5 max-w-3xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Built Right. Secured by Default.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/70 sm:text-lg">
            We handle sensitive operational and customer data with the same
            discipline as the systems we build for insurance and financial
            clients, encryption in transit and at rest, strict access control,
            and data minimization by design.
          </p>
          <div className="mt-9 flex justify-center">
            <BracketButton
              href="#contact"
              variant="outline"
              className="border-primary-foreground/40 text-primary-foreground hover:border-primary-foreground hover:bg-primary-foreground/10"
            >
              How We Handle Your Data
            </BracketButton>
          </div>
        </div>
      </div>
    </section>
  );
}
