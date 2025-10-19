export type ThemeOption = (typeof THEME_OPTIONS)[keyof typeof THEME_OPTIONS]

export const THEME_OPTIONS = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: undefined, // undefined for system
} as const

export const THEME_LABELS = {
  [THEME_OPTIONS.LIGHT]: "settingsScreen:themeLightLabel",
  [THEME_OPTIONS.DARK]: "settingsScreen:themeDarkLabel",
  system: "settingsScreen:themeSystemLabel", // for system
} as const
