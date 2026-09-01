'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import type { ComponentType } from 'react'

export interface PipelineStepDetail {
  step: string
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  tag: string
  image?: string
  Visual?: ComponentType
}

interface PipelineStepModalProps {
  detail: PipelineStepDetail | null
  onClose: () => void
}

// Themed popup for a single pipeline stage, layered above the full-screen overlay.
export function PipelineStepModal({ detail, onClose }: PipelineStepModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Keep rendering the last-shown step's content during the exit transition,
  // since `detail` itself goes to null immediately on close.
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [renderedDetail, setRenderedDetail] = useState<PipelineStepDetail | null>(null)

  useEffect(() => {
    if (detail) {
      setRenderedDetail(detail)
      setMounted(true)
      const raf = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(raf)
    }
    setVisible(false)
    const timeout = setTimeout(() => setMounted(false), 200)
    return () => clearTimeout(timeout)
  }, [detail])

  useEffect(() => {
    if (!detail) return

    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    }

    document.addEventListener('keydown', onKeyDown, { capture: true })
    return () => document.removeEventListener('keydown', onKeyDown, { capture: true })
  }, [detail, onClose])

  if (!mounted || !renderedDetail) return null

  const { step, icon: Icon, title, description, tag, image, Visual } = renderedDetail

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pipeline-step-title"
      className={`fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-primary/70 p-4 py-10 backdrop-blur-sm transition-opacity duration-200 ease-out sm:p-8 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-lg border border-border bg-background text-foreground shadow-2xl transition-all duration-200 ease-out ${
          visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center border border-border bg-background text-foreground transition-colors hover:border-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="aspect-[4/3] w-full overflow-hidden border-b border-border bg-primary">
          {image ? (
            <Image
              src={image}
              alt={`${title} illustration`}
              width={640}
              height={480}
              className="h-full w-full object-cover"
            />
          ) : Visual ? (
            <Visual />
          ) : null}
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-border bg-muted/60">
              <Icon className="h-4 w-4 text-accent" />
            </span>
            <span className="font-mono text-xs text-accent">{step}</span>
          </div>
          <h3 id="pipeline-step-title" className="mt-4 text-xl font-bold tracking-tight">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
          <span className="mt-5 inline-block border border-border bg-muted/60 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            {tag}
          </span>
        </div>
      </div>
    </div>
  )
}
