'use client';

import { useQuery } from '@tanstack/react-query';
import { ApartmentFilters, ApartmentsResponse } from '@/types/apartment';
import { fetchClient } from '@/api/fetchClient';

const fetchApartments = async (filters: ApartmentFilters): Promise<ApartmentsResponse> => {
  const params = new URLSearchParams();
  
  if (filters.search) params.append('search', filters.search);
  if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
  if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());
  if (filters.minAreaInSqM !== undefined) params.append('minAreaInSqM', filters.minAreaInSqM.toString());
  if (filters.maxAreaInSqM !== undefined) params.append('maxAreaInSqM', filters.maxAreaInSqM.toString());
  if (filters.projectId !== undefined) params.append('projectId', filters.projectId.toString());
  if (filters.bedrooms !== undefined) params.append('bedrooms', filters.bedrooms.toString());
  if (filters.bathrooms !== undefined) params.append('bathrooms', filters.bathrooms.toString());
  if (filters.listingType) params.append('listingType', filters.listingType);
  if (filters.cities?.length) filters.cities.forEach(city => params.append('cities', city));
  if (filters.createdBefore) params.append('createdBefore', filters.createdBefore);
  if (filters.createdAfter) params.append('createdAfter', filters.createdAfter);
  if (filters.page !== undefined) params.append('page', filters.page.toString());
  if (filters.pageSize !== undefined) params.append('pageSize', filters.pageSize.toString());

  const response = await fetchClient(`/apartments?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch apartments');
  }
  
  return response.json();
};

export const useApartments = (filters: ApartmentFilters) => {
  return useQuery({
    queryKey: ['apartments', filters],
    queryFn: () => fetchApartments(filters),
  });
};