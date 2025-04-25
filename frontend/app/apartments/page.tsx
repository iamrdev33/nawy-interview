import { Suspense } from 'react';
import { ApartmentListings } from '@/components/apartment/ApartmentListings';
import { FilterSkeleton } from '@/components/filter/FilterSkeleton';
import { ListingSkeleton } from '@/components/apartment/ListingSkeleton';
import { FilterBar } from '@/components/filter/FilterBar';

export default function ApartmentsPage() {
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Nawy PoC</h1>
      
      <Suspense fallback={<FilterSkeleton />}>
        <div className="mb-8">
          <FilterBar />
        </div>
      </Suspense>
      
      <Suspense fallback={<ListingSkeleton />}>
        <ApartmentListings />
      </Suspense>
    </div>
  );
}