"use client";

import { useEffect, useState, useRef } from "react";

const securityFeatures = [
  {
    title: "Data minimization by design",
    description: "We collect only what's needed to respond to your enquiry and scope your work, nothing speculative.",
  },
  {
    title: "Encryption in transit and at rest",
    description: "Your data is protected on the wire and in storage.",
  },
  {
    title: "Strict access control",
    description: "Row level security and least privilege access on our data layer, only the people who need to see an enquiry can.",
  },
  {
    title: "POPIA aligned",
    description: "We process personal information under POPIA. Request removal of your data any time at queries@innovi-solutions.com.",
  },
];

const certifications = ["POPIA", "Encryption", "Row level security", "Least privilege", "Data minimization"];

export function SecuritySection() {
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

  return (
    <section id="how-we-handle-your-data" ref={sectionRef} className="relative py-24 lg:py-32 bg-foreground/[0.02] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6 uppercase tracking-widest">
              <span className="w-8 h-px bg-foreground/30" />
              Trust &amp; Security
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Built Right.
              <br />
              Secured by Default.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              We handle sensitive operational and customer data with the same discipline as the
              systems we build for insurance and financial clients: encryption in transit and at
              rest, strict access control, and data minimization by design.
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert, index) => (
                <span
                  key={cert}
                  className={`px-4 py-2 border border-foreground/10 text-sm font-mono transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Features */}
          <div className="grid gap-6">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 border border-foreground/10 hover:border-foreground/20 transition-all duration-500 group ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg font-medium mb-1 group-hover:translate-x-1 transition-transform duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
