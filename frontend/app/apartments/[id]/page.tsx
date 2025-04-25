import { Suspense } from 'react';
import { ApartmentDetail } from '@/components/apartment/ApartmentDetail';
import { DetailSkeleton } from '@/components/apartment/DetailSkeleton';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ApartmentDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container-custom py-8">
      <div className="mb-4">
        <Link href="/apartments" className="text-primary-600 hover:text-primary-700 flex items-center">
        <ArrowLeft size={18} className="mr-2" />

          Back to listings
        </Link>
      </div>
      
      <Suspense fallback={<DetailSkeleton />}>
        <ApartmentDetail id={params.id} />
      </Suspense>
    </div>
  );
}