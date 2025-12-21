export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-10 bg-gray-200 rounded mb-6 w-full"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg h-80 bg-white p-4"
          >
            <div className="h-8 bg-gray-300 w-full mb-4 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-100 rounded w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
