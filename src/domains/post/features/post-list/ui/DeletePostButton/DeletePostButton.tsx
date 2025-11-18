import { Button } from '@/shared/ui/atoms/button/Button';
import { TEXTS } from '@/shared/config/texts';
import { useDeletePost } from '@/domains/post/features/post-list/hooks/useDeletePost';

interface DeletePostButtonProps {
  postId: string | number;
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const { handleDelete, isPending } = useDeletePost();

  return (
    <Button
      onClick={() => handleDelete(postId)}
      disabled={isPending}
      variant="danger"
      data-fsd-path="domains/post/features/post-list/DeletePostButton"
    >
      {isPending ? TEXTS.buttons.deleteLoading : TEXTS.buttons.delete}
    </Button>
  );
}
