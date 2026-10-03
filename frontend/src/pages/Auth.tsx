import { CheckCircle2, Clock3, MailCheck } from "lucide-react"
import { useState, type FormEvent } from "react"
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router"

import { AuthFrame } from "../components/layouts"
import { Button, Card, Field, Input, Select } from "../components/ui"
import {
  useAuth,
  verifyCandidate,
  type Role,
} from "../app/auth"

function destination(role: Role) {
  return role === "candidate" ? "/candidate" : "/dashboard"
}

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [role, setRole] = useState<Role>("recruiter")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    const values = new FormData(event.currentTarget)

    const email = String(values.get("email") || "")
    const password = String(values.get("password") || "")

    if (!email || password.length < 6) {
      setError(
        "Enter a valid email and a password with at least 6 characters.",
      )
      return
    }

    setLoading(true)

    window.setTimeout(() => {
      try {
        login(email, role)
        navigate(destination(role))
      } catch (loginError) {
        setError(
          loginError instanceof Error
            ? loginError.message
            : "Unable to sign in.",
        )

        setLoading(false)
      }
    }, 350)
  }

  return (
    <AuthFrame>
      <form className="auth-form" onSubmit={submit}>
        <div className="form-heading">
          <p className="eyebrow">Welcome back</p>

          <h2>Sign in to InterviewAI</h2>

          <p className="muted">
            Continue to your interviews and hiring workspace.
          </p>
        </div>

        {error && <div className="form-error">{error}</div>}

        <Field label="Email address">
          <Input
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
          />
        </Field>

        <Field label="Password">
          <Input
            name="password"
            type="password"
            placeholder="At least 6 characters"
            autoComplete="current-password"
          />
        </Field>

        <Field label="Sign in as">
          <Select
            value={role}
            onChange={(event) =>
              setRole(event.target.value as Role)
            }
          >
            <option value="recruiter">Recruiter</option>
            <option value="candidate">Candidate</option>
            <option value="admin">Administrator</option>
          </Select>
        </Field>

        <Button type="submit" loading={loading}>
          Sign in
        </Button>

        <p className="auth-switch">
          New to InterviewAI?{" "}
          <Link to="/register">Create an account</Link>
        </p>

        <p className="auth-disclosure">
          Authentication endpoints are not yet available. This
          preview stores your workspace role only in this browser.
        </p>
      </form>
    </AuthFrame>
  )
}

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [role, setRole] =
    useState<Exclude<Role, "admin">>("candidate")

  const [error, setError] = useState("")

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    const values = new FormData(event.currentTarget)

    const name = String(values.get("name") || "")
    const email = String(values.get("email") || "")
    const password = String(values.get("password") || "")

    if (
      name.length < 2 ||
      !email.includes("@") ||
      password.length < 8
    ) {
      setError(
        "Enter your name, a valid email, and a password with at least 8 characters.",
      )
      return
    }

    register(name, email, role)

    navigate(
      `/registration-status?type=${role}&email=${encodeURIComponent(email)}`,
    )
  }

  return (
    <AuthFrame>
      <form className="auth-form" onSubmit={submit}>
        <div className="form-heading">
          <p className="eyebrow">Create your account</p>

          <h2>Get started with InterviewAI</h2>

          <p className="muted">
            Set up your profile in less than a minute.
          </p>
        </div>

        {error && <div className="form-error">{error}</div>}

        <Field label="Full name">
          <Input
            name="name"
            placeholder="Alex Chen"
            autoComplete="name"
          />
        </Field>

        <Field label="Work email">
          <Input
            name="email"
            type="email"
            placeholder="alex@company.com"
            autoComplete="email"
          />
        </Field>

        <Field
          label="Password"
          hint="Use 8 or more characters."
        >
          <Input
            name="password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
          />
        </Field>

        <Field label="I am joining as">
          <Select
            value={role}
            onChange={(event) =>
              setRole(
                event.target.value as Exclude<Role, "admin">,
              )
            }
          >
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </Select>
        </Field>

        <Button type="submit">
          Create account
        </Button>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>

        <p className="auth-disclosure">
          Administrator accounts are created internally and
          cannot be registered from this page.
        </p>
      </form>
    </AuthFrame>
  )
}

export function RegistrationStatusPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const type =
    params.get("type") === "recruiter"
      ? "recruiter"
      : "candidate"

  const email = params.get("email") || ""

  function verifyEmail() {
    verifyCandidate(email)
    login(email, "candidate")
    navigate("/candidate")
  }

  return (
    <AuthFrame>
      <Card className="registration-status">
        <div className="registration-status-icon">
          {type === "recruiter" ? (
            <Clock3 size={25} />
          ) : (
            <MailCheck size={25} />
          )}
        </div>

        <p className="eyebrow">
          {type === "recruiter"
            ? "Approval required"
            : "Check your inbox"}
        </p>

        <h2>
          {type === "recruiter"
            ? "Your recruiter account is under review"
            : "Verify your email address"}
        </h2>

        <p className="muted">
          {type === "recruiter"
            ? "An InterviewAI administrator must approve your account before you can access the recruiter workspace. We’ll notify you by email when it is ready."
            : `We sent a verification link to ${email}. Verify your address before accessing candidate interviews.`}
        </p>

        {type === "candidate" ? (
          <Button onClick={verifyEmail}>
            <CheckCircle2 size={17} />
            Simulate email verification
          </Button>
        ) : (
          <Link
            className="button button-secondary"
            to="/login"
          >
            Return to sign in
          </Link>
        )}

        <p className="auth-disclosure">
          Email delivery and account approval require
          authentication backend endpoints. This preview
          stores status changes in this browser.
        </p>
      </Card>
    </AuthFrame>
  )
}