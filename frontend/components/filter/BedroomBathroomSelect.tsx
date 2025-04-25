'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setBedrooms, setBathrooms } from '@/store/slices/filtersSlice';
import { RootState } from '@/store';

export function BedroomBathroomSelect() {
  const dispatch = useDispatch();
  const { bedrooms, bathrooms } = useSelector((state: RootState) => state.filters);
  
  const bedroomOptions = [1, 2, 3, 4, 5, 6];
  const bathroomOptions = [1, 2, 3, 4, 5];
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="bedrooms" className="block text-xs font-medium text-gray-700 mb-1">
          Bedrooms
        </label>
        <select
          id="bedrooms"
          value={bedrooms === null ? '' : bedrooms}
          onChange={(e) => {
            const value = e.target.value === '' ? null : Number(e.target.value);
            dispatch(setBedrooms(value));
          }}
          className="select-field"
        >
          <option value="">Any</option>
          {bedroomOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="bathrooms" className="block text-xs font-medium text-gray-700 mb-1">
          Bathrooms
        </label>
        <select
          id="bathrooms"
          value={bathrooms === null ? '' : bathrooms}
          onChange={(e) => {
            const value = e.target.value === '' ? null : Number(e.target.value);
            dispatch(setBathrooms(value));
          }}
          className="select-field"
        >
          <option value="">Any</option>
          {bathroomOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}