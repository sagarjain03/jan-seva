"use client"

import { Button } from "@/components/ui/button"
import { Heart, Globe, Wifi, WifiOff, LogOut } from "lucide-react"
import type { UserType, Language } from "@/types"

interface HeaderProps {
  language: Language
  setLanguage: (lang: Language) => void
  isOnline: boolean
  currentUser: UserType | null
  onLogout: () => void
}

export default function Header({ language, setLanguage, isOnline, currentUser, onLogout }: HeaderProps) {
  return (
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
          {/* Online/Offline Indicator */}
          <div className="flex items-center space-x-2">
            {isOnline ? <Wifi className="w-4 h-4 text-green-600" /> : <WifiOff className="w-4 h-4 text-red-600" />}
            <span className="text-xs text-gray-600">{isOnline ? "Online" : "Offline"}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 border-green-200 text-green-700 hover:bg-green-50"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
          >
            <Globe className="w-4 h-4" />
            <span>{language === "en" ? "हिंदी" : "English"}</span>
          </Button>

          {currentUser && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Welcome, {currentUser.name}</span>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
