import { useQuery } from '@tanstack/react-query';

import { getUsers } from '@services/userManagement.service';
import { USER_MANAGEMENT__KEYS } from '@utils/queryKeys';

const useGetUsers = () => {
  const query = useQuery({
    queryKey: USER_MANAGEMENT__KEYS.GET_USERS(),
    queryFn: getUsers,
  });

  return query;
};

export default useGetUsers;
