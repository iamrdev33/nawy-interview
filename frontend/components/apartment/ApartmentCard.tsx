import Link from 'next/link';
import Image from 'next/image';
import { Apartment } from '@/types/apartment';
import { Bed, Toilet } from 'lucide-react';

interface ApartmentCardProps {
  apartment: Apartment;
}

export function ApartmentCard({ apartment }: ApartmentCardProps) {
  const { id, title, price, areaInSqM, bedrooms, bathrooms, city, project, listingType, images } = apartment;
  const imageUrl = (images && images.length) ? images[0] : `https://picsum.photos/seed/${id}/700/700`;

  return (
    <Link href={`/apartments/${id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-48">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-md ${listingType === 'sale'
                ? 'bg-accent-100 text-accent-800'
                : 'bg-primary-100 text-primary-800'
              }`}>
              For {listingType === 'sale' ? 'Sale' : 'Rent'}
            </span>
          </div>
        </div>

        <div className="p-4 flex-grow">
          <h3 className="text-lg font-medium text-gray-900 truncate mb-1">{title}</h3>
          <p className="text-gray-600 text-sm mb-3">{project.name} • {city}</p>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="flex gap-2 items-center text-sm text-gray-700">
                <Bed size={18}  />
                <span className="mr-1">{bedrooms}</span>
              </div>
              <div className="flex gap-2 items-center text-sm text-gray-700">
                <Toilet size={18} />
                <span className="mr-1">{bathrooms}</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="mr-1">{areaInSqM}</span>
                <span className="text-xs">m²</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <div className="font-medium text-primary-700">
            EGP {price.toLocaleString()}
            {listingType === 'rent' && <span className="text-sm font-normal text-gray-500">/month</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}