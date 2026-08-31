import { BracketButton } from './bracket-button'

export function FinalCta() {
  return (
    <section id="contact" className="relative overflow-hidden border-b border-border">
      {/* echoes the hero's grid backdrop, bookending the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 80%)',
        }}
      />

      <div className="relative mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 sm:py-36">
        <h2 className="mx-auto max-w-2xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">
          Have Something That Needs Building?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Tell us the problem. We&apos;ll tell you the shortest path to a system
          that fits.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BracketButton href="/contact">Book a Session</BracketButton>
          <BracketButton href="#services" variant="outline">
            Explore Services
          </BracketButton>
        </div>
      </div>
    </section>
  )
}
