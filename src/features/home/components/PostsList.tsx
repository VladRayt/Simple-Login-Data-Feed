import { FC, useCallback } from "react"
import { ViewStyle, RefreshControl } from "react-native"
import { LegendList } from "@legendapp/list"

import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"

import { ListFooter } from "./ListFooter"
import { PostItem } from "./PostItem"
import { LOAD_MORE_THRESHOLD } from "../constants/home.constants"
import type { Post } from "../types/post.types"

interface PostsListProps {
  posts: Post[]
  hasNextPage: boolean
  isFetchingNextPage: boolean
  isRefetching: boolean
  onLoadMore: () => void
  onRefresh: () => void
}

export const PostsList: FC<PostsListProps> = ({
  posts,
  hasNextPage,
  isFetchingNextPage,
  isRefetching,
  onLoadMore,
  onRefresh,
}) => {
  const { themed, theme } = useAppTheme()

  const renderItem = useCallback(({ item }: { item: Post }) => <PostItem post={item} />, [])

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      onLoadMore()
    }
  }, [hasNextPage, isFetchingNextPage, onLoadMore])

  return (
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
          onRefresh={onRefresh}
          tintColor={theme.colors.tint}
        />
      }
      contentContainerStyle={themed($listContent)}
    />
  )
}

const $listContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingTop: spacing.md,
})
