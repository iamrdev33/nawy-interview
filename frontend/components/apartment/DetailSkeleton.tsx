export function DetailSkeleton() {
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