import { FC } from "react"
import { View, ViewStyle } from "react-native"

import { Button } from "@/shared/components/Button"
import { LanguageSelector } from "@/shared/components/LanguageSelector/LanguageSelector"
import { Screen } from "@/shared/components/Screen"
import { ThemeSelector } from "@/shared/components/ThemeSelector/ThemeSelector"
import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"

import { SettingsSection } from "../components/SettingsSection"
import { useLogout } from "../hooks/useLogout"

export const SettingsScreen: FC = function SettingsScreen() {
  const { themed } = useAppTheme()
  const { handleLogout } = useLogout()

  return (
    <Screen preset="scroll" contentContainerStyle={themed($container)}>
      <SettingsSection titleTx="settingsScreen:language">
        <LanguageSelector />
      </SettingsSection>

      <SettingsSection titleTx="settingsScreen:theme">
        <ThemeSelector />
      </SettingsSection>

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
