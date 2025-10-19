import { Alert } from "react-native"
import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 хвилин
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => {
        // Global error handler
        const message = error instanceof Error ? error.message : "Something went wrong"
        Alert.alert("Error", message)
      },
    },
  },
})
