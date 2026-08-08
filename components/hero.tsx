import { BracketButton } from "./bracket-button";

const STRIP = [
  { n: "01", text: "You bring the problem. We bring the build." },
  { n: "02", text: "Your systems. Your rules." },
  { n: "03", text: "Strategy and engineering included." },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border"
    >
      {/* faint technical grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 80%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-0 pt-20 sm:px-8 sm:pt-28">
        <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-accent">
          The Forge for Custom Software &amp; AI
        </p>

        <h1 className="mx-auto mt-6 max-w-4xl text-balance text-center text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Custom Software, AI Agents &amp; Automation
          <span className="text-accent"> Engineered to Fit</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
          INNOVI designs and builds software, data systems, and AI agents shaped
          around how your business actually operates then hosts and maintains
          them.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BracketButton href="/contact">Book a Session</BracketButton>
          <BracketButton href="#work" variant="outline">
            See Our Work
          </BracketButton>
        </div>

        {/* below-fold numbered strip */}
        <div className="mt-20 grid grid-cols-1 border-t border-border sm:grid-cols-3">
          {STRIP.map((item, i) => (
            <div
              key={item.n}
              className={`px-1 py-8 sm:px-8 ${
                i !== 0
                  ? "border-t border-border sm:border-l sm:border-t-0"
                  : ""
              }`}
            >
              <span className="font-mono text-sm text-accent">
                {item.n}
                <span className="text-muted-foreground">/</span>
              </span>
              <p className="mt-4 max-w-[16rem] text-lg font-semibold leading-snug text-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
