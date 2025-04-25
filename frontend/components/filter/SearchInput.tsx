'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '@/store/slices/filtersSlice';
import { RootState } from '@/store';
import { useDebounce } from '@/hooks/useDebounce';
import { Search } from 'lucide-react';

export function SearchInput() {
  const dispatch = useDispatch();
  const storeSearch = useSelector((state: RootState) => state.filters.search);
  const [inputValue, setInputValue] = useState(storeSearch);
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    dispatch(setSearch(debouncedValue));
  }, [debouncedValue, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={20} className='text-gray-500' />
      </div>
      <input
        type="text"
        className="input-field pl-10"
        placeholder="Search apartments by title, project, or ID"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}