import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { BookingForm } from "@/components/booking/booking-form";

export const metadata: Metadata = {
  title: "Book a Session | INNOVI Solutions",
  description:
    "Book a free discovery call or a technical deep dive with INNOVI Solutions. Tell us the problem and we'll map the shortest path to a system that fits.",
};

export default function BookPage() {
  return (
    <main className="relative min-h-screen bg-background noise-overlay">
      <Navigation hrefPrefix="/" />

      <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="max-w-3xl mb-16 lg:mb-20">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6 uppercase tracking-widest">
              <span className="w-8 h-px bg-foreground/30" />
              Book a Session
            </span>
            <h1 className="text-4xl lg:text-7xl font-display tracking-tight leading-[0.95] text-balance mb-8">
              Let&apos;s scope what
              <br />
              you need built.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty max-w-2xl">
              Book a free discovery call or a technical deep dive. Tell us the problem and we&apos;ll
              map the shortest path to a system that fits, from custom software and SaaS to AI
              automation and data engineering.
            </p>
          </div>

          <BookingForm />
        </div>
      </section>

      <FooterSection hrefPrefix="/" />
    </main>
  );
}
