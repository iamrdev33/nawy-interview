'use client';

import { useDispatch, useSelector } from 'react-redux';
import { removeFilter, removeCity } from '@/store/slices/filtersSlice';
import { RootState } from '@/store';
import { X } from 'lucide-react';

interface ActiveFiltersProps {
  className?: string;
}

export function ActiveFilters({ className = '' }: ActiveFiltersProps) {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const hasActiveFilters =
    filters.search !== '' ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 50000000 ||
    filters.areaRange[0] !== 0 ||
    filters.areaRange[1] !== 1000 ||
    filters.bedrooms !== null ||
    filters.bathrooms !== null ||
    filters.listingType !== '' ||
    filters.cities.length > 0 ||
    filters.dateRange.from !== null ||
    filters.dateRange.to !== null;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {filters.search && (
        <div className="chip group">
          {!isNaN(Number(filters.search)) ?
            <span className="mr-1">Search by ID: {filters.search}</span> :
            <span className="mr-1">Search: {filters.search}</span>
          }

          <button
            onClick={() => {
              dispatch(removeFilter('search'))
            }}
            className="ml-1 text-gray-500 group-hover:text-gray-700"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 50000000) && (
        <div className="chip group">
          <span className="mr-1">Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
          <button
            onClick={() => dispatch(removeFilter('priceRange'))}
            className="ml-1 text-gray-500 group-hover:text-gray-700"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {(filters.areaRange[0] !== 0 || filters.areaRange[1] !== 1000) && (
        <div className="chip group">
          <span className="mr-1">Area: {filters.areaRange[0]} - {filters.areaRange[1]} m²</span>
          <button
            onClick={() => dispatch(removeFilter('areaRange'))}
            className="ml-1 text-gray-500 group-hover:text-gray-700"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {filters.bedrooms !== null && (
        <div className="chip group">
          <span className="mr-1">Bedrooms: {filters.bedrooms}</span>
          <button
            onClick={() => dispatch(removeFilter('bedrooms'))}
            className="ml-1 text-gray-500 group-hover:text-gray-700"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {filters.bathrooms !== null && (
        <div className="chip group">
          <span className="mr-1">Bathrooms: {filters.bathrooms}</span>
          <button
            onClick={() => dispatch(removeFilter('bathrooms'))}
            className="ml-1 text-gray-500 group-hover:text-gray-700"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {filters.listingType && (
        <div className="chip group">
          <span className="mr-1">For {filters.listingType === 'sale' ? 'Sale' : 'Rent'}</span>
          <button
            onClick={() => dispatch(removeFilter('listingType'))}
            className="ml-1 text-gray-500 group-hover:text-gray-700"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {filters.cities.map((city) => (
        <div key={city} className="chip group">
          <span className="mr-1">{city}</span>
          <button
            onClick={() => dispatch(removeCity(city))}
            className="ml-1 text-gray-500 group-hover:text-gray-700"
          >
            <X size={14} />
          </button>
        </div>
      ))}

      {(filters.dateRange.from || filters.dateRange.to) && (
        <div className="chip group">
          <span className="mr-1">
            Date: {filters.dateRange.from || 'Any'} to {filters.dateRange.to || 'Any'}
          </span>
          <button
            onClick={() => dispatch(removeFilter('dateRange'))}
            className="ml-1 text-gray-500 group-hover:text-gray-700"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}