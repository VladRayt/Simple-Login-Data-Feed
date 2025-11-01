export enum PersistNavigation {
  always = "always",
  dev = "dev",
  prod = "prod",
  never = "never",
}
export interface ConfigBaseProps {
  persistNavigation: PersistNavigation
  catchErrors: PersistNavigation
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
  persistNavigation: PersistNavigation.dev,
  catchErrors: PersistNavigation.always,
  exitRoutes: ["index"],
}

export default BaseConfig
