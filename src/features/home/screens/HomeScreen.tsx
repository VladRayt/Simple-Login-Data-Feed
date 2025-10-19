import { FC, useCallback } from "react"
import { ViewStyle, ActivityIndicator, RefreshControl } from "react-native"
import { LegendList } from "@legendapp/list"

import { EmptyState } from "@/shared/components/EmptyState"
import { Screen } from "@/shared/components/Screen"
import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"

import { useInfinitePosts } from "../api/posts.api"
import { ListFooter } from "../components/ListFooter"
import { PostItem } from "../components/PostItem"
import { LOAD_MORE_THRESHOLD } from "../constants"
import type { Post } from "../types/post.types"

export const HomeScreen: FC = function HomeScreen() {
  const { themed, theme } = useAppTheme()

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

  const renderItem = ({ item }: { item: Post }) => <PostItem post={item} />

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isLoading) {
    return (
      <Screen preset="fixed" contentContainerStyle={themed($loadingContainer)}>
        <ActivityIndicator size="large" color={theme.colors.tint} />
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
      <LegendList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        recycleItems
        onEndReached={handleLoadMore}
        onEndReachedThreshold={LOAD_MORE_THRESHOLD}
        ListFooterComponent={<ListFooter isLoading={isFetchingNextPage} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={theme.colors.tint}
          />
        }
        contentContainerStyle={themed($listContent)}
      />
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $loadingContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
})

const $listContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingTop: spacing.md,
})
