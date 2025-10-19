import { FC, ReactNode } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Text } from "@/shared/components/Text"
import { TxKeyPath } from "@/shared/i18n"
import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"

interface SettingsSectionProps {
  titleTx: TxKeyPath
  children: ReactNode
}

const $section: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xl,
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

export const SettingsSection: FC<SettingsSectionProps> = ({ titleTx, children }) => {
  const { themed } = useAppTheme()

  return (
    <View style={themed($section)}>
      <Text preset="subheading" tx={titleTx} style={themed($sectionTitle)} />
      {children}
    </View>
  )
}
