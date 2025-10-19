import { useCallback } from "react"

import { useNavigation } from "@/shared/navigation/navigation.helpers"
import { signOut } from "@/shared/services/firebase/auth"
import { useAuthStore } from "@/shared/stores/auth.store"

export const useLogout = () => {
  const navigation = useNavigation()
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = useCallback(async () => {
    try {
      await signOut()
      logout()
      navigation.logout()
    } catch (error) {
      console.error("Failed to logout:", error)
    }
  }, [logout, navigation])

  return { handleLogout }
}
