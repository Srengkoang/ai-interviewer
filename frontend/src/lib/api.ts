const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "")

type ApiEnvelope<T> = { success: boolean; data?: T; error?: string }

export async function apiPost<T>(
  path: string,
  body: unknown,
  signal?: AbortSignal,
): Promise<T> {
  if (!API_BASE) {
    throw new Error(
      "The API URL is not configured. Set VITE_API_BASE_URL and try again.",
    )
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  })

  let payload: ApiEnvelope<T>
  try {
    payload = await response.json()
  } catch {
    throw new Error(
      "The server returned an unreadable response. Please try again.",
    )
  }

  if (!response.ok || payload.success === false) {
    throw new Error(payload.error || `Request failed (${response.status})`)
  }

  return (payload.data ?? payload) as T
}
