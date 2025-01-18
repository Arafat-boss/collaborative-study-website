import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

const useRole = () => {
    const {user} = useAuth()
// const axiosSecure = useAxiosSecure()
const axiosPublic = useAxiosPublic()

    const {data:role} = useQuery({
        queryKey:[user?.email, 'isAdmin'],
        queryFn:async()=>{
            const {data} = await axiosPublic.get(`/user/admin/${user.email}`)
            console.log(data);
            return data
        }
    })

    return [role]
};

export default useRole;