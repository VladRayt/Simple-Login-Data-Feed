import { useEffect, useState } from "react"
import { Slot, SplashScreen } from "expo-router"
import { useFonts } from "@expo-google-fonts/space-grotesk"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { QueryClientProvider } from "@tanstack/react-query"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"

import { ErrorBoundary } from "@/shared/components/ErrorBoundary/ErrorBoundary"
import { initI18n } from "@/shared/i18n"
import { queryClient } from "@/shared/services/api/query"
import { ThemeProvider } from "@/shared/theme/context"
import { customFontsToLoad } from "@/shared/theme/typography"
import { loadDateFnsLocale } from "@/shared/utils/formatDate"
import { PersistNavigation } from "@/config/config.base"

SplashScreen.preventAutoHideAsync()

if (__DEV__) {
  require("@/devtools/ReactotronConfig")
}

export default function Root() {
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  useEffect(() => {
    GoogleSignin.configure()

    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  const loaded = fontsLoaded && isI18nInitialized

  useEffect(() => {
    if (fontError) throw fontError
  }, [fontError])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ErrorBoundary catchErrors={PersistNavigation.always}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <ThemeProvider>
            <KeyboardProvider>
              <Slot />
            </KeyboardProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
