const PROJECTS = [
  {
    n: "01",
    tag: "SaaS Platform",
    title: "Policy & Claims Workspace",
    client: "Regional Insurance Group",
    body: "A multi-tenant SaaS platform that replaced spreadsheets and email threads with one workspace for underwriting, policy issuance, and claims tracking.",
    metrics: [
      { v: "68%", l: "faster claims cycle" },
      { v: "5", l: "legacy tools retired" },
    ],
  },
  {
    n: "02",
    tag: "AI Agents & Automation",
    title: "Back-Office Automation Suite",
    client: "Financial Services Firm",
    body: "AI agents that read incoming documents, reconcile records, and draft responses, handing off to humans only when confidence drops below threshold.",
    metrics: [
      { v: "12k+", l: "docs processed / mo" },
      { v: "90%", l: "touchless routing" },
    ],
  },
  {
    n: "03",
    tag: "Data Engineering",
    title: "Unified Reporting Pipeline",
    client: "Logistics Operator",
    body: "A data pipeline and warehouse that consolidates fleet, orders, and billing sources into a single trusted layer feeding live operational dashboards.",
    metrics: [
      { v: "9", l: "sources unified" },
      { v: "real-time", l: "ops dashboards" },
    ],
  },
];

const CLIENTS = [
  "NORTHWIND INSURANCE",
  "MERIDIAN CAPITAL",
  "CARGOLINE",
  "BRIGHTPATH HEALTH",
  "ATLAS RETAIL",
  "VANTA LEGAL",
];

export function Work() {
  return (
    <section id="work" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        {/* header */}
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            Selected Work
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Systems We&apos;ve Built for Real Businesses
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            A sample of software, automation, and data work, each one hosted and
            maintained by us after launch.
          </p>
        </div>

        {/* project cards */}
        <div className="mt-14 grid grid-cols-1 border-t border-l border-border md:grid-cols-3">
          {PROJECTS.map((p) => (
            <article
              key={p.n}
              className="group flex flex-col border-b border-r border-border p-7 transition-colors hover:bg-secondary/60"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-accent">
                  {p.n}
                  <span className="text-muted-foreground">/</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {p.tag}
                </span>
              </div>

              <h3 className="mt-8 text-xl font-semibold leading-snug text-foreground">
                {p.title}
              </h3>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--bronze)]">
                {p.client}
              </p>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>

              <div className="mt-7 grid grid-cols-2 gap-4 border-t border-border pt-5">
                {p.metrics.map((m) => (
                  <div key={m.l}>
                    <p className="text-lg font-bold text-foreground">{m.v}</p>
                    <p className="mt-0.5 text-xs leading-tight text-muted-foreground">
                      {m.l}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* clients */}
        <div className="mt-16">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Businesses We&apos;ve Worked With
          </p>
          <div className="mt-7 grid grid-cols-2 border-t border-l border-border sm:grid-cols-3 lg:grid-cols-6">
            {CLIENTS.map((c) => (
              <div
                key={c}
                className="flex items-center justify-center border-b border-r border-border px-4 py-8 text-center font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
