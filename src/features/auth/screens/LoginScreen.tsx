// features/auth/screens/LoginScreen.tsx
import { FC } from "react"
import { View, ViewStyle } from "react-native"
import { useRouter } from "expo-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/shared/components/Button"
import { FormTextField } from "@/shared/components/FormTextField"
import { Screen } from "@/shared/components/Screen"
import { Text } from "@/shared/components/Text"
import { useAuthStore } from "@/shared/stores/auth.store"
import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"
import { useSafeAreaInsetsStyle } from "@/shared/utils/useSafeAreaInsetsStyle"

import { loginSchema, LoginFormData } from "../schemas/login.schema"

export const LoginScreen: FC = function LoginScreen() {
  const { themed } = useAppTheme()
  const router = useRouter()
  const login = useAuthStore((state) => state.login)

  const $containerInsets = useSafeAreaInsetsStyle(["top", "bottom"])

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: LoginFormData) => {
    // Зберігаємо email як "токен" (бо БД немає)
    login(data.email)
    router.replace("/(tabs)/home")
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
        <FormTextField
          control={control}
          name="email"
          labelTx="loginScreen:emailFieldLabel"
          placeholderTx="loginScreen:emailFieldPlaceholder"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormTextField
          control={control}
          name="password"
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
          onPress={handleSubmit(onSubmit)}
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
