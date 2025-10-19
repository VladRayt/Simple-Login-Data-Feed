import ky from "ky"

import Config from "@/config"
// import { useAuthStore } from "@/shared/stores/auth.store"

export const apiClient = ky.create({
  prefixUrl: Config.API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      () => {
        // TODO: Uncomment when Firebase is ready
        // const token = useAuthStore.getState().email // or Firebase token
        // if (token) {
        //   request.headers.set("Authorization", `Bearer ${token}`)
        // }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        // Handle 401 - logout user
        if (response.status === 401) {
          // TODO: Uncomment when Firebase is ready
          // useAuthStore.getState().logout()
        }
        return response
      },
    ],
  },
  retry: {
    limit: 2,
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
})
