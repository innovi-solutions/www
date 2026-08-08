const STEPS = [
  { n: '01', title: 'Discover', body: 'We map your workflows, data, and goals before a line of code.' },
  { n: '02', title: 'Design', body: 'Architecture and interfaces drawn to spec, reviewed with you.' },
  { n: '03', title: 'Build', body: 'Iterative delivery — you see working software early and often.' },
  { n: '04', title: 'Deploy', body: 'Shipped to production on infrastructure we set up and own.' },
  { n: '05', title: 'Support', body: 'Ongoing hosting, monitoring, and maintenance after go-live.' },
]

export function Process() {
  return (
    <section id="process" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            Process
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            From First Call to Live System
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className="border-b border-border p-6 sm:border-r sm:p-7 lg:border-b-0"
            >
              <span className="font-mono text-sm text-accent">
                {step.n}
                <span className="text-muted-foreground">/</span>
              </span>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
