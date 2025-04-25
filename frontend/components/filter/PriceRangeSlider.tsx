'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPriceRange } from '@/store/slices/filtersSlice';
import { RootState } from '@/store';

export function PriceRangeSlider() {
  const dispatch = useDispatch();
  const priceRange = useSelector((state: RootState) => state.filters.priceRange);
  
  const [localRange, setLocalRange] = useState<[number, number]>(priceRange);
  const [min, setMin] = useState<string>(priceRange[0].toString());
  const [max, setMax] = useState<string>(priceRange[1].toString());
  
  useEffect(() => {
    setLocalRange(priceRange);
    setMin(priceRange[0].toString());
    setMax(priceRange[1].toString());
  }, [priceRange]);
  
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMin(value);
    if (value === '') return;
    
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;
    
    const newRange: [number, number] = [Math.min(numValue, localRange[1]), localRange[1]];
    setLocalRange(newRange);
  };
  
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMax(value);
    if (value === '') return;
    
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;
    
    const newRange: [number, number] = [localRange[0], Math.max(numValue, localRange[0])];
    setLocalRange(newRange);
  };
  
  const handleMinBlur = () => {
    const numValue = parseInt(min, 10);
    if (isNaN(numValue)) {
      setMin(localRange[0].toString());
      return;
    }
    dispatch(setPriceRange([numValue, localRange[1]]));
  };
  
  const handleMaxBlur = () => {
    const numValue = parseInt(max, 10);
    if (isNaN(numValue)) {
      setMax(localRange[1].toString());
      return;
    }
    dispatch(setPriceRange([localRange[0], numValue]));
  };
  
  return (
    <div>
      <div className="flex space-x-2 mb-2">
        <div className="flex-1">
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              className="input-field pl-7"
              placeholder="Min"
              value={min}
              onChange={handleMinChange}
              onBlur={handleMinBlur}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              className="input-field pl-7"
              placeholder="Max"
              value={max}
              onChange={handleMaxChange}
              onBlur={handleMaxBlur}
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-500">${localRange[0]}</span>
        <input
          type="range"
          min={0}
          max={10000}
          value={localRange[0]}
          onChange={(e) => {
            const value = Math.min(parseInt(e.target.value, 10), localRange[1]);
            setLocalRange([value, localRange[1]]);
            setMin(value.toString());
          }}
          onMouseUp={() => dispatch(setPriceRange(localRange))}
          onTouchEnd={() => dispatch(setPriceRange(localRange))}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-xs text-gray-500">${localRange[1]}</span>
      </div>
      
      <input
        type="range"
        min={0}
        max={10000}
        value={localRange[1]}
        onChange={(e) => {
          const value = Math.max(parseInt(e.target.value, 10), localRange[0]);
          setLocalRange([localRange[0], value]);
          setMax(value.toString());
        }}
        onMouseUp={() => dispatch(setPriceRange(localRange))}
        onTouchEnd={() => dispatch(setPriceRange(localRange))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}