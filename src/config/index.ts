import BaseConfig, { ConfigBaseProps, ConfigExtraProps } from "./config.base"
import DevConfig from "./config.dev"
import ProdConfig from "./config.prod"

let ExtraConfig: ConfigExtraProps = ProdConfig

if (__DEV__) {
  ExtraConfig = DevConfig
}

const Config: ConfigBaseProps & ConfigExtraProps = { ...BaseConfig, ...ExtraConfig }

export default Config
