import { ListingType } from '@/store/slices/filtersSlice';

export interface Project {
  id: string;
  name: string;
}

export interface Apartment {
  id: string;
  title: string;
  city: string;
  listingType: ListingType;
  price: number;
  areaInSqM: number;
  bedrooms: number;
  bathrooms: number;
  createdAt: string;
  project: Project;
  images: string[];
}

export interface ApartmentDetails extends Apartment {
  description: string;
  contact: {
    name: string;
    phone: string;
    mail: string;
  };
}

export interface ApartmentsResponse {
  apartments: Apartment[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApartmentFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minAreaInSqM?: number;
  maxAreaInSqM?: number;
  bedrooms?: number;
  bathrooms?: number;
  listingType?: ListingType;
  cities?: string[];
  createdBefore?: string;
  projectId?: number;
  createdAfter?: string;
  page?: number;
  pageSize?: number;
}