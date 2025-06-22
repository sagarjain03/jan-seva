export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-green-100 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-200 to-green-200 rounded-full"></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse max-w-md mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse max-w-lg mx-auto"></div>
          </div>

          <div className="space-y-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse max-w-xs mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
