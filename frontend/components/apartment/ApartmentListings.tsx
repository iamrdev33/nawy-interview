'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { ApartmentCard } from '@/components/apartment/ApartmentCard';
import { Pagination } from '@/components/ui/Pagination';
import { useApartments } from '@/hooks/useApartments';
import { RootState } from '@/store';
import { useDebounce } from '@/hooks/useDebounce';
import { ApartmentFilters } from '@/types/apartment';

export function ApartmentListings() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || '1');
  const ITEMS_PER_PAGE = 12;
  
  const filters = useSelector((state: RootState) => state.filters);
  const debouncedSearch = useDebounce(filters.search, 500);
  
  const [queryFilters, setQueryFilters] = useState<ApartmentFilters>({
    page: page,
    pageSize: ITEMS_PER_PAGE,
  });
  
  useEffect(() => {
    console.log('hena');
    
    setQueryFilters({
      search: debouncedSearch,
      minPrice: filters.priceRange[0] || undefined,
      maxPrice: filters.priceRange[1] || undefined,
      minAreaInSqM: filters.areaRange[0] || undefined,
      maxAreaInSqM: filters.areaRange[1] || undefined,
      bedrooms: filters.bedrooms || undefined,
      bathrooms: filters.bathrooms || undefined,
      projectId: filters.projectId || undefined,
      listingType: filters.listingType || undefined,
      cities: filters.cities.length ? filters.cities : undefined,
      createdBefore: filters.dateRange.to || undefined,
      createdAfter: filters.dateRange.from || undefined,
      page: page,
      pageSize: ITEMS_PER_PAGE,
    });
  }, [
    debouncedSearch, 
    filters,
    page
  ]);
  
  const { data, isLoading, error } = useApartments(queryFilters);
  
  const handlePageChange = (newPage: number) => {
    router.push(`/apartments?page=${newPage}`);
  };
  
  if (error) {
    return (
      <div className="bg-error-50 border border-error-500 text-error-900 p-4 rounded-md">
        <p>Failed to load apartments. Please try again later.</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-600">
          {isLoading ? (
            'Loading apartments...'
          ) : (
            `Showing ${data?.apartments.length || 0} of ${data?.total || 0} apartments`
          )}
        </p>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-48 mb-4 rounded-lg"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="flex gap-2 mb-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : data?.apartments.length === 0 ? (
        <div className="p-8 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <h3 className="text-xl font-medium text-gray-900 mb-2">No apartments found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more results.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.apartments.map((apartment) => (
              <ApartmentCard key={apartment.id} apartment={apartment} />
            ))}
          </div>
          
          {data && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={page}
                totalPages={Math.ceil((data.total || 0) / ITEMS_PER_PAGE)}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}