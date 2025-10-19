import { Alert, Platform } from "react-native"
import * as AppleAuthentication from "expo-apple-authentication"
import auth, {
  signInWithCredential,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  AppleAuthProvider,
  getIdToken,
} from "@react-native-firebase/auth"
import { GoogleSignin } from "@react-native-google-signin/google-signin"

import type { AuthResult } from "./types"

export async function signInWithGoogle(): Promise<AuthResult | null> {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

    const signInResult = await GoogleSignin.signIn()

    const idToken = signInResult.data?.idToken

    if (!idToken) {
      throw new Error("No ID token received from Google Sign-In")
    }

    const googleCredential = GoogleAuthProvider.credential(idToken)

    const userCredential = await signInWithCredential(auth(), googleCredential)

    const firebaseIdToken = await getIdToken(userCredential.user)

    return {
      user: userCredential.user,
      idToken: firebaseIdToken,
    }
  } catch (error) {
    console.warn("Google Sign-In error:", error)
    return null
  }
}

export async function signInWithApple(): Promise<AuthResult | null> {
  try {
    if (Platform.OS !== "ios") {
      Alert.alert("Error", "Apple Sign-In is only available on iOS")
      return null
    }

    const isAvailable = await AppleAuthentication.isAvailableAsync()
    if (!isAvailable) {
      Alert.alert("Error", "Apple Sign-In is not available on this device")
      return null
    }

    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    })

    const { identityToken } = credential

    if (!identityToken) {
      throw new Error("No identity token received from Apple Sign-In")
    }

    const appleCredential = AppleAuthProvider.credential(identityToken)

    const userCredential = await signInWithCredential(auth(), appleCredential)

    const firebaseIdToken = await getIdToken(userCredential.user)

    return {
      user: userCredential.user,
      idToken: firebaseIdToken,
    }
  } catch (error) {
    console.warn("Apple Sign-In error:", error)
    return null
  }
}

export async function signOut(): Promise<void> {
  try {
    await GoogleSignin.signOut()

    await firebaseSignOut(auth())
  } catch (error) {
    console.warn("Sign out error:", error)
  }
}
