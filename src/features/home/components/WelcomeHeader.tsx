// components/WelcomeHeader.tsx
import { FC } from "react"
import { View, ViewStyle } from "react-native"

import { Text } from "@/shared/components/Text"
import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"

interface WelcomeHeaderProps {
  email?: string | null
}

export const WelcomeHeader: FC<WelcomeHeaderProps> = ({ email }) => {
  const { themed } = useAppTheme()

  if (!email) return null

  return (
    <View style={themed($header)}>
      <Text text={`Welcome, ${email}`} preset="subheading" />
    </View>
  )
}

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
  alignItems: "center",
})
