import { FC } from "react"
import { ViewStyle } from "react-native"

import { EmptyState } from "@/shared/components/EmptyState"
import { LoadingState } from "@/shared/components/LoadingState"
import { Screen } from "@/shared/components/Screen"
import { useAuthStore } from "@/shared/stores/auth.store"
import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"

import { useInfinitePosts } from "../api/posts.api"
import { PostsList } from "../components/PostsList"
import { WelcomeHeader } from "../components/WelcomeHeader"

export const HomeScreen: FC = function HomeScreen() {
  const { themed } = useAppTheme()
  const email = useAuthStore((state) => state.email)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useInfinitePosts()

  const posts = data?.pages.flat() ?? []

  if (isLoading) {
    return (
      <Screen preset="fixed">
        <LoadingState />
      </Screen>
    )
  }

  if (isError) {
    return (
      <Screen preset="fixed">
        <EmptyState preset="generic" button="Try Again" buttonOnPress={() => refetch()} />
      </Screen>
    )
  }

  return (
    <Screen preset="fixed" contentContainerStyle={themed($container)}>
      <WelcomeHeader email={email} />

      <PostsList
        posts={posts}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isRefetching={isRefetching}
        onLoadMore={fetchNextPage}
        onRefresh={refetch}
      />
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})
