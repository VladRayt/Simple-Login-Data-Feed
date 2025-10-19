export const PREFERENCE_ITEMS = [
  {
    labelTx: "settingsScreen:language" as const,
    leftIcon: "menu" as const,
    rightIcon: "caretRight" as const,
    handler: "language" as const,
  },
  {
    labelTx: "settingsScreen:theme" as const,
    leftIcon: "view" as const,
    rightIcon: "caretRight" as const,
    handler: "theme" as const,
  },
] as const
