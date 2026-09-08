"use client";

import { AnimatedWave } from "./animated-wave";

const footerLinks = {
  "Quick Links": [
    { name: "Services", href: "#services" },
    { name: "Products", href: "#products" },
    { name: "How We Work", href: "#how-we-work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ],
  Trust: [
    { name: "How We Handle Your Data", href: "#how-we-handle-your-data" },
    { name: "Built With", href: "#integrations" },
  ],
  Contact: [
    { name: "queries@innovi-solutions.com", href: "mailto:queries@innovi-solutions.com" },
    { name: "Book a Session", href: "/book" },
  ],
};

export function FooterSection({ hrefPrefix = "" }: { hrefPrefix?: string }) {
  const resolveHref = (href: string) => (href.startsWith("#") ? `${hrefPrefix}${href}` : href);

  return (
    <footer className="relative border-t border-foreground/10">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href={hrefPrefix || "#"} className="inline-flex items-center mb-6" aria-label="INNOVI Solutions home">
                <img src="/innovi-logo.png" alt="INNOVI Solutions" className="h-10 w-auto" />
              </a>

              <p className="font-display text-lg text-foreground mb-3">
                Forging Software That Fits.
              </p>

              <p className="text-muted-foreground leading-relaxed max-w-xs">
                A dev shop building custom software, SaaS, data systems, and AI agents, then hosting
                and maintaining what it ships.
              </p>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={resolveHref(link.href)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-foreground text-background rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 INNOVI Solutions. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Remote, global clients
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
