import { HTTPError } from "ky"

export type ApiError =
  | { kind: "timeout" }
  | { kind: "cannot-connect" }
  | { kind: "server" }
  | { kind: "unauthorized" }
  | { kind: "forbidden" }
  | { kind: "not-found" }
  | { kind: "bad-data" }
  | { kind: "unknown"; message?: string }

export async function handleApiError(error: unknown): Promise<ApiError> {
  if (error instanceof HTTPError) {
    const status = error.response.status

    switch (status) {
      case 401:
        return { kind: "unauthorized" }
      case 403:
        return { kind: "forbidden" }
      case 404:
        return { kind: "not-found" }
      case 408:
        return { kind: "timeout" }
      case 500:
      case 502:
      case 503:
        return { kind: "server" }
      default:
        return { kind: "unknown", message: error.message }
    }
  }

  if (error instanceof Error) {
    if (error.message.includes("network") || error.message.includes("fetch")) {
      return { kind: "cannot-connect" }
    }
    return { kind: "unknown", message: error.message }
  }

  return { kind: "unknown" }
}
