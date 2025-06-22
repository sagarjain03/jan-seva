"use client"

import { Button } from "@/components/ui/button"
import { Mic, Search, Wheat, GraduationCap, Heart, Home } from "lucide-react"

interface HomePageProps {
  onNavigate: (path: string) => void
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-6">
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-green-100 rounded-full flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-200 to-green-200 rounded-full flex items-center justify-center">
              <Home className="w-10 h-10 text-green-700" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
          Get the Right Government Schemes for You
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover government schemes and benefits you're eligible for. Simple, fast, and in your language.
        </p>
      </div>

      <div className="space-y-4">
        <Button
          size="lg"
          className="w-24 h-24 rounded-full bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Mic className="w-8 h-8 text-white" />
        </Button>
        <p className="text-sm text-gray-600">Tap to speak with our voice assistant</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            className="border-green-200 text-green-700 hover:bg-green-50 px-8 py-3"
            onClick={() => onNavigate("/form")}
          >
            Start Manually
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-3"
            onClick={() => onNavigate("/status")}
          >
            <Search className="w-4 h-4 mr-2" />
            Check Status
          </Button>
        </div>
      </div>

      <div className="flex justify-center space-x-8 mt-12 opacity-60">
        <Wheat className="w-8 h-8 text-green-600" />
        <GraduationCap className="w-8 h-8 text-blue-600" />
        <Heart className="w-8 h-8 text-red-500" />
        <Home className="w-8 h-8 text-orange-600" />
      </div>
    </div>
  )
}
