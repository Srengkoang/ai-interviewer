import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type Role = "candidate" | "recruiter" | "admin"
export type User = { name: string; email: string; role: Role }
export type Registration = User & {
  status: 
  | "Pending email verification" 
  | "Pending admin approval" 
  | "Active"
  | "Rejected"
}

type AuthValue = {
  user: User | null
  login: (email: string, role: Role) => User
  register: (
    name: string,
    email: string,
    role: Exclude<Role, "admin">,
  ) => Registration
  logout: () => void
}

const AuthContext = createContext<AuthValue | null>(null)
const USER_KEY = "interviewai.user"
const REGISTRATIONS_KEY = "interviewai.registrations"

export function getRegistrations(): Registration[] {
  try {
    const registrations = JSON.parse(
      localStorage.getItem(REGISTRATIONS_KEY) || "[]",
    )
    return Array.isArray(registrations) ? registrations : []
  } catch {
    return []
  }
}

function updateRegistration(email: string, status: Registration["status"]) {
  const registrations = getRegistrations().map((registration) =>
    registration.email === email ? { ...registration, status } : registration,
  )
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations))
}

export function approveRecruiter(email: string) {
  updateRegistration(email, "Active")
}

export function rejectRecruiter(email: string) {
  updateRegistration(email, "Rejected")
}

export function verifyCandidate(email: string) {
  updateRegistration(email, "Active")
}

function readUser(): User | null {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null")
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readUser)

  const value = useMemo<AuthValue>(
    () => ({
      user,
      login(email, role) {
        const registration = getRegistrations().find(
          (item) => item.email.toLowerCase() === email.toLowerCase(),
        )
        if (registration && registration.status !== "Active") {
          throw new Error(
            registration.status === "Pending admin approval"
              ? "Your recruiter account is waiting for administrator approval."
              : "Verify your email address before signing in.",
          )
        }
        const next = {
          email,
          role,
          name:
            registration?.name ||
            email
              .split("@")[0]
              .split(/[._-]/)
              .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
              .join(" ") ||
            "User",
        }
        localStorage.setItem(USER_KEY, JSON.stringify(next))
        setUser(next)
        return next
      },
      register(name, email, role) {
        const next: Registration = {
          name,
          email,
          role,
          status:
            role === "recruiter"
              ? "Pending admin approval"
              : "Pending email verification",
        }
        const registrations = [
          next,
          ...getRegistrations().filter(
            (registration) =>
              registration.email.toLowerCase() !== email.toLowerCase(),
          ),
        ]
        localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations))
        return next
      },
      logout() {
        localStorage.removeItem(USER_KEY)
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error("useAuth must be used inside AuthProvider")
  return value
}
