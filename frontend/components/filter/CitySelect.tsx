'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCities } from '@/store/slices/filtersSlice';
import { RootState } from '@/store';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CITY_OPTIONS = [ // TODO: fetch from API and store in redux
  'Maadi',
  'ElShekh Zayed',
  'Haram',
  'Sheraton',
  'Heliopolis',
  'Mohandeseen',
  'Nasr City',
  'New Cairo',
  'October City',
  'Zamalek',
  'Dokki',
  'Garden City'
];

export function CitySelect() {
  const dispatch = useDispatch();
  const selectedCities = useSelector((state: RootState) => state.filters.cities);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCity = (city: string) => {
    const newCities = selectedCities.includes(city)
      ? selectedCities.filter((c) => c !== city)
      : [...selectedCities, city];

    dispatch(setCities(newCities));
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="select-field text-left flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedCities.length ? 'text-gray-900' : 'text-gray-500'}>
          {selectedCities.length
            ? `${selectedCities.length} ${selectedCities.length === 1 ? 'city' : 'cities'} selected`
            : 'Select cities'}
        </span>
        {isOpen ? 
        <ChevronUp size={20} className="text-gray-500" /> :
        <ChevronDown size={20} className="text-gray-500" />
        }
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {CITY_OPTIONS.map((city) => (
            <div
              key={city}
              className={`cursor-pointer select-none relative py-2 px-3 hover:bg-gray-100 ${selectedCities.includes(city) ? 'bg-primary-50' : ''
                }`}
              onClick={() => toggleCity(city)}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  checked={selectedCities.includes(city)}
                  onChange={() => { }}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="ml-3 text-gray-900">{city}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}