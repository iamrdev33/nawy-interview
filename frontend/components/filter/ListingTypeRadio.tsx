'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setListingType, ListingType } from '@/store/slices/filtersSlice';
import { RootState } from '@/store';

export function ListingTypeRadio() {
  const dispatch = useDispatch();
  const listingType = useSelector((state: RootState) => state.filters.listingType);
  
  const handleChange = (value: ListingType) => {
    dispatch(setListingType(value));
  };
  
  return (
    <div className="flex space-x-4">
      <label className="inline-flex items-center">
        <input
          type="radio"
          className="form-radio h-4 w-4 text-primary-600"
          checked={listingType === ''}
          onChange={() => handleChange('')}
        />
        <span className="ml-2 text-sm text-gray-700">Any</span>
      </label>
      
      <label className="inline-flex items-center">
        <input
          type="radio"
          className="form-radio h-4 w-4 text-primary-600"
          checked={listingType === 'sale'}
          onChange={() => handleChange('sale')}
        />
        <span className="ml-2 text-sm text-gray-700">For Sale</span>
      </label>
      
      <label className="inline-flex items-center">
        <input
          type="radio"
          className="form-radio h-4 w-4 text-primary-600"
          checked={listingType === 'rent'}
          onChange={() => handleChange('rent')}
        />
        <span className="ml-2 text-sm text-gray-700">For Rent</span>
      </label>
    </div>
  );
}