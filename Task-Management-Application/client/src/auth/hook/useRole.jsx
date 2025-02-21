import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { Spinner } from '@material-tailwind/react';

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  // console.log(user?.email)

  const { data: role, isLoading: isRoleLoading } = useQuery({
    queryKey: [user?.email, 'role'],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/role/${user?.email}`);
      // console.log(data.role)
      return data.role;
    }
  });

  // console.log("Role:", role);
  // console.log("Is Role Loading:", isRoleLoading);

  if (isRoleLoading) {
    return <div className="flex items-center justify-center"> <Spinner /> </div>;
  };
  
  if (!role) {
    return <div>Role not found</div>;
  }

  return role;
};

export default useRole;