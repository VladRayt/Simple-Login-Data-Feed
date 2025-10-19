import { useEffect } from "react"

import { LoginScreen } from "@/features/auth"
import { useNavigation } from "@/shared/navigation/navigation.helpers"
import { useAuthStore } from "@/shared/stores/auth.store"

export default function Index() {
  const navigation = useNavigation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigateToHome()
    }
  }, [isAuthenticated, navigation])

  return <LoginScreen />
}
