'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useApartmentDetails } from '@/hooks/useApartmentDetails';
import { Bed, ChevronLeft, ChevronRight, House, Mail, Phone, Toilet, X } from 'lucide-react';

interface ApartmentDetailProps {
  id: string;
}

export function ApartmentDetail({ id }: ApartmentDetailProps) {
  const { data: apartment, isLoading, error } = useApartmentDetails(id);
  const [activeImage, setActiveImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(0);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (error || !apartment) {
    return (
      <div className="bg-error-50 border border-error-500 text-error-900 p-4 rounded-md">
        <p>Failed to load apartment details. Please try again later.</p>
      </div>
    );
  }

  const {
    title, price, areaInSqM, bedrooms, bathrooms, city,
    listingType, description, contact, project
  } = apartment;

  const images: string[] = [];
  for (let i = 0; i < 4; i++) {
    const url = `https://picsum.photos/seed/${id}-${i}/1200/800`;
    images.push(url);
  }

  const openLightbox = (index: number) => {
    setLightboxImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightboxImage = () => {
    setLightboxImage((prev) => (prev + 1) % images.length);
  };

  const prevLightboxImage = () => {
    setLightboxImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div>
      <div className="mb-8">
        <div
          onClick={() => openLightbox(activeImage)}
          className="relative h-[400px] mb-4 rounded-lg overflow-hidden">
          <Image
            src={images[activeImage]}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            className="object-cover cursor-pointer"
          />
          {images.length > 1 && (
            <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                }}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage((prev) => (prev + 1) % images.length);
                }}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex justify-center items-center space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative h-20 w-32 rounded-md overflow-hidden cursor-pointer flex-shrink-0 ${activeImage === index ? 'h-24 w-36' : ''
                  }`}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600 mb-4">{project.name} • {city}</p>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center">
                <Bed size={20} className='mr-2' />
                <span>{bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
              </div>
              <div className="flex items-center">
                <Toilet size={20} className='mr-2' />
                <span>{bathrooms} {bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
              </div>
              <div className="flex items-center">
                <House size={20} className='mr-2' />
                <span>{areaInSqM} m²</span>
              </div>
            </div>

            <div className={`p-3 rounded-md inline-block ${listingType === 'sale'
              ? 'bg-accent-100 text-accent-800'
              : 'bg-primary-100 text-primary-800'
              }`}>
              <span className="font-medium">
                {listingType === 'sale' ? 'For Sale' : 'For Rent'}
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              EGP {price}
              {listingType === 'rent' && <span className="text-lg font-normal text-gray-500">/month</span>}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
            <div className={`text-gray-700 ${isExpanded ? '' : 'line-clamp-4'}`}>
              <p>{description}</p>
            </div>
            {description?.length > 300 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-primary-600 hover:text-primary-800 font-medium"
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="mb-4">
              <p className="font-medium text-gray-900">{contact.name}</p>
            </div>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Phone size={20} className='mr-2' />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail size={20} className='mr-2' />
                <span>{contact.mail}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X size={20} />
            </button>

            <div className="relative h-[80vh]">
              <Image
                src={images[lightboxImage]}
                alt={title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevLightboxImage();
                }}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextLightboxImage();
                }}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="text-white text-center mt-4">
              {lightboxImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[400px] bg-gray-200 rounded-lg mb-4"></div>
      <div className="flex space-x-2 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-20 w-32 bg-gray-200 rounded-md"></div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="h-10 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/4"></div>

          <div className="flex gap-4 mb-6">
            <div className="h-8 bg-gray-200 rounded w-24"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="h-6 bg-gray-200 rounded mb-4 w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="h-6 bg-gray-200 rounded mb-4 w-1/4"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-6 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-6 bg-gray-200 rounded mb-4 w-2/3"></div>
            <div className="h-5 bg-gray-200 rounded mb-4"></div>
            <div className="h-5 bg-gray-200 rounded mb-4"></div>
            <div className="h-5 bg-gray-200 rounded mb-6"></div>
            <div className="h-10 bg-gray-200 rounded mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}