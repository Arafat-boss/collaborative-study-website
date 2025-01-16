import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUploadeMaterials = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch materials
  const { data: materials = [], refetch } = useQuery({
    queryKey: ['materials'],
    queryFn: async () => {
      const res = await axiosSecure.get('/materials'); // Fetch all materials
      return res.data;
    },
  });

  return [materials, refetch];
};

export default useUploadeMaterials;
