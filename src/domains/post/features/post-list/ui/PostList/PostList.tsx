import { PostCard } from '@/domains/post/_common/ui/PostCard/PostCard';
import { DeletePostButton } from '@/domains/post/features/delete-post/ui/DeletePostButton/DeletePostButton';
import { Grid } from '@/shared/ui/elements/grid/Grid';
import { usePostList } from '@/domains/post/features/post-list/hooks/usePostList';

export function PostList() {
  const { postList } = usePostList();

  return (
    <Grid data-fsd-path="domains/post/features/post-list">
      {postList?.map((post) => (
        <PostCard key={post.id} post={post}>
          {post.id && <DeletePostButton postId={post.id} />}
        </PostCard>
      ))}
    </Grid>
  );
}
