import { useQuery } from '@tanstack/react-query';

import { getUsers } from '@services/userManagement.service';

const useGetUsers = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  return query;
};

export default useGetUsers;
