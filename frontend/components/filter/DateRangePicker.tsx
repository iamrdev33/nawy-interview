'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setDateRange } from '@/store/slices/filtersSlice';
import { RootState } from '@/store';

export function DateRangePicker() {
  const dispatch = useDispatch();
  const dateRange = useSelector((state: RootState) => state.filters.dateRange);
  
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDateRange({
      from: e.target.value || null,
      to: dateRange.to,
    }));
  };
  
  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDateRange({
      from: dateRange.from,
      to: e.target.value || null,
    }));
  };
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="date-from" className="block text-xs font-medium text-gray-700 mb-1">
          From
        </label>
        <input
          type="date"
          id="date-from"
          className="input-field"
          value={dateRange.from || ''}
          onChange={handleFromChange}
        />
      </div>
      
      <div>
        <label htmlFor="date-to" className="block text-xs font-medium text-gray-700 mb-1">
          To
        </label>
        <input
          type="date"
          id="date-to"
          className="input-field"
          value={dateRange.to || ''}
          onChange={handleToChange}
          min={dateRange.from || undefined}
        />
      </div>
    </div>
  );
}