import Image from 'next/image'
import Link from 'next/link'

const QUICK_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'How We Work', href: '/#how-we-work' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-[1.4fr_1fr_1fr] sm:gap-8">
          {/* brand */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center" aria-label="INNOVI Solutions home">
              <Image
                src="/innovi-wordmark-trimmed.png"
                alt="INNOVI Solutions"
                width={271}
                height={69}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 text-sm font-semibold text-foreground">INNOVI Solutions</p>
            <p className="mt-1 text-sm italic text-accent">Forging Software That Fits.</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A dev shop building custom software, SaaS, data systems, and AI
              agents, then hosting and maintaining what it ships.
            </p>
          </div>

          {/* quick links */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Quick Links
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Contact
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-foreground">
              <li>
                <a
                  href="mailto:queries@innovi-solutions.com"
                  className="transition-colors hover:text-accent"
                >
                  queries@innovi-solutions.com
                </a>
              </li>
              <li className="text-muted-foreground">Remote-first, global clients</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} INNOVI Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
