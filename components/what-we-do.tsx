"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { ForgeDiagram } from "./forge-diagram";

const SERVICES = [
  {
    n: "01",
    title: "Custom Software & Web Design",
    body: "Bespoke platforms and websites, built around your workflow, not a template. Every screen and endpoint maps to how your team actually operates.",
  },
  {
    n: "02",
    title: "SaaS, Customized for You",
    body: "Proven core products, such as booking systems and operational tools, are shaped to your business rules, branding, and integrations.",
  },
  {
    n: "03",
    title: "Data Engineering & Automation",
    body: "Pipelines and workflows move your data and remove manual work because they are reliable, observable, and built to scale.",
  },
  {
    n: "04",
    title: "AI Agents",
    body: "Maximize your workforce efficiency with autonomous agents that manage queries, documents, and monitoring, letting your people drive the strategic work that matters most.",
  },
];

export function WhatWeDo() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="services" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            What We Do
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Built for Software. Ready for AI.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* accordion */}
          <div className="border-t border-border">
            {SERVICES.map((service, i) => {
              const isOpen = i === openIndex;
              return (
                <div key={service.n} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="flex w-full items-center gap-5 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-mono text-sm text-accent">
                      {service.n}
                      <span className="text-muted-foreground">/</span>
                    </span>
                    <span className="flex-1 text-lg font-semibold text-foreground sm:text-xl">
                      {service.title}
                    </span>
                    {isOpen ? (
                      <Minus className="h-4 w-4 shrink-0 text-accent" />
                    ) : (
                      <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="max-w-md pb-6 pl-11 text-sm leading-relaxed text-muted-foreground">
                      {service.body}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* diagram */}
          <div className="flex items-center justify-center lg:justify-end">
            <ForgeDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
