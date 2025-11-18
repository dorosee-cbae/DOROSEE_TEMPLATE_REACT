import { useFetchUserListQuery } from '@/domains/user/_common/api/users.queries';

export function useUserList() {
  const { data: userList, isLoading, error } = useFetchUserListQuery();

  return {
    userList,
    isLoading,
    error,
  };
}

