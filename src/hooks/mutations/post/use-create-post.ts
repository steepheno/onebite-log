import { createPost, createPostWithImages } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostWithImages,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      // 포스트 생성 시 캐시 데이터 업데이트
      // 1. 캐시 아예 초기화
      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}

/* 캐시 데이터 처리하는 또다른 방법들 */
// 2. 캐시 데이터에 완성된 포스트만 추가
// 3. 낙관적 업데이트 방식(useMutation)
