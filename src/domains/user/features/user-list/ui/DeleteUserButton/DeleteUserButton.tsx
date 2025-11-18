import { Button } from '@/shared/ui/atoms/button/Button';
import { TEXTS } from '@/shared/config/texts';
import { useDeleteUser } from '@/domains/user/features/user-list/hooks/useDeleteUser';

interface DeleteUserButtonProps {
  userId: string | number;
}

export function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const { handleDelete, isPending } = useDeleteUser();

  return (
    <Button
      onClick={() => handleDelete(userId)}
      disabled={isPending}
      variant="danger"
      data-fsd-path="domains/user/features/user-list/DeleteUserButton"
    >
      {isPending ? TEXTS.buttons.deleteLoading : TEXTS.buttons.delete}
    </Button>
  );
}
