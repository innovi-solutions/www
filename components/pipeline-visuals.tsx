import {
  Archive,
  ArrowRight,
  CheckCircle2,
  Database,
  Filter,
  Inbox,
  KeyRound,
  ScrollText,
  Table2,
  Users,
} from 'lucide-react'
import type { ComponentType } from 'react'

function VisualNode({
  icon: Icon,
  label,
  sublabel,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  sublabel?: string
}) {
  return (
    <div className="flex w-24 flex-col items-center gap-2 text-center sm:w-28">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10 shadow-[0_0_18px_-2px_theme(colors.accent/50%)]">
        <Icon className="h-6 w-6 text-accent" />
      </div>
      <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-primary-foreground/80 sm:text-[10px]">
        {label}
      </div>
      {sublabel ? (
        <div className="font-mono text-[8px] uppercase tracking-[0.08em] text-primary-foreground/40">
          {sublabel}
        </div>
      ) : null}
    </div>
  )
}

function VisualArrow() {
  return <ArrowRight className="h-4 w-4 shrink-0 text-accent/60" />
}

function VisualFrame({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 border border-primary-foreground/10 bg-primary px-6 py-10 text-center">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h4 className="mt-2 text-lg font-bold uppercase tracking-tight text-primary-foreground sm:text-xl">
          {title}
        </h4>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">{children}</div>
    </div>
  )
}

// Client shares scoped source data through an encrypted intake channel.
export function CollectionVisual() {
  return (
    <VisualFrame eyebrow="Secure Intake" title="Encrypted Collection Channel">
      <VisualNode icon={Database} label="Client Source" sublabel="Schemas & Samples" />
      <VisualArrow />
      <VisualNode icon={Inbox} label="Intake Endpoint" sublabel="TLS 1.3" />
      <VisualArrow />
      <VisualNode icon={Archive} label="Scoped Staging" sublabel="Encrypted at Rest" />
    </VisualFrame>
  )
}

// Raw fields are filtered down to only what's relevant, with the rest redacted.
export function ScopingVisual() {
  return (
    <VisualFrame eyebrow="Data Minimization" title="Scope & Redact Pipeline">
      <VisualNode icon={Table2} label="Raw Fields" sublabel="Full Record Set" />
      <VisualArrow />
      <VisualNode icon={Filter} label="Scope Filter" sublabel="Field-Level Rules" />
      <VisualArrow />
      <VisualNode icon={CheckCircle2} label="Minimized Set" sublabel="Anonymized" />
    </VisualFrame>
  )
}

// Role-scoped access with every read/write captured in an audit trail.
export function AccessControlVisual() {
  return (
    <VisualFrame eyebrow="Access Control" title="RBAC + Audit Trail">
      <VisualNode icon={Users} label="Role-Based Users" sublabel="Least Privilege" />
      <VisualArrow />
      <VisualNode icon={KeyRound} label="Permission Gate" sublabel="Per-Request Auth" />
      <VisualArrow />
      <VisualNode icon={ScrollText} label="Audit Log" sublabel="Who, What, When" />
    </VisualFrame>
  )
}
