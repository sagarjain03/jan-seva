export default function RegisterLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header Skeleton */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="space-y-1">
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-10 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </header>

      {/* Form Skeleton */}
      <main className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md border border-green-100 rounded-lg shadow-lg p-6 space-y-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
            <div className="space-y-2">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto"></div>
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>
          </div>

          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </main>
    </div>
  )
}
