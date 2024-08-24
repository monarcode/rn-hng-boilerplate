import { useQuery } from '@tanstack/react-query';

import { fetchDashboard, fetchInvite } from '~/services/dashboard';

const useDashboard = (userId: string | undefined) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => fetchDashboard(userId),
  });

  return { data, isError, isLoading };
};
const useInvite = (orgId: string | undefined) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['invite'],
    queryFn: () => fetchInvite(orgId),
    enabled: !!orgId,
  });

  return { data, isError, isLoading };
};
export { useDashboard, useInvite };
