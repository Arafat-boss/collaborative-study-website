import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useUploadeMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()

  // Fetch materials
  const { data: materials = [], refetch } = useQuery({
    queryKey: ['materials'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/materials/${user.email}`);
      return res.data;
    },
  });

  return [materials, refetch];
};

export default useUploadeMaterials;
