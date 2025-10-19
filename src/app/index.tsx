import { useEffect } from "react"
import { useRouter } from "expo-router"
import { useAuthStore } from "@/shared/stores/auth.store"
import { LoginScreen } from "@/features/auth"

export default function Index() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)/home")
    }
  }, [isAuthenticated])

  return <LoginScreen />
}
