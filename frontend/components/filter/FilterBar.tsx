'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FilterSection } from './FilterSection';
import { SearchInput } from './SearchInput';
import { PriceRangeSlider } from './PriceRangeSlider';
import { AreaRangeSlider } from './AreaRangeSlider';
import { BedroomBathroomSelect } from './BedroomBathroomSelect';
import { ListingTypeRadio } from './ListingTypeRadio';
import { CitySelect } from './CitySelect';
import { DateRangePicker } from './DateRangePicker';
import { ActiveFilters } from './ActiveFilters';
import { RootState } from '@/store';
import { resetFilters } from '@/store/slices/filtersSlice';
import { Funnel } from 'lucide-react';

export function FilterBar() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const [isOpen, setIsOpen] = useState(false);

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
    
  const handleClearAll = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-grow">
            <SearchInput />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn-secondary md:w-auto w-full"
          >
            <Funnel size={20} className='mr-2' />
            Filters
          </button>

          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="btn-secondary md:w-auto w-full text-primary-700 border-primary-200 hover:bg-primary-50"
            >
              Clear All
            </button>
          )}
        </div>

        {hasActiveFilters && <ActiveFilters className="mt-4" />}
      </div>

      {isOpen && (
        <div className="border-t border-gray-200 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up">
          <FilterSection title="Price Range">
            <PriceRangeSlider />
          </FilterSection>

          <FilterSection title="Area (m²)">
            <AreaRangeSlider />
          </FilterSection>

          <FilterSection title="Bedrooms & Bathrooms">
            <BedroomBathroomSelect />
          </FilterSection>

          <FilterSection title="Listing Type">
            <ListingTypeRadio />
          </FilterSection>

          <FilterSection title="City">
            <CitySelect />
          </FilterSection>

          <FilterSection title="Date Created" className="md:col-span-2 lg:col-span-3">
            <DateRangePicker />
          </FilterSection>
        </div>
      )}
    </div>
  );
}