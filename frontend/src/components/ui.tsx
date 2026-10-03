import {
  forwardRef,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react"
import { Link } from "react-router"
import { AlertCircle, ArrowRight, LoaderCircle } from "lucide-react"

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" to="/">
      <span className="brand-mark">I</span>
      {!compact && <span>InterviewAI</span>}
    </Link>
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost"
  loading?: boolean
}

export function Button({
  variant = "primary",
  loading,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button button-${variant} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoaderCircle className="spin" size={16} />}
      {children}
    </button>
  )
}

export function LinkButton({
  to,
  children,
  variant = "primary",
}: {
  to: string
  children: ReactNode
  variant?: "primary" | "secondary" | "ghost"
}) {
  return (
    <Link className={`button button-${variant}`} to={to}>
      {children}
    </Link>
  )
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return <section className={`card ${className}`}>{children}</section>
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="page-header">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="page-description">{description}</p>}
      </div>
      {action && <div className="page-action">{action}</div>}
    </div>
  )
}

export function SectionTitle({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="section-header">
      <div>
        <h2>{title}</h2>
        {description && <p className="muted">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="field">
      <span className="label">{label}</span>
      {children}
      {hint && <span className="hint">{hint}</span>}
    </label>
  )
}

export const Input =
  forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className = "", ...props }, ref) => (
      <input ref={ref} className={`input ${className}`} {...props} />
    ),
  )

export const Select =
  forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
    ({ className = "", ...props }, ref) => (
      <select ref={ref} className={`input select ${className}`} {...props} />
    ),
  )

export const Textarea =
  forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className = "", ...props }, ref) => (
      <textarea
        ref={ref}
        className={`input textarea ${className}`}
        {...props}
      />
    ),
  )

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode
  tone?: "neutral" | "blue" | "green" | "red" | "amber"
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

export function ErrorState({
  title = "Something went wrong",
  message,
  retry,
}: {
  title?: string
  message: string
  retry?: () => void
}) {
  return (
    <div className="error-state" role="alert">
      <AlertCircle size={18} />
      <div className="grow">
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
      {retry && (
        <Button variant="secondary" onClick={retry}>
          Retry
        </Button>
      )}
    </div>
  )
}

export function Skeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="skeleton-stack" aria-label="Loading">
      {Array.from({ length: rows }).map((_, index) => (
        <span className="skeleton" key={index} />
      ))}
    </div>
  )
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <ArrowRight size={18} />
      </div>
      <h3>{title}</h3>
      <p className="muted">{description}</p>
      {action}
    </div>
  )
}
