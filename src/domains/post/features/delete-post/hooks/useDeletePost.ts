import { useDeletePostMutation } from '@/domains/post/_common/api/posts.queries';

export function useDeletePost() {
  const { mutateAsync: deletePost, isPending } = useDeletePostMutation();

  const handleDelete = async (postId: string | number) => {
    await deletePost(String(postId));
  };

  return {
    handleDelete,
    isPending,
  };
}
