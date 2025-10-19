import { useEffect } from "react"
import { useRouter } from "expo-router"

import { LoginScreen } from "@/features/auth"
import { useAuthStore } from "@/shared/stores/auth.store"

export default function Index() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)/home")
    }
  }, [isAuthenticated, router])

  return <LoginScreen />
}
