import { useEffect } from "react"
import { useRouter } from "expo-router"

import { LoginScreen } from "@/features/auth/screens/LoginScreen"

export default function Index() {
  const router = useRouter()
  const isAuthenticated = false // TODO: get from auth store

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)/home")
    }
  }, [isAuthenticated, router])

  return <LoginScreen />
}
