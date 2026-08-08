const FACTS = [
  { k: "Focus", v: "Custom software, SaaS, data & AI agents" },
  { k: "Also handles", v: "Hosting & long-term maintenance" },
  { k: "Approach", v: "Proven cores, forged to fit" },
];

export function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-bronze">
            About
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Who&apos;s Behind the Forge
          </h2>
          <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
            INNOVI SOLUTIONS is a dev shop built by engineers who&apos;d rather
            ship systems that fit than sell software that almost works. We
            design, build, host, and maintain end to end, with a bias toward
            reliability and clarity over hype.
          </p>
        </div>

        <div className="border-t border-border">
          {FACTS.map((fact) => (
            <div
              key={fact.k}
              className="flex flex-col gap-1 border-b border-border py-5 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <span className="w-40 shrink-0 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {fact.k}
              </span>
              <span className="text-base font-medium text-foreground">
                {fact.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
