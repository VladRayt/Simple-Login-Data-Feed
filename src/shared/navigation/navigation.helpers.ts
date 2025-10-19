import { useRouter, Router } from "expo-router"

import { ROUTES } from "@/shared/constants/routes.constants"
import { RouteValue } from "@/shared/types/navigation.types"

export const useNavigation = () => {
  const router = useRouter()

  return {
    navigateTo: (route: RouteValue) => {
      router.push(route)
    },

    replaceTo: (route: RouteValue) => {
      router.replace(route)
    },

    goBack: () => {
      if (router.canGoBack()) {
        router.back()
      }
    },

    navigateToHome: () => {
      router.replace(ROUTES.TABS.HOME)
    },

    logout: () => {
      router.replace(ROUTES.AUTH.ROOT)
    },

    router,
  }
}

export const navigationUtils = {
  navigateTo: (router: Router, route: RouteValue) => {
    router.push(route)
  },

  replaceTo: (router: Router, route: RouteValue) => {
    router.replace(route)
  },

  logout: (router: Router) => {
    router.replace(ROUTES.AUTH.ROOT)
  },

  navigateToHome: (router: Router) => {
    router.replace(ROUTES.TABS.HOME)
  },
}
