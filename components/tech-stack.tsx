const STACK = [
  'FastAPI',
  'Next.js',
  'PostgreSQL',
  'React',
  'Azure',
  'Docker',
  'Claude / OpenAI',
]

export function TechStack() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 sm:px-8 lg:flex-row lg:items-center lg:gap-16">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Built With
        </span>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {STACK.map((item) => (
            <span
              key={item}
              className="font-mono text-sm uppercase tracking-[0.1em] text-foreground/80"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
