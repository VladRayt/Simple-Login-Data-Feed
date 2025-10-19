// features/auth/screens/LoginScreen.tsx
import { FC, useState } from "react"
import { View, ViewStyle } from "react-native"

import { Button } from "@/shared/components/Button"
import { Screen } from "@/shared/components/Screen"
import { Text } from "@/shared/components/Text"
import { TextField } from "@/shared/components/TextField"
import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"
import { useSafeAreaInsetsStyle } from "@/shared/utils/useSafeAreaInsetsStyle"

export const LoginScreen: FC = function LoginScreen() {
  const { themed } = useAppTheme()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const $containerInsets = useSafeAreaInsetsStyle(["top", "bottom"])

  const handleLogin = () => {
    // TODO: implement auth logic
    console.log("Login", { email, password })
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed([$container, $containerInsets])}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={themed($header)}>
        <Text preset="heading" tx="loginScreen:title" />
        <Text preset="subheading" tx="loginScreen:subtitle" />
      </View>

      <View style={themed($form)}>
        <TextField
          value={email}
          onChangeText={setEmail}
          labelTx="loginScreen:emailFieldLabel"
          placeholderTx="loginScreen:emailFieldPlaceholder"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextField
          value={password}
          onChangeText={setPassword}
          labelTx="loginScreen:passwordFieldLabel"
          placeholderTx="loginScreen:passwordFieldPlaceholder"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Button
          testID="login-button"
          tx="loginScreen:tapToSignIn"
          preset="reversed"
          onPress={handleLogin}
        />
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.xl,
})

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxl,
})

const $form: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.md,
})
