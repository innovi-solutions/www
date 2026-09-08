"use client";

import { useState, useEffect, useRef } from "react";

const products = [
  {
    tab: "Cadence",
    name: "Cadence",
    lines: [
      "Cadence: Booking & Scheduling",
      "",
      "A booking and reservation system we can",
      "build around how you actually take",
      "appointments: custom availability rules,",
      "automated reminders, payments, and a",
      "calendar your team will trust.",
      "",
      "Ideal for clinics, studios, consultants,",
      "and service businesses.",
    ],
  },
  {
    tab: "Signal",
    name: "Signal",
    lines: [
      "Signal: AI Reporting Analyst",
      "",
      "We build Signal to plug into your company",
      "database and handle the analysis for you:",
      "reading your data, running the numbers, and",
      "delivering scheduled weekly or monthly reports",
      "straight to stakeholders, clear and on time.",
      "",
      "An always available member of your data team.",
    ],
  },
  {
    tab: "Prism",
    name: "Prism",
    lines: [
      "Prism: Ask Your Data Agent",
      "",
      "We build Prism so anyone on your team can",
      "ask questions in plain language, like how",
      "did sales track last quarter, and get a",
      "clear, sourced answer back in seconds.",
      "",
      "Prism turns everyday questions into on demand",
      "reports, so insight isn't gated behind whoever",
      "knows how to write the query.",
    ],
  },
  {
    tab: "Storefront",
    name: "Storefront",
    lines: [
      "Storefront: Custom Commerce Platform",
      "",
      "A branded online store and ordering system",
      "we build for your catalogue: a marketplace",
      "style buying experience customised to your",
      "merchandise, logistics, and customers.",
      "",
      "Listings, cart, checkout, orders, and",
      "fulfilment in one platform you'll own.",
    ],
  },
];

const highlights = [
  {
    title: "Setup + subscription",
    description: "One fee to stand it up, a monthly to keep it running.",
  },
  {
    title: "Hosting included",
    description: "We host, monitor, and maintain what we build for you.",
  },
  {
    title: "Forged to fit",
    description: "Shaped to your brand, your rules, and your data.",
  },
  {
    title: "You own it",
    description: "Your system and your data, always.",
  },
];

const codeAnimationStyles = `
  .dev-code-line {
    opacity: 0;
    transform: translateX(-8px);
    animation: devLineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes devLineReveal {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .dev-code-char {
    opacity: 0;
    filter: blur(8px);
    animation: devCharReveal 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes devCharReveal {
    to {
      opacity: 1;
      filter: blur(0);
    }
  }
`;

export function DevelopersSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const active = products[activeTab];

  return (
    <section id="products" ref={sectionRef} className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: codeAnimationStyles }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-5 sm:mb-6 uppercase tracking-widest">
              <span className="w-8 h-px bg-foreground/30" />
              Products
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-tight mb-6 sm:mb-8">
              Forged to Your Business.
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 leading-relaxed">
              Products we can design and build around a tested foundation, then shape to your
              brand, your rules, and your data. Setup fee plus a monthly subscription, hosting,
              updates, and support included.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <div
                  key={highlight.title}
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  <h3 className="font-medium mb-1">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product panel */}
          <div
            className={`lg:sticky lg:top-32 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              {/* Tabs */}
              <div className="flex items-center border-b border-foreground/10 overflow-x-auto">
                {products.map((product, idx) => (
                  <button
                    key={product.tab}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-4 sm:px-6 py-3 sm:py-4 text-sm font-mono transition-colors relative whitespace-nowrap ${
                      activeTab === idx
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {product.tab}
                    {activeTab === idx && (
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
                    )}
                  </button>
                ))}
              </div>

              {/* Panel content */}
              <div className="p-5 sm:p-6 lg:p-8 font-mono text-xs sm:text-sm bg-foreground/[0.01] min-h-[280px]">
                <pre className="text-foreground/80 whitespace-pre-wrap break-words">
                  {active.lines.map((line, lineIndex) => (
                    <div
                      key={`${activeTab}-${lineIndex}`}
                      className="leading-loose dev-code-line"
                      style={{ animationDelay: `${lineIndex * 80}ms` }}
                    >
                      {line.split("").map((char, charIndex) => (
                          <span
                            key={`${activeTab}-${lineIndex}-${charIndex}`}
                            className="dev-code-char"
                            style={{
                              animationDelay: `${lineIndex * 80 + charIndex * 15}ms`,
                            }}
                          >
                            {char === " " ? " " : char}
                          </span>
                        ))}
                    </div>
                  ))}
                </pre>
              </div>
            </div>

            {/* Bundle note + CTA */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
              <a href="/book" className="text-foreground hover:underline underline-offset-4">
                Book a session to scope your product
              </a>
              <span className="hidden sm:inline text-foreground/20">|</span>
              <span className="text-muted-foreground">
                Signal + Prism available as a Data Intelligence bundle
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
