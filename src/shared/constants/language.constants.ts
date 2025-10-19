export const LANGUAGE_OPTIONS = {
  EN: "en",
  UK: "uk",
  ES: "es",
  FR: "fr",
} as const

export type LanguageOption = (typeof LANGUAGE_OPTIONS)[keyof typeof LANGUAGE_OPTIONS]

export const LANGUAGE_LABELS = {
  [LANGUAGE_OPTIONS.EN]: "settingsScreen:languageEnglish",
  [LANGUAGE_OPTIONS.UK]: "settingsScreen:languageUkrainian",
  [LANGUAGE_OPTIONS.ES]: "settingsScreen:languageSpanish",
  [LANGUAGE_OPTIONS.FR]: "settingsScreen:languageFrench",
} as const

export const LANGUAGE_NATIVE_LABELS = {
  [LANGUAGE_OPTIONS.EN]: "English",
  [LANGUAGE_OPTIONS.UK]: "Українська",
  [LANGUAGE_OPTIONS.ES]: "Español",
  [LANGUAGE_OPTIONS.FR]: "Français",
} as const
