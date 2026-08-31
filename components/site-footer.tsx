import Image from 'next/image'
import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <Link href="/" className="flex items-center" aria-label="INNOVI Solutions home">
          <Image
            src="/innovi-wordmark-trimmed.png"
            alt="INNOVI Solutions"
            width={271}
            height={69}
            className="h-10 w-auto object-contain"
          />
        </Link>

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
