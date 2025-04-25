export function FilterSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 animate-pulse">
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-grow">
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          
          <div className="h-10 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}