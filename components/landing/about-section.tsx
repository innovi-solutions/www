"use client";

import { useEffect, useRef, useState } from "react";

const glanceFacts = [
  { label: "Focus", value: "Custom software, SaaS, data & AI agents" },
  { label: "Also handles", value: "Hosting & ongoing maintenance" },
  { label: "Approach", value: "Tested foundations, forged to fit" },
];

const team = [
  {
    role: "Business Analysis & Software Engineering",
    bio: "Turns messy operational problems into clear specs, then helps build them. Bridges stakeholders and code so the system that ships is the one the business actually needed.",
  },
  {
    role: "Data Modelling & Data Engineering",
    bio: "Designs the data layer, schemas, pipelines, and warehouses, so information is trustworthy, observable, and ready to feed dashboards, products, and AI.",
  },
  {
    role: "AI Engineering & Automation",
    bio: "Builds the AI agents and automations: document handling, query resolution, monitoring, and the workflows that remove manual work while keeping humans in the loop where it matters.",
  },
  {
    role: "Evaluation & Software Engineering",
    bio: "Owns quality and reliability, evaluating models and systems against real world thresholds so what goes live is measured, not assumed.",
  },
];

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-16 sm:py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 mb-14 sm:mb-20 lg:mb-28">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-5 sm:mb-6 uppercase tracking-widest">
              <span className="w-8 h-px bg-foreground/30" />
              About
            </span>
            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-display tracking-tight mb-6 sm:mb-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Who&apos;s Behind
              <br />
              <span className="text-muted-foreground">the Forge.</span>
            </h2>
            <p
              className={`text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              INNOVI is a dev shop built by engineers who&apos;d rather ship systems that fit than
              sell software that almost works. We design, build, host, and maintain end to end,
              with a bias toward reliability and clarity over hype.
            </p>
          </div>

          {/* At a glance */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <div className="divide-y divide-foreground/10 border-y border-foreground/10">
              {glanceFacts.map((fact, i) => (
                <div
                  key={fact.label}
                  className={`py-5 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest sm:w-32 shrink-0">
                    {fact.label}
                  </span>
                  <span className="text-foreground">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-5 sm:mb-6 uppercase tracking-widest">
            <span className="w-8 h-px bg-foreground/30" />
            The Team
          </span>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-5 sm:mb-6 text-balance">
            Four Founders. One Forge.
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            INNOVI Solutions was founded by four engineers with diverse postgraduate academic
            backgrounds spanning Computer Science, Information Systems and Property Studies,
            with qualifications from the University of Cape Town (UCT) and the University of the
            Western Cape (UWC). Together, we bring a multidisciplinary approach to technology -
            combining business and industry understanding with software engineering, data
            modelling, AI, process automation and rigorous solution testing to deliver technology
            that addresses real-world business needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
          {team.map((member, i) => (
            <div
              key={member.role}
              className={`group bg-background p-6 sm:p-8 lg:p-10 transition-all duration-700 hover:bg-foreground/[0.02] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="flex items-start justify-between mb-5 sm:mb-6">
                <span className="font-mono text-sm text-muted-foreground">
                  0{i + 1}
                </span>
                <span className="w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center font-display text-lg text-foreground/70 group-hover:border-foreground/40 transition-colors">
                  N
                </span>
              </div>
              <h4 className="font-display text-xl lg:text-2xl tracking-tight mb-3 sm:mb-4 text-balance">
                {member.role}
              </h4>
              <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
