"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    number: "01",
    title: "Custom Software & Web Design",
    description: "Bespoke platforms and websites, built around your workflow, not a template. Every screen and endpoint maps to how your team actually operates.",
  },
  {
    number: "02",
    title: "SaaS, Customized for You",
    description: "SaaS products we design and build for you, from booking systems to operational tools, shaped to your business rules, branding, and integrations.",
  },
  {
    number: "03",
    title: "Data Engineering & Automation",
    description: "Pipelines and workflows that move your data and remove the manual work, engineered to be reliable, observable, and built to scale.",
  },
  {
    number: "04",
    title: "AI Agents",
    description: "Agents that handle queries, documents, and monitoring, so your team can focus on what genuinely needs a human.",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 lg:py-20 border-b border-foreground/10">
        {/* Number */}
        <div className="shrink-0">
          <span className="font-mono text-sm text-muted-foreground">{feature.number}</span>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-3xl">
          <h3 className="text-3xl lg:text-4xl font-display mb-4 group-hover:translate-x-2 transition-transform duration-500">
            {feature.title}
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6 uppercase tracking-widest">
            <span className="w-8 h-px bg-foreground/30" />
            What We Do
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Built for Software.
            <br />
            <span className="text-muted-foreground">Ready for AI.</span>
          </h2>
        </div>

        {/* Features List */}
        <div>
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
