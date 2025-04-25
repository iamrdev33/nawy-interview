'use client';

import { useQuery } from '@tanstack/react-query';
import { ApartmentDetails } from '@/types/apartment';
import { fetchClient } from '@/api/fetchClient';

const fetchApartmentDetails = async (id: string): Promise<ApartmentDetails> => {
  const response = await fetchClient(`/apartments/details/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch apartment details');
  }
  
  return response.json();
};

export const useApartmentDetails = (id: string) => {
  return useQuery({
    queryKey: ['apartment', id],
    queryFn: () => fetchApartmentDetails(id),
    enabled: !!id,
  });
};