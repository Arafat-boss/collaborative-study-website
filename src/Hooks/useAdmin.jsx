import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: role = "student",
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      if (!user?.email) return "student";
      try {
        const { data } = await axiosPublic.get(`/user/admin/${encodeURIComponent(user.email)}`);
        
        let resolvedRole = "student";
        if (typeof data === "string") {
          resolvedRole = data;
        } else if (data?.role) {
          resolvedRole = data.role;
        } else if (data?.admin) {
          resolvedRole = "admin";
        }
        
        return String(resolvedRole).toLowerCase().trim() || "student";
      } catch (err) {
        console.warn("Could not retrieve user role from server, defaulting to student:", err);
        return "student";
      }
    },
    staleTime: 1000 * 10, // Cache for only 10s so role updates reflect quickly
    retry: 2,
  });

  const effectiveLoading = loading || (isLoading && !isError);

  return [role, effectiveLoading, refetch];
};

export default useAdmin;