import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useBookedSession = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();

    const { data: booked = [], refetch, isLoading } = useQuery({
        queryKey: ['bookedSession', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/bookedSessions/${user.email}`);
            return Array.isArray(res.data) ? res.data : [];
        }
    });
    return [booked, refetch, isLoading];
};

export default useBookedSession;