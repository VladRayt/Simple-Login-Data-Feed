import { useState } from "react"

import { useNavigation } from "@/shared/navigation/navigation.helpers"
import { signInWithGoogle } from "@/shared/services/firebase/auth"
import { useAuthStore } from "@/shared/stores/auth.store"

export function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()
  const loginWithFirebase = useAuthStore((state) => state.loginWithFirebase)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)

    const result = await signInWithGoogle()

    if (result) {
      loginWithFirebase(result.user, result.idToken)
      navigation.navigateToHome()
    }

    setIsLoading(false)
  }

  return {
    handleGoogleSignIn,
    isLoading,
  }
}
