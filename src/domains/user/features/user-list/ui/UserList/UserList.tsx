import { UserCard } from '@/domains/user/_common/ui/UserCard/UserCard';
import { DeleteUserButton } from '@/domains/user/features/user-list/ui/DeleteUserButton/DeleteUserButton';
import { Grid } from '@/shared/ui/elements/grid/Grid';
import { useUserList } from '@/domains/user/features/user-list/hooks/useUserList';

export function UserList() {
  const { userList } = useUserList();

  return (
    <Grid data-fsd-path="domains/user/features/user-list">
      {userList?.map((user) => (
        <UserCard key={user.id} user={user}>
          {user.id && <DeleteUserButton userId={user.id} />}
        </UserCard>
      ))}
    </Grid>
  );
}
