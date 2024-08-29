import { useQuery } from '@tanstack/react-query';

import { fetchDashboard, fetchInvite, fetchUsers } from '~/services/dashboard';

const useDashboard = (userId: string | undefined) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => fetchDashboard(userId),
  });

  return { dashBoardData: data, isError, isLoading };
};
const useInvite = (orgId: string | undefined) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['invite'],
    queryFn: () => fetchInvite(orgId),
    enabled: !!orgId,
  });

  return { data, isError, isLoading };
};
const useUserList = (orgId: string | undefined) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['members'],
    queryFn: () => fetchUsers(orgId),
    enabled: !!orgId,
  });

  return { data, isError, isLoading };
};
export { useDashboard, useInvite, useUserList };
