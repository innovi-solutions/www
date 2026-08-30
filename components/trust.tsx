'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { BracketButton } from './bracket-button'
import { DataHandlingDialog } from './data-handling-dialog'

const DATA_HANDLING_HASH = '#how-we-handle-your-data'

export function Trust() {
  const [dataDialogOpen, setDataDialogOpen] = useState(false)
  const openedViaButton = useRef(false)

  // Keep the overlay in sync with the URL hash so it's deep-linkable and the
  // browser back button closes it, same as any other page in the site.
  useEffect(() => {
    const syncFromHash = () => setDataDialogOpen(window.location.hash === DATA_HANDLING_HASH)
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  const openDataDialog = useCallback(() => {
    openedViaButton.current = true
    window.location.hash = DATA_HANDLING_HASH
  }, [])

  const closeDataDialog = useCallback(() => {
    // Only step back in history if we're the ones who pushed the hash entry,
    // otherwise (e.g. a shared deep link) just drop the hash in place.
    if (window.location.hash === DATA_HANDLING_HASH && openedViaButton.current) {
      openedViaButton.current = false
      window.history.back()
    } else {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
      setDataDialogOpen(false)
    }
  }, [])

  // A nav link inside the overlay updates the URL via the router's History API,
  // which doesn't fire hashchange, so close the overlay directly on click.
  const dismissDataDialogForNavigation = useCallback(() => {
    openedViaButton.current = false
    setDataDialogOpen(false)
  }, [])

  return (
    <section className="border-b border-border bg-black text-primary-foreground">
      <div className="relative overflow-hidden">
        {/* faint grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            Trust &amp; Security
          </span>
          <h2 className="mx-auto mt-5 max-w-3xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Built Right. Secured by Default.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-primary-foreground/70 sm:text-lg">
            We handle sensitive operational and customer data with the same
            discipline as the systems we build for insurance and financial
            clients, encryption in transit and at rest, strict access control,
            and data minimization by design.
          </p>
          <div className="mt-9 flex justify-center">
            <BracketButton
              onClick={openDataDialog}
              variant="outline"
              className="border-primary-foreground/40 text-primary-foreground hover:border-primary-foreground hover:bg-primary-foreground/10"
            >
              How We Handle Your Data
            </BracketButton>
          </div>
        </div>
      </div>
      <DataHandlingDialog
        open={dataDialogOpen}
        onClose={closeDataDialog}
        onNavigate={dismissDataDialogForNavigation}
      />
    </section>
  );
}

