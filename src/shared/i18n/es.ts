import { Translations } from "./en"

const es: Translations = {
  common: {
    ok: "¡OK!",
    cancel: "Cancelar",
    back: "Volver",
  },
  tabs: {
    home: "Inicio",
    settings: "Ajustes",
  },
  welcomeScreen: {
    postscript:
      "psst — Esto probablemente no es cómo se va a ver tu app. (A menos que tu diseñador te haya enviado estas pantallas, y en ese caso, ¡lánzalas en producción!)",
    readyForLaunch: "¡Tu app, casi lista para su lanzamiento!",
    exciting: "(¡ohh, esto es emocionante!)",
  },
  errorScreen: {
    title: "¡Algo salió mal!",
    friendlySubtitle:
      "Esta es la pantalla que verán tus usuarios en producción cuando haya un error. Vas a querer personalizar este mensaje (que está ubicado en `app/i18n/es.ts`) y probablemente también su diseño (`app/screens/ErrorScreen`). Si quieres eliminarlo completamente, revisa `app/app.tsx` y el componente <ErrorBoundary>.",
    reset: "REINICIAR APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "Muy vacío... muy triste",
      content:
        "No se han encontrado datos por el momento. Intenta darle clic en el botón para refrescar o recargar la app.",
      button: "Intentemos de nuevo",
    },
  },
  loginScreen: {
    title: "Bienvenido de nuevo",
    subtitle: "Inicia sesión para continuar",
    emailFieldLabel: "Correo electrónico",
    emailFieldPlaceholder: "Ingresa tu correo electrónico",
    passwordFieldLabel: "Contraseña",
    passwordFieldPlaceholder: "Ingresa tu contraseña",
    tapToSignIn: "Iniciar sesión",
  },
  settingsScreen: {
    account: "Cuenta",
    preferences: "Preferencias",
    profile: "Perfil",
    notifications: "Notificaciones",
    themeLightLabel: "Claro",
    themeDarkLabel: "Oscuro",
    themeSystemLabel: "Sistema",
    language: "Idioma",
    theme: "Tema",
    logout: "Cerrar sesión",
  },
}

export default es
