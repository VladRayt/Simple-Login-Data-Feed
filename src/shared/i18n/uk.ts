const uk = {
  common: {
    ok: "Гаразд!",
    cancel: "Скасувати",
    back: "Назад",
  },
  tabs: {
    home: "Головна",
    settings: "Налаштування",
  },
  welcomeScreen: {
    postscript:
      "psst — Ймовірно, ваш додаток виглядає не так. (Хіба що ваш дизайнер передав вам саме ці екрани, тоді — запускайте!)",
    readyForLaunch: "Ваш додаток майже готовий до запуску!",
    exciting: "(ох, це так захоплююче!)",
  },
  errorScreen: {
    title: "Щось пішло не так!",
    friendlySubtitle:
      "Це екран, який побачать ваші користувачі у робочій версії, коли виникне помилка. Вам варто налаштувати це повідомлення (розташоване в `app/i18n/uk.ts`) і, ймовірно, макет теж (`app/screens/ErrorScreen`). Якщо ви хочете повністю видалити це, перевірте `app/app.tsx` для компонента <ErrorBoundary>.",
    reset: "СКИНУТИ ДОДАТОК",
  },
  emptyStateComponent: {
    generic: {
      heading: "Так пусто... так сумно",
      content:
        "Дані ще не знайдено. Спробуйте натиснути кнопку, щоб оновити або перезавантажити додаток.",
      button: "Спробуймо ще раз",
    },
  },
  loginScreen: {
    title: "З поверненням",
    subtitle: "Увійдіть, щоб продовжити",
    emailFieldLabel: "Електронна пошта",
    emailFieldPlaceholder: "Введіть вашу електронну пошту",
    passwordFieldLabel: "Пароль",
    passwordFieldPlaceholder: "Введіть ваш пароль",
    tapToSignIn: "Увійти",
  },
  settingsScreen: {
    account: "Обліковий запис",
    preferences: "Налаштування",
    profile: "Профіль",
    notifications: "Сповіщення",
    themeLightLabel: "Світла",
    themeDarkLabel: "Темна",
    themeSystemLabel: "Системна",
    language: "Мова",
    theme: "Тема",
    logout: "Вийти",
  },
}

export default uk
export type Translations = typeof uk
