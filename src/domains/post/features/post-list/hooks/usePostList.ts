import { useFetchPostListQuery } from '@/domains/post/_common/api/posts.queries';

export function usePostList() {
  const { data: postList, isLoading, error } = useFetchPostListQuery();

  return {
    postList,
    isLoading,
    error,
  };
}
