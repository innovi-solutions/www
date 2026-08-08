const FLOW = [
  { label: "Raw Material", sub: "Proven core" },
  { label: "Shaped Build", sub: "Forged to fit" },
  { label: "Your System", sub: "Live & owned" },
];

export function HowWeWork() {
  return (
    <section id="how-we-work" className="border-b border-border">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* statement */}
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-bronze">
            How We Work
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Proven Core. Shaped to Fit.
          </h2>
          <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
            Most software is either fully custom, slow and expensive or fully
            off-the-shelf, fast, but never quite right. INNOVI SOLUTIONS starts
            with a proven base and forges it to your business: your workflows,
            your data, your brand.
          </p>
        </div>

        {/* flow diagram */}
        <div className="flex flex-col gap-0 border border-border sm:flex-row">
          {FLOW.map((step, i) => (
            <div
              key={step.label}
              className={`relative flex flex-1 flex-col items-start gap-2 p-6 sm:p-7 ${
                i !== 0
                  ? "border-t border-border sm:border-l sm:border-t-0"
                  : ""
              }`}
            >
              <span className="font-mono text-xs text-bronze">
                {`0${i + 1}`}
                <span className="text-muted-foreground">/</span>
              </span>
              <span className="text-lg font-semibold text-foreground">
                {step.label}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {step.sub}
              </span>
              {i !== FLOW.length - 1 && (
                <span
                  aria-hidden="true"
                  className="mt-2 font-mono text-bronze sm:absolute sm:-right-2 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2 sm:bg-background sm:px-1"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
