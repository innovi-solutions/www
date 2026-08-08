import { BracketButton } from './bracket-button'

export function FinalCta() {
  return (
    <section id="contact" className="border-b border-border">
      <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
          Have Something That Needs Building?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
          Tell us the problem. We&apos;ll tell you the shortest path to a system
          that fits.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BracketButton href="/contact">Book a Session</BracketButton>
          <BracketButton href="#services" variant="outline">
            Explore Services
          </BracketButton>
        </div>
      </div>
    </section>
  )
}
