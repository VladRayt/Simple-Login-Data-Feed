import { FC } from "react"
import { Platform, View, ViewStyle } from "react-native"

import { Button } from "@/shared/components/Button"
import { Text } from "@/shared/components/Text"
import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"

interface SocialLoginButtonsProps {
  onGoogleSignIn: () => void
  onAppleSignIn: () => void
  isGoogleLoading: boolean
  isAppleLoading: boolean
}

export const SocialLoginButtons: FC<SocialLoginButtonsProps> = ({
  onGoogleSignIn,
  onAppleSignIn,
  isGoogleLoading,
  isAppleLoading,
}) => {
  const { themed } = useAppTheme()

  return (
    <>
      <View style={themed($divider)}>
        <Text text="OR" size="sm" />
      </View>

      {Platform.OS === "ios" && (
        <Button
          testID="apple-signin-button"
          text="Sign in with Apple"
          preset="default"
          onPress={onAppleSignIn}
          disabled={isAppleLoading}
        />
      )}

      <Button
        testID="google-signin-button"
        text="Sign in with Google"
        preset="default"
        onPress={onGoogleSignIn}
        disabled={isGoogleLoading}
      />
    </>
  )
}

const $divider: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  marginVertical: spacing.sm,
})
