import { FC, useCallback } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/shared/components/Button"
import { Screen } from "@/shared/components/Screen"
import { Text } from "@/shared/components/Text"
import { useNavigation } from "@/shared/navigation/navigation.helpers"
import { signOut } from "@/shared/services/firebase/auth"
import { useAuthStore } from "@/shared/stores/auth.store"
import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"

import { SettingsList } from "../components/SettingsList"
import { PREFERENCE_ITEMS } from "../constants/settings.constants"

export const SettingsScreen: FC = function SettingsScreen() {
  const { themed } = useAppTheme()
  const navigation = useNavigation()
  const logout = useAuthStore((state) => state.logout)

  const handlers = {
    language: () => console.log("Language"),
    theme: () => console.log("Theme"),
  }

  const handleLogout = useCallback(async () => {
    try {
      await signOut()
      logout()
      navigation.logout()
    } catch (error) {
      console.error("Failed to logout:", error)
    }
  }, [logout, navigation])

  const preferenceItems = PREFERENCE_ITEMS.map((item) => ({
    ...item,
    onPress: handlers[item.handler],
  }))

  return (
    <Screen preset="scroll" contentContainerStyle={themed($container)}>
      <View style={themed($section)}>
        <Text preset="subheading" tx="settingsScreen:preferences" style={themed($sectionTitle)} />
        <SettingsList items={preferenceItems} />
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
