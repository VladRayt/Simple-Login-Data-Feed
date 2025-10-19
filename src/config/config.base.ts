export interface ConfigBaseProps {
  persistNavigation: "always" | "dev" | "prod" | "never"
  catchErrors: "always" | "dev" | "prod" | "never"
  exitRoutes: string[]
}

export interface ConfigExtraProps {
  API_URL: string
  FIREBASE_CONFIG: {
    googleServicesFile: {
      ios: string
      android: string
    }
  }
}

export type PersistNavigationConfig = ConfigBaseProps["persistNavigation"]

const BaseConfig: ConfigBaseProps = {
  persistNavigation: "dev",
  catchErrors: "always",
  exitRoutes: ["index"],
}

export default BaseConfig
