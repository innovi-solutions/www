'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { BracketButton } from './bracket-button'

const NAV = [
  { label: 'SERVICES', href: '/#services' },
  { label: 'WORK', href: '/#work' },
  { label: 'HOW WE WORK', href: '/#how-we-work' },
  { label: 'ABOUT', href: '/#about' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* logo */}
        <Link href="/" className="flex items-center" aria-label="INNOVI Solutions home">
          <Image
            src="/innovi-wordmark-trimmed.png"
            alt="INNOVI Solutions"
            width={271}
            height={69}
            className="h-9 w-auto object-contain sm:h-10"
            priority
          />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/contact"
            className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
          >
            CONTACT
          </Link>
          <BracketButton href="/contact" size="sm">
            BOOK A SESSION
          </BracketButton>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center border border-border text-foreground md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <nav className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-3">
            {[...NAV, { label: 'CONTACT', href: '/contact' }].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <BracketButton href="/contact" size="sm">
                BOOK A SESSION
              </BracketButton>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
