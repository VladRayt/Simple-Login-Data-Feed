import { useInfiniteQuery } from "@tanstack/react-query"

import { apiClient } from "@/shared/services/api/client"

import { POSTS_PER_PAGE, POSTS_QUERY_KEY } from "../constants/home.constants"
import type { Post } from "../types/post.types"

interface FetchPostsParams {
  pageParam: number
}

async function fetchPosts({ pageParam }: FetchPostsParams): Promise<Post[]> {
  return apiClient.get(`posts?_page=${pageParam}&_limit=${POSTS_PER_PAGE}`).json<Post[]>()
}

export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: POSTS_QUERY_KEY,
    queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === POSTS_PER_PAGE ? allPages.length + 1 : undefined
    },
  })
}
