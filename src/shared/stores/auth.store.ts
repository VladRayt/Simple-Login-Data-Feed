// shared/stores/auth.store.ts
import { MMKV } from "react-native-mmkv"
import { create } from "zustand"

const storage = new MMKV()

const AUTH_KEY = "auth.email"

interface AuthState {
  email: string | null
  isAuthenticated: boolean
  login: (email: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  email: storage.getString(AUTH_KEY) ?? null,
  isAuthenticated: !!storage.getString(AUTH_KEY),

  login: (email: string) => {
    storage.set(AUTH_KEY, email)
    set({ email, isAuthenticated: true })
  },

  logout: () => {
    storage.delete(AUTH_KEY)
    set({ email: null, isAuthenticated: false })
  },
}))
