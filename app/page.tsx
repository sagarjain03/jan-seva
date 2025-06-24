"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Mic, Search, Wheat, GraduationCap, Home, ArrowRight, Users, Shield, Globe } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem("janseva-user")
    if (userData) {
      const user = JSON.parse(userData)
      // Redirect based on user type
      if (user.type === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-green-600">Loading JanSeva...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-800">JanSeva</h1>
              <p className="text-xs text-green-600">जन सेवा</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => router.push("/login")}>
              Login
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => router.push("/register")}>
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center space-y-12">
          {/* Main Hero */}
          <div className="space-y-8">
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-green-100 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-200 to-green-200 rounded-full flex items-center justify-center">
                  <Home className="w-10 h-10 text-green-700" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                Get the Right
                <span className="text-green-600"> Government Schemes</span>
                <br />
                for You
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover government schemes and benefits you're eligible for. Simple, fast, and in your language. Apply
                online and track your applications seamlessly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg"
                onClick={() => router.push("/register")}
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-green-200 text-green-700 hover:bg-green-50 px-8 py-4 text-lg"
                onClick={() => router.push("/login")}
              >
                <Search className="w-5 h-5 mr-2" />
                Check Status
              </Button>
            </div>
          </div>

          {/* Voice Assistant Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-24 h-24 rounded-full bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Mic className="w-8 h-8 text-white" />
              </Button>
              <p className="text-lg text-gray-600">
                <strong>Voice Assistant Available</strong>
                <br />
                <span className="text-sm">Speak in Hindi or English to find schemes</span>
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-800">Easy Application</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Simple step-by-step process to apply for government schemes. No complex paperwork or long queues.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-800">Secure & Trusted</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Government-backed platform ensuring your data security and privacy. Official Digital Bharat
                  initiative.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-orange-800">Multi-Language</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Available in Hindi and English. Voice support for easy interaction in your preferred language.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Scheme Categories */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Popular Scheme Categories</h2>
            <div className="flex justify-center space-x-12 opacity-80">
              <div className="text-center">
                <Wheat className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Agriculture</p>
              </div>
              <div className="text-center">
                <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Education</p>
              </div>
              <div className="text-center">
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Healthcare</p>
              </div>
              <div className="text-center">
                <Home className="w-12 h-12 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Housing</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-green-100 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-800">JanSeva</h3>
                <p className="text-xs text-green-600">जन सेवा</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-orange-600">Digital Bharat</span> Initiative
            </p>
            <p className="text-xs text-gray-500">Empowering Citizens Through Technology</p>
            <p className="text-xs text-gray-400">© 2024 Government of India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
