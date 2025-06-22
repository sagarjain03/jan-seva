"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { WifiOff } from "lucide-react"
import type { UserType, Language } from "@/types"

interface AuthenticatedLayoutProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export default function AuthenticatedLayout({ children, requireAdmin = false }: AuthenticatedLayoutProps) {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [language, setLanguage] = useState<Language>("en")
  const [isOnline, setIsOnline] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("janseva-user")
    if (!userData) {
      router.push("/")
      return
    }

    const user = JSON.parse(userData)

    // Check admin requirement
    if (requireAdmin && user.type !== "admin") {
      router.push("/dashboard")
      return
    }

    setCurrentUser(user)
    setIsLoading(false)

    // PWA offline detection
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [router, requireAdmin])

  const handleLogout = () => {
    localStorage.removeItem("janseva-user")
    localStorage.removeItem("janseva-form-data")
    localStorage.removeItem("janseva-eligible-schemes")
    localStorage.removeItem("janseva-selected-scheme")
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-green-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header
        language={language}
        setLanguage={setLanguage}
        isOnline={isOnline}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {!isOnline && (
          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <WifiOff className="h-4 w-4" />
            <AlertDescription>
              You're currently offline. Your data will be saved and submitted when you're back online.
            </AlertDescription>
          </Alert>
        )}

        {children}
      </main>

      {/* Bottom Section - Hide for admin pages */}
      {!requireAdmin && (
        <div className="bg-white border-t border-green-100 mt-16">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-orange-600">Digital Bharat</span> Initiative
                </p>
                <p className="text-xs text-gray-500">Empowering Citizens Through Technology</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
