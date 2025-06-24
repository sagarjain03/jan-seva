"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, MapPin, Briefcase, IndianRupee, Calendar, Users, CheckCircle, MicIcon, Phone } from "lucide-react"
import { useSpeechToText } from "@/hooks/useSpeechToText"
import type { FormData, Scheme } from "@/types"

export default function FormPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name,
    age: "",
    gender: "",
    income: "",
    caste: "",
    location: "",
    occupation: "",
    phone: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const startDictation = useSpeechToText()

  const onUpdateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.age || !formData.gender || !formData.income) {
      setError("Please fill in all required fields")
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch("/api/eligibility", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          age: formData.age,
          gender: formData.gender,
          income: formData.income,
          caste: formData.caste,
          location: formData.location,
          occupation: formData.occupation
        })
      })

      if (!response.ok) {
        throw new Error("Failed to check eligibility")
      }

      const eligibleSchemes: Scheme[] = await response.json()
      
      // Navigate to results page with data
      router.push(`/results?data=${encodeURIComponent(JSON.stringify(eligibleSchemes))}`)
    } catch (err) {
      console.error("Eligibility check error:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Tell us about yourself</h2>
        <p className="text-gray-600">We'll find the best schemes for your situation</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}

      <Card className="border-green-100 shadow-sm">
        <CardContent className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-2">
                <User className="w-4 h-4 text-green-600" />
                <span>Full Name</span>
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => onUpdateFormData("name", e.target.value)}
                  className="border-green-200 focus:border-green-400"
                  disabled={loading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-600"
                  type="button"
                  onClick={() =>
                    startDictation((text) => onUpdateFormData("name", text))
                  }
                  disabled={loading}
                >
                  <MicIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-green-600" />
                <span>Age *</span>
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => onUpdateFormData("age", e.target.value)}
                  className="border-green-200 focus:border-green-400"
                  disabled={loading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-600"
                  type="button"
                  onClick={() =>
                    startDictation((text) => onUpdateFormData("age", text))
                  }
                  disabled={loading}
                >
                  <MicIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <User className="w-4 h-4 text-green-600" />
                <span>Gender *</span>
              </Label>
              <div className="flex space-x-2">
                <Select
                  value={formData.gender}
                  onValueChange={(value) => onUpdateFormData("gender", value)}
                  disabled={loading}
                >
                  <SelectTrigger className="border-green-200 focus:border-green-400">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-600"
                  type="button"
                  onClick={() =>
                    startDictation((text) => onUpdateFormData("gender", text.toLowerCase()))
                  }
                  disabled={loading}
                >
                  <MicIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Income */}
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <IndianRupee className="w-4 h-4 text-green-600" />
                <span>Annual Income *</span>
              </Label>
              <div className="flex space-x-2">
                <Select
                  value={formData.income}
                  onValueChange={(value) => onUpdateFormData("income", value)}
                  disabled={loading}
                >
                  <SelectTrigger className="border-green-200 focus:border-green-400">
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="below-2-lakh">Below ₹2 Lakh</SelectItem>
                    <SelectItem value="2-5-lakh">₹2-5 Lakh</SelectItem>
                    <SelectItem value="5-10-lakh">₹5-10 Lakh</SelectItem>
                    <SelectItem value="above-10-lakh">Above ₹10 Lakh</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-600"
                  type="button"
                  onClick={() =>
                    startDictation((text) => onUpdateFormData("income", text.toLowerCase()))
                  }
                  disabled={loading}
                >
                  <MicIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Caste */}
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-green-600" />
                <span>Category</span>
              </Label>
              <div className="flex space-x-2">
                <Select
                  value={formData.caste}
                  onValueChange={(value) => onUpdateFormData("caste", value)}
                  disabled={loading}
                >
                  <SelectTrigger className="border-green-200 focus:border-green-400">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="obc">OBC</SelectItem>
                    <SelectItem value="sc">SC</SelectItem>
                    <SelectItem value="st">ST</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-600"
                  type="button"
                  onClick={() =>
                    startDictation((text) => onUpdateFormData("caste", text.toLowerCase()))
                  }
                  disabled={loading}
                >
                  <MicIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <span>Location</span>
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="location"
                  placeholder="Enter your district/city"
                  value={formData.location}
                  onChange={(e) => onUpdateFormData("location", e.target.value)}
                  className="border-green-200 focus:border-green-400"
                  disabled={loading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-600"
                  type="button"
                  onClick={() =>
                    startDictation((text) => onUpdateFormData("location", text))
                  }
                  disabled={loading}
                >
                  <MicIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <Label htmlFor="occupation" className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-green-600" />
                <span>Occupation</span>
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="occupation"
                  placeholder="Enter your occupation"
                  value={formData.occupation}
                  onChange={(e) => onUpdateFormData("occupation", e.target.value)}
                  className="border-green-200 focus:border-green-400"
                  disabled={loading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-600"
                  type="button"
                  onClick={() =>
                    startDictation((text) => onUpdateFormData("occupation", text))
                  }
                  disabled={loading}
                >
                  <MicIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-green-600" />
                <span>Phone Number</span>
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => onUpdateFormData("phone", e.target.value)}
                  className="border-green-200 focus:border-green-400"
                  disabled={loading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-600"
                  type="button"
                  onClick={() =>
                    startDictation((text) => onUpdateFormData("phone", text))
                  }
                  disabled={loading}
                >
                  <MicIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-8 py-3"
              disabled={loading || !formData.age || !formData.gender || !formData.income}
            >
              {loading ? (
                <>
                  <span className="animate-pulse">Checking Eligibility</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Check Eligibility
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}