// features/settings/screens/SettingsScreen.tsx
import { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/shared/components/Button"
import { ListItem } from "@/shared/components/ListItem"
import { Screen } from "@/shared/components/Screen"
import { Text } from "@/shared/components/Text"
import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"
import { useRouter } from "expo-router"
import { useAuthStore } from "@/shared/stores/auth.store"

export const SettingsScreen: FC = function SettingsScreen() {
  const { themed } = useAppTheme()
  const router = useRouter()
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    router.replace("/")
  }

  return (
    <Screen preset="scroll" contentContainerStyle={themed($container)}>
      <View style={themed($section)}>
        <Text preset="subheading" tx="settingsScreen:account" style={themed($sectionTitle)} />

        <ListItem
          tx="settingsScreen:profile"
          leftIcon="settings"
          rightIcon="caretRight"
          onPress={() => console.log("Profile")}
        />

        <ListItem
          tx="settingsScreen:notifications"
          leftIcon="bell"
          rightIcon="caretRight"
          onPress={() => console.log("Notifications")}
        />
      </View>

      <View style={themed($section)}>
        <Text preset="subheading" tx="settingsScreen:preferences" style={themed($sectionTitle)} />

        <ListItem
          tx="settingsScreen:language"
          leftIcon="menu"
          rightIcon="caretRight"
          onPress={() => console.log("Language")}
        />

        <ListItem
          tx="settingsScreen:theme"
          leftIcon="view"
          rightIcon="caretRight"
          onPress={() => console.log("Theme")}
        />
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
