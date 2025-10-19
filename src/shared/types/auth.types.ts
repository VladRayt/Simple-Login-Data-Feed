import { FirebaseUser } from "@/shared/services/firebase/types"

export interface AuthState {
  email: string | null
  idToken: string | null
  user: FirebaseUser | null
  isAuthenticated: boolean

  login: (email: string) => void

  loginWithFirebase: (user: FirebaseUser, idToken: string) => void

  logout: () => void
}
