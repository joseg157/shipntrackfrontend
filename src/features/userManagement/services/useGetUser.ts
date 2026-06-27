import { useQuery } from '@tanstack/react-query';

import { getUserById } from '@services/userManagement.service';

const useGetUser = (id: number) =>
  useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });

export default useGetUser;
