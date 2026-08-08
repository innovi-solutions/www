import Image from 'next/image'
import Link from 'next/link'

const LINKS = [
  { label: 'SERVICES', href: '/#services' },
  { label: 'WORK', href: '/#work' },
  { label: 'HOW WE WORK', href: '/#how-we-work' },
  { label: 'ABOUT', href: '/#about' },
  { label: 'CONTACT', href: '/contact' },
]

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center" aria-label="INNOVI Solutions home">
            <Image
              src="/innovi-wordmark-trimmed.png"
              alt="INNOVI Solutions"
              width={271}
              height={69}
              className="h-10 w-auto object-contain"
            />
          </Link>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Forging Software That Fits.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            © {new Date().getFullYear()} INNOVI Solutions
          </p>
        </div>
      </div>
    </footer>
  )
}
