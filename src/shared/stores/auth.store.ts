import { MMKV } from "react-native-mmkv"
import { create } from "zustand"

import type { FirebaseUser } from "@/shared/services/firebase/types"

import { AUTH_EMAIL_KEY, AUTH_TOKEN_KEY } from "../constants/auth.constants"
import { AuthState } from "../types/auth.types"

const storage = new MMKV()

export const useAuthStore = create<AuthState>((set) => ({
  email: storage.getString(AUTH_EMAIL_KEY) ?? null,
  idToken: storage.getString(AUTH_TOKEN_KEY) ?? null,
  user: null,
  isAuthenticated: !!(storage.getString(AUTH_EMAIL_KEY) || storage.getString(AUTH_TOKEN_KEY)),

  login: (email: string) => {
    storage.set(AUTH_EMAIL_KEY, email)
    set({ email, isAuthenticated: true })
  },

  loginWithFirebase: (user: FirebaseUser, idToken: string) => {
    storage.set(AUTH_EMAIL_KEY, user.email ?? "")
    storage.set(AUTH_TOKEN_KEY, idToken)
    set({
      user,
      email: user.email,
      idToken,
      isAuthenticated: true,
    })
  },

  logout: () => {
    storage.delete(AUTH_EMAIL_KEY)
    storage.delete(AUTH_TOKEN_KEY)
    set({
      email: null,
      idToken: null,
      user: null,
      isAuthenticated: false,
    })
  },
}))
