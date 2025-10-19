import { FC, memo } from "react"
import { ViewStyle, TextStyle } from "react-native"

import { Card } from "@/shared/components/Card"
import { Text } from "@/shared/components/Text"
import { useAppTheme } from "@/shared/theme/context"
import type { ThemedStyle } from "@/shared/theme/types"

import type { Post } from "../types/post.types"

interface PostItemProps {
  post: Post
}

export const PostItem: FC<PostItemProps> = memo(function PostItem({ post }) {
  const { themed } = useAppTheme()

  return (
    <Card
      style={themed($card)}
      HeadingComponent={
        <Text preset="subheading" style={themed($title)} numberOfLines={2}>
          {post.title}
        </Text>
      }
      content={post.body}
      ContentTextProps={{
        numberOfLines: 3,
        style: themed($body),
      }}
    />
  )
})

const $card: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginHorizontal: spacing.md,
  marginBottom: spacing.md,
})

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})

const $body: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})
