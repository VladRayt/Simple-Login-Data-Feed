import { ROUTES } from "../constants/routes.constants"

type DeepRouteValue<T> = T extends string
  ? T
  : T extends object
    ? DeepRouteValue<T[keyof T]>
    : never

export type RouteValue = DeepRouteValue<typeof ROUTES>
