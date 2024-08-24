import { useQuery } from '@tanstack/react-query';

import { fetchSubscription } from '~/services/subscription';

const useSubscription = (userId: string | undefined) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['subscription'],
    queryFn: () => fetchSubscription(userId),
  });

  return { data, isError, isLoading };
};

export { useSubscription };
