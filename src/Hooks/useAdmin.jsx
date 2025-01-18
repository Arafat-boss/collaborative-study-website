import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
    const {user} = useAuth()
// const axiosSecure = useAxiosSecure()
const axiosPublic = useAxiosPublic()

    const {data:role=[], isLoading} = useQuery({
        queryKey:[user?.email, 'isAdmin'],
        queryFn:async()=>{
            const {data} = await axiosPublic.get(`/user/admin/${user.email}`)
            console.log(data);
            return data
        }
    })

    return [role, isLoading]
};

export default useAdmin;