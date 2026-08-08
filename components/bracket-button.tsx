import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BracketButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

// Sharp-cornered CTA with copper corner-bracket accents ("sparks").
export function BracketButton({
  children,
  href = '#',
  variant = 'primary',
  size = 'md',
  className,
}: BracketButtonProps) {
  const isPrimary = variant === 'primary'
  const bracket = isPrimary ? 'border-amber' : 'border-accent'

  return (
    <a
      href={href}
      className={cn(
        'group relative inline-flex items-center justify-center font-mono uppercase tracking-[0.15em] transition-colors',
        size === 'sm' ? 'px-4 py-2 text-[11px]' : 'px-6 py-3.5 text-xs',
        isPrimary
          ? 'bg-accent text-accent-foreground hover:bg-accent/90'
          : 'border border-foreground/40 text-foreground hover:border-foreground hover:bg-foreground/5',
        className,
      )}
    >
      {/* corner brackets */}
      <span
        className={cn(
          'pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t opacity-0 transition-opacity group-hover:opacity-100',
          bracket,
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          'pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t opacity-0 transition-opacity group-hover:opacity-100',
          bracket,
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          'pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l opacity-0 transition-opacity group-hover:opacity-100',
          bracket,
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          'pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r opacity-0 transition-opacity group-hover:opacity-100',
          bracket,
        )}
        aria-hidden="true"
      />
      {children}
    </a>
  )
}
