import { FC } from "react"
import { View, ViewStyle } from "react-native"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useAppleAuth, useGoogleAuth } from "@/features/auth"
import { Screen } from "@/shared/components/Screen"
import { Text } from "@/shared/components/Text"
import { useNavigation } from "@/shared/navigation/navigation.helpers"
import { useAuthStore } from "@/shared/stores/auth.store"
import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"
import { useSafeAreaInsetsStyle } from "@/shared/utils/useSafeAreaInsetsStyle"

import { LoginForm } from "../components/LoginForm"
import { SocialLoginButtons } from "../components/SocialLoginButtons"
import { loginSchema, LoginFormData } from "../schemas/login.schema"

export const LoginScreen: FC = function LoginScreen() {
  const { themed } = useAppTheme()
  const navigation = useNavigation()
  const login = useAuthStore((state) => state.login)
  const { handleGoogleSignIn, isLoading: isGoogleLoading } = useGoogleAuth()
  const { handleAppleSignIn, isLoading: isAppleLoading } = useAppleAuth()

  const $containerInsets = useSafeAreaInsetsStyle(["top", "bottom"])

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: LoginFormData) => {
    login(data.email)
    navigation.navigateToHome()
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
        <LoginForm control={control} onSubmit={handleSubmit(onSubmit)} />

        <SocialLoginButtons
          onGoogleSignIn={handleGoogleSignIn}
          onAppleSignIn={handleAppleSignIn}
          isGoogleLoading={isGoogleLoading}
          isAppleLoading={isAppleLoading}
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
