import { useState } from "react"

import { useNavigation } from "@/shared/navigation/navigation.helpers"
import { signInWithApple } from "@/shared/services/firebase/auth"
import { useAuthStore } from "@/shared/stores/auth.store"

export function useAppleAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()
  const loginWithFirebase = useAuthStore((state) => state.loginWithFirebase)

  const handleAppleSignIn = async () => {
    setIsLoading(true)

    const result = await signInWithApple()

    if (result) {
      loginWithFirebase(result.user, result.idToken)
      navigation.navigateToHome()
    }

    setIsLoading(false)
  }

  return {
    handleAppleSignIn,
    isLoading,
  }
}
