import { useDeleteUserMutation } from '@/domains/user/_common/api/users.queries';

export function useDeleteUser() {
  const { mutateAsync: deleteUser, isPending } = useDeleteUserMutation();

  const handleDelete = async (userId: string | number) => {
    await deleteUser(String(userId));
  };

  return {
    handleDelete,
    isPending,
  };
}
