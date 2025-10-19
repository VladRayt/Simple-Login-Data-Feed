import { FC, useCallback, useMemo } from "react"
import { View, ViewStyle, TouchableOpacity, TextStyle, ImageStyle } from "react-native"
import { useMMKVString } from "react-native-mmkv"

import { Icon } from "@/shared/components/Icon"
import { Text } from "@/shared/components/Text"
import { THEME_OPTIONS, THEME_LABELS } from "@/shared/constants/theme.constants"
import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"
import type { ThemeContextModeT } from "@/shared/theme/types"
import { storage } from "@/shared/utils/storage"

export interface ThemeSelectorProps {
  onThemeChange?: (theme: ThemeContextModeT) => void
}

export const ThemeSelector: FC<ThemeSelectorProps> = ({ onThemeChange }) => {
  const { themed, setThemeContextOverride } = useAppTheme()

  const [storedTheme] = useMMKVString("ignite.themeScheme", storage)
  const currentTheme = storedTheme || "system"

  const handleThemeSelect = useCallback(
    (theme: ThemeContextModeT) => {
      setThemeContextOverride(theme)
      onThemeChange?.(theme)
    },
    [setThemeContextOverride, onThemeChange],
  )

  const options = useMemo(
    () => [
      { value: THEME_OPTIONS.LIGHT, labelTx: THEME_LABELS[THEME_OPTIONS.LIGHT] },
      { value: THEME_OPTIONS.DARK, labelTx: THEME_LABELS[THEME_OPTIONS.DARK] },
      { value: THEME_OPTIONS.SYSTEM, labelTx: THEME_LABELS.system },
    ],
    [],
  )

  return (
    <View style={themed($container)}>
      {options.map((option) => {
        const isSelected = currentTheme === (option.value || "system")

        return (
          <TouchableOpacity
            key={option.labelTx}
            style={themed([$option, isSelected && $optionSelected])}
            onPress={() => handleThemeSelect(option.value)}
            activeOpacity={0.7}
          >
            <Text tx={option.labelTx} style={themed($optionText)} />
            {isSelected && <Icon icon="check" size={20} style={themed($checkIcon)} />}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = (theme) => ({
  gap: theme.spacing.xs,
})

const $option: ThemedStyle<ViewStyle> = (theme) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: theme.spacing.md,
  paddingHorizontal: theme.spacing.lg,
  backgroundColor: theme.colors.background,
  borderRadius: theme.spacing.sm,
  borderWidth: 1,
  borderColor: theme.colors.border,
})

const $optionSelected: ThemedStyle<ViewStyle> = (theme) => ({
  borderColor: theme.colors.tint,
  backgroundColor: theme.colors.palette.neutral100,
})

const $optionText: ThemedStyle<TextStyle> = () => ({
  flex: 1,
})

const $checkIcon: ThemedStyle<ImageStyle> = (theme) => ({
  tintColor: theme.colors.tint,
})
