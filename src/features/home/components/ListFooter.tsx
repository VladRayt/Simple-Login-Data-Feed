import { FC } from "react"
import { ActivityIndicator, ViewStyle } from "react-native"

import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"

interface ListFooterProps {
  isLoading: boolean
}

export const ListFooter: FC<ListFooterProps> = ({ isLoading }) => {
  const { themed, theme } = useAppTheme()

  if (!isLoading) {
    return null
  }

  return <ActivityIndicator size="large" color={theme.colors.tint} style={themed($loader)} />
}

const $loader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.lg,
})
