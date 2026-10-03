import { Suspense } from "react"
import { AuthProvider } from "./auth"
import AppRouter from "./routes"

export default function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={<div className="route-loading">Loading your workspace…</div>}
      >
        <AppRouter />
      </Suspense>
    </AuthProvider>
  )
}
