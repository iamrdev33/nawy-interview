import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ListingType = 'sale' | 'rent' | '';

export interface FiltersState {
  search: string;
  priceRange: [number, number];
  areaRange: [number, number];
  bedrooms: number | null;
  bathrooms: number | null;
  listingType: ListingType;
  projectId: number | null;
  cities: string[];
  dateRange: {
    from: string | null;
    to: string | null;
  };
}

const initialState: FiltersState = {
  search: '',
  priceRange: [0, 50000000],
  areaRange: [0, 1000],
  bedrooms: null,
  bathrooms: null,
  listingType: '',
  projectId: 0,
  cities: [],
  dateRange: {
    from: null,
    to: null,
  },
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setAreaRange: (state, action: PayloadAction<[number, number]>) => {
      state.areaRange = action.payload;
    },
    setBedrooms: (state, action: PayloadAction<number | null>) => {
      state.bedrooms = action.payload;
    },
    setBathrooms: (state, action: PayloadAction<number | null>) => {
      state.bathrooms = action.payload;
    },
    setProjectId: (state, action: PayloadAction<number | null>) => {
      state.projectId = action.payload;
    },
    setListingType: (state, action: PayloadAction<ListingType>) => {
      state.listingType = action.payload;
    },
    setCities: (state, action: PayloadAction<string[]>) => {
      state.cities = action.payload;
    },
    addCity: (state, action: PayloadAction<string>) => {
      if (!state.cities.includes(action.payload)) {
        state.cities.push(action.payload);
      }
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter(city => city !== action.payload);
    },
    setDateRange: (state, action: PayloadAction<{ from: string | null; to: string | null }>) => {
      state.dateRange = action.payload;
    },
    resetFilters: (state) => {
      return initialState;
    },
    removeFilter: (state, action: PayloadAction<keyof FiltersState>) => {
      const key = action.payload;
      if (key === 'priceRange') {
        state.priceRange = initialState.priceRange;
      } else if (key === 'areaRange') {
        state.areaRange = initialState.areaRange;
      } else if (key === 'dateRange') {
        state.dateRange = initialState.dateRange;
      } else if (key === 'cities') {
        state.cities = [];
      } else {
        (state as any)[key] = initialState[key];
      }
    },
  },
});

export const {
  setSearch,
  setPriceRange,
  setAreaRange,
  setBedrooms,
  setBathrooms,
  setListingType,
  setCities,
  addCity,
  removeCity,
  setDateRange,
  resetFilters,
  removeFilter,
} = filtersSlice.actions;

export default filtersSlice.reducer;