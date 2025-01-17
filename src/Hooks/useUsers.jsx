import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUsers = () => {
    // const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const {data: users=[], refetch} = useQuery({
        queryKey:['user'],
        queryFn:async()=>{
           const res = await axiosSecure.get('/users')
           console.log(res);
            return res.data
        }
    })

    return [users, refetch]
};

export default useUsers;