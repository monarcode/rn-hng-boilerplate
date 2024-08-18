import { useQuery } from '@tanstack/react-query';

import { AuthService } from '~/services/authentication';

export const useFetchProfile = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => AuthService.getUserDetails(),
  });
  return { data, isError, isLoading };
};
