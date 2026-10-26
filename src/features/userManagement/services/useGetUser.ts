import { useQuery } from '@tanstack/react-query';

import { getUserById } from '@services/userManagement.service';
import { USER_MANAGEMENT__KEYS } from '@utils/queryKeys';

const useGetUser = (id: number) =>
  useQuery({
    queryKey: USER_MANAGEMENT__KEYS.GET_USER(id),
    queryFn: () => getUserById(id),
    enabled: !!id,
  });

export default useGetUser;
