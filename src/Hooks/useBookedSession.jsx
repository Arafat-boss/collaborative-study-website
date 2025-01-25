import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useBookedSession = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();

    const {data: booked=[]} = useQuery({
        queryKey:['bookedSession'],
        queryFn:async()=>{
            const res = axiosPublic.get(`/booked-sessions`)
            return (await res).data;
        }
    })
    return [booked]
};

export default useBookedSession;