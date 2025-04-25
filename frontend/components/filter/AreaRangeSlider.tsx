'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAreaRange } from '@/store/slices/filtersSlice';
import { RootState } from '@/store';

export function AreaRangeSlider() {
  const dispatch = useDispatch();
  const areaRange = useSelector((state: RootState) => state.filters.areaRange);
  
  const [localRange, setLocalRange] = useState<[number, number]>(areaRange);
  const [min, setMin] = useState<string>(areaRange[0].toString());
  const [max, setMax] = useState<string>(areaRange[1].toString());
  
  useEffect(() => {
    setLocalRange(areaRange);
    setMin(areaRange[0].toString());
    setMax(areaRange[1].toString());
  }, [areaRange]);
  
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
    dispatch(setAreaRange([numValue, localRange[1]]));
  };
  
  const handleMaxBlur = () => {
    const numValue = parseInt(max, 10);
    if (isNaN(numValue)) {
      setMax(localRange[1].toString());
      return;
    }
    dispatch(setAreaRange([localRange[0], numValue]));
  };
  
  return (
    <div>
      <div className="flex space-x-2 mb-2">
        <div className="flex-1">
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              className="input-field pr-8"
              placeholder="Min"
              value={min}
              onChange={handleMinChange}
              onBlur={handleMinBlur}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">m²</span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              className="input-field pr-8"
              placeholder="Max"
              value={max}
              onChange={handleMaxChange}
              onBlur={handleMaxBlur}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">m²</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-500">{localRange[0]}m²</span>
        <input
          type="range"
          min={0}
          max={500}
          value={localRange[0]}
          onChange={(e) => {
            const value = Math.min(parseInt(e.target.value, 10), localRange[1]);
            setLocalRange([value, localRange[1]]);
            setMin(value.toString());
          }}
          onMouseUp={() => dispatch(setAreaRange(localRange))}
          onTouchEnd={() => dispatch(setAreaRange(localRange))}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-xs text-gray-500">{localRange[1]}m²</span>
      </div>
      
      <input
        type="range"
        min={0}
        max={500}
        value={localRange[1]}
        onChange={(e) => {
          const value = Math.max(parseInt(e.target.value, 10), localRange[0]);
          setLocalRange([localRange[0], value]);
          setMax(value.toString());
        }}
        onMouseUp={() => dispatch(setAreaRange(localRange))}
        onTouchEnd={() => dispatch(setAreaRange(localRange))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}