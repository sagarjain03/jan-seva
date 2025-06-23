"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface AuthPageProps {
  onLogin: (email: string, password: string, type: "user" | "admin") => void
}

export default function AuthPage({ onLogin }: AuthPageProps) {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login page since we now have separate routes
    router.push("/login")
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-green-600">Redirecting to login...</p>
      </div>
    </div>
  )
}
