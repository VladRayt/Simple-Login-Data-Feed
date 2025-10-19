import type { FirebaseAuthTypes } from "@react-native-firebase/auth"

export type FirebaseUser = FirebaseAuthTypes.User

export interface AuthResult {
  user: FirebaseUser
  idToken: string
}
