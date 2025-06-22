export default function FormLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="h-8 bg-gray-200 rounded animate-pulse max-w-sm mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse max-w-md mx-auto"></div>
          </div>

          <div className="border border-green-100 rounded-lg p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <div className="h-12 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
