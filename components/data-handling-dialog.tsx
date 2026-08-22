'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import {
  Activity,
  BadgeCheck,
  Code2,
  Download,
  Fingerprint,
  Lock,
  Rocket,
  ScanLine,
  Server,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import { SiteHeader } from './site-header'
import { PipelineStepModal, type PipelineStepDetail } from './pipeline-step-modal'
import { AccessControlVisual, CollectionVisual, ScopingVisual } from './pipeline-visuals'

interface DataHandlingDialogProps {
  open: boolean
  onClose: () => void
  // Called instead of onClose when a link inside the overlay is clicked, since
  // Next.js Link navigation updates the URL via the History API without firing
  // a native hashchange event.
  onNavigate: () => void
}

const PIPELINE_STEPS: PipelineStepDetail[] = [
  {
    step: '01',
    icon: Download,
    title: 'Collection',
    description:
      "The client shares only what's needed for the project schemas, sample records, documentation, through an encrypted intake channel. Nothing is pulled that wasn't explicitly scoped.",
    tag: 'Encryption, Scope Control',
    Visual: CollectionVisual,
  },
  {
    step: '02',
    icon: ScanLine,
    title: 'Scoping & Minimization',
    description:
      'Before any building starts, the team defines exactly which fields and records are relevant. Anything outside that scope is excluded or anonymized at this stage, not later.',
    tag: 'Minimization, Anonymization',
    Visual: ScopingVisual,
  },
  {
    step: '03',
    icon: Lock,
    title: 'Secure Transfer',
    description:
      'Data moves into an isolated development environment over encrypted channels. It never sits in transit unprotected, and it never lands directly in a shared or production system.',
    tag: 'Secure Channels',
    image: '/pipeline/secure-transfer.png',
  },
  {
    step: '04',
    icon: Code2,
    title: 'Processing & Development',
    description:
      'The solution is built and tested against the data in a sandboxed environment, separate from any client production system. Where possible, synthetic or masked data stands in for sensitive values during early development.',
    tag: 'Sandboxing, Masking',
    image: '/pipeline/processing-development.png',
  },
  {
    step: '05',
    icon: ShieldCheck,
    title: 'Access Control',
    description:
      "Every person and process touching the data operates under role-based permissions. Every read and write is logged, so there's a full audit trail of who touched what, and when.",
    tag: 'RBAC, Audit Logging',
    Visual: AccessControlVisual,
  },
  {
    step: '06',
    icon: BadgeCheck,
    title: 'Testing & Validation',
    description:
      "Before going live, the solution is validated against real-world conditions and reviewed for security gaps, checking not just that it works, but that it handles data the way it's supposed to.",
    tag: 'Security Review',
    image: '/pipeline/testing-validation.png',
  },
  {
    step: '07',
    icon: Rocket,
    title: 'Deployment',
    description:
      "The finished solution goes live, with the same access controls and encryption carried into production. This is the point where the client's data starts flowing through their new system in real time.",
    tag: 'Production Encryption',
    image: '/pipeline/deployment.png',
  },
  {
    step: '08',
    icon: Activity,
    title: 'Monitoring & Retention',
    description:
      "Once live, data handling doesn't stop being watched, access continues to be logged, and retention policies determine how long data is kept before it's purged or anonymized, so nothing lingers indefinitely.",
    tag: 'Continuous Logging',
    image: '/pipeline/monitoring-retention.png',
  },
]

const FEATURES = [
  {
    icon: Fingerprint,
    title: 'Privacy by Design',
    description:
      'Deterministic safety protocols and field-level scoping ensure your sensitive data never leaks into generalized models or shared environments.',
    tag: 'Zero Data Leakage',
  },
  {
    icon: Workflow,
    title: 'Transformation Integrity',
    description:
      'Validated processing pipelines systematically clean, normalize, and structure unstructured inputs with zero loss of semantic meaning.',
    tag: 'Schema Validated',
  },
  {
    icon: Server,
    title: 'Secure Deployment',
    description:
      'End-to-end encryption and immutable audit trails track every query and transformation, ensuring compliance with global data standards.',
    tag: 'Encrypted Infra',
  },
]

// Houses the "How We Handle Your Data" presentation as a full-screen view, keeping the
// site header/nav in place so visitors can keep browsing instead of scrolling back out.
export function DataHandlingDialog({ open, onClose, onNavigate }: DataHandlingDialogProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedStep, setSelectedStep] = useState<PipelineStepDetail | null>(null)

  const handleLinkClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('a')) onNavigate()
  }

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    containerRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // The step popup handles its own Escape listener first; only close the
        // full overlay when no popup is open.
        if (!selectedStep) onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [open, onClose, selectedStep])

  if (!open) return null

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="data-handling-title"
      tabIndex={-1}
      className="fixed inset-0 z-[100] overflow-y-auto bg-background text-foreground focus:outline-none"
      onClickCapture={handleLinkClickCapture}
    >
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="pt-2 text-center">
          <h2
            id="data-handling-title"
            className="text-balance text-3xl font-bold tracking-tight sm:text-5xl"
          >
            How We Handle Your Data
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            By using historical data, machine learning, and statistical modeling to forecast
            future outcomes, your business can move from being reactive to being proactive.
            Every step of our pipeline is engineered for absolute privacy and deterministic
            safety.
          </p>
        </div>

        <div className="mt-10 border border-border bg-primary text-primary-foreground sm:mt-14">
          <div className="flex items-center justify-between border-b border-primary-foreground/10 px-5 py-4 sm:px-8">
            <h3 className="text-lg font-bold sm:text-xl">Data Pipeline</h3>
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.15em] text-primary-foreground/60">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground/40" />
                Input
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Output
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px bg-primary-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
            {PIPELINE_STEPS.map((detail) => {
              const { step, icon: Icon, title, description, tag } = detail
              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => setSelectedStep(detail)}
                  className="group/step relative flex flex-col bg-primary p-6 text-left transition-all duration-300 ease-out hover:z-10 hover:-translate-y-1.5 hover:bg-primary-foreground/[0.04] hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.55)] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <span className="flex h-9 w-9 items-center justify-center border border-primary-foreground/15 bg-primary-foreground/5 transition-colors duration-300 group-hover/step:border-accent/50 group-hover/step:bg-accent/10">
                      <Icon className="h-4 w-4 text-primary-foreground/80 transition-colors duration-300 group-hover/step:text-accent" />
                    </span>
                    <span className="font-mono text-xs text-accent">{step}</span>
                  </div>
                  <h4 className="text-sm font-bold leading-snug">{title}</h4>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-primary-foreground/60">
                    {description}
                  </p>
                  <span className="mt-4 inline-block border border-primary-foreground/15 bg-primary-foreground/5 px-2.5 py-1.5 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-primary-foreground/70">
                    {tag}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-accent opacity-0 transition-opacity duration-300 group-hover/step:opacity-100">
                    View Details →
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mb-10 sm:mb-14">
          <div className="border-x border-t border-border px-5 py-10 text-center sm:px-8">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              Why It&apos;s Safe
            </span>
            <h3 className="mx-auto mt-3 max-w-2xl text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Built-In Guarantees, Not Afterthoughts
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, description, tag }, index) => (
              <div
                key={title}
                className="group flex flex-col bg-background p-6 transition-colors duration-300 hover:bg-muted/40 sm:p-8"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center border border-border bg-muted/60 transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h4 className="text-base font-bold">{title}</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
                <span className="mt-5 inline-block w-fit border border-border bg-muted/60 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PipelineStepModal detail={selectedStep} onClose={() => setSelectedStep(null)} />
    </div>
  )
}
