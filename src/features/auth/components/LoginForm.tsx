import { FC } from "react"
import { View, ViewStyle } from "react-native"
import { Control } from "react-hook-form"

import { Button } from "@/shared/components/Button"
import { FormTextField } from "@/shared/components/FormTextField"
import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"

import { LoginFormData } from "../schemas/login.schema"

interface LoginFormProps {
  control: Control<LoginFormData>
  onSubmit: () => void
}

export const LoginForm: FC<LoginFormProps> = ({ control, onSubmit }) => {
  const { themed } = useAppTheme()

  return (
    <View style={themed($formFields)}>
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
        onPress={onSubmit}
      />
    </View>
  )
}

const $formFields: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.md,
})
