export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-green-800 mb-2">JanSeva</h2>
        <p className="text-green-600">जन सेवा</p>
        <p className="text-sm text-gray-600 mt-4">Loading your government services...</p>
      </div>
    </div>
  )
}
