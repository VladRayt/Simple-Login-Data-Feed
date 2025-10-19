import { FC, useCallback, useMemo } from "react"
import { View, ViewStyle, TouchableOpacity, TextStyle } from "react-native"
import { useTranslation } from "react-i18next"

import { Icon } from "@/shared/components/Icon"
import { Text } from "@/shared/components/Text"
import { LANGUAGE_OPTIONS, LANGUAGE_NATIVE_LABELS } from "@/shared/constants/language.constants"
import { saveLanguage } from "@/shared/i18n"
import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"

export interface LanguageSelectorProps {
  onLanguageChange?: (language: string) => void
}

export const LanguageSelector: FC<LanguageSelectorProps> = ({ onLanguageChange }) => {
  const { themed } = useAppTheme()
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language.split("-")[0]

  const handleLanguageSelect = useCallback(
    async (language: string) => {
      await i18n.changeLanguage(language)
      saveLanguage(language)
      onLanguageChange?.(language)
    },
    [i18n, onLanguageChange],
  )

  const options = useMemo(
    () =>
      Object.values(LANGUAGE_OPTIONS).map((languageCode) => ({
        value: languageCode,
        label: LANGUAGE_NATIVE_LABELS[languageCode],
      })),
    [],
  )

  return (
    <View style={themed($container)}>
      {options.map((option) => {
        const isSelected = currentLanguage === option.value

        return (
          <TouchableOpacity
            key={option.value}
            style={themed([$option, isSelected && $optionSelected])}
            onPress={() => handleLanguageSelect(option.value)}
            activeOpacity={0.7}
          >
            <Text text={option.label} style={themed($optionText)} />
            {isSelected && (
              <Icon icon="check" size={20} color={themed((theme) => theme.colors.tint)} />
            )}
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
