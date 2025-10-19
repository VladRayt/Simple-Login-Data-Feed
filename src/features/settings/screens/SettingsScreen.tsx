import { FC, useCallback } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/shared/components/Button"
import { LanguageSelector } from "@/shared/components/LanguageSelector/LanguageSelector"
import { Screen } from "@/shared/components/Screen"
import { Text } from "@/shared/components/Text"
import { ThemeSelector } from "@/shared/components/ThemeSelector/ThemeSelector"
import { useNavigation } from "@/shared/navigation/navigation.helpers"
import { signOut } from "@/shared/services/firebase/auth"
import { useAuthStore } from "@/shared/stores/auth.store"
import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"

export const SettingsScreen: FC = function SettingsScreen() {
  const { themed } = useAppTheme()
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

  return (
    <Screen preset="scroll" contentContainerStyle={themed($container)}>
      <View style={themed($section)}>
        <Text preset="subheading" tx="settingsScreen:language" style={themed($sectionTitle)} />
        <LanguageSelector />
      </View>

      <View style={themed($section)}>
        <Text preset="subheading" tx="settingsScreen:theme" style={themed($sectionTitle)} />
        <ThemeSelector />
      </View>

      <View style={themed($section)}>
        <Button
          testID="logout-button"
          tx="settingsScreen:logout"
          preset="default"
          onPress={handleLogout}
        />
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.xl,
})

const $section: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xl,
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})
