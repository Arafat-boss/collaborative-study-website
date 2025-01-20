import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useVIewAllStudy = () => {
    const axiosPublic = useAxiosPublic()
   

    const { data: sessions = [], refetch } = useQuery({
        queryKey: ["status"],
        queryFn: async () => {
          const res = await axiosPublic.get("/studySession");
          return res.data;
        },
      });
      return [ sessions, refetch]
};

export default useVIewAllStudy;