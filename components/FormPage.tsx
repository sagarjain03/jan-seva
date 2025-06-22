"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, MapPin, Briefcase, IndianRupee, Calendar, Users, CheckCircle, MicIcon, Phone } from "lucide-react"
import type { FormData } from "@/types"
import { useSpeechToText } from "@/hooks/useSpeechToText";

interface FormPageProps {
  formData: FormData
  onUpdateFormData: (field: keyof FormData, value: string) => void
  onSubmit: () => void
}

export default function FormPage({ formData, onUpdateFormData, onSubmit }: FormPageProps) {
  const startDictation = useSpeechToText();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Tell us about yourself</h2>
        <p className="text-gray-600">We'll find the best schemes for your situation</p>
      </div>

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
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-600"
                  type="button"
                  onClick={() =>
                    startDictation((text) => onUpdateFormData("name", text))
                  }
                >
                  <MicIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-green-600" />
                <span>Age</span>
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => onUpdateFormData("age", e.target.value)}
                  className="border-green-200 focus:border-green-400"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-600"
                  type="button"
                  onClick={() =>
                    startDictation((text) => onUpdateFormData("age", text))
                  }
                >
                  <MicIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <User className="w-4 h-4 text-green-600" />
                <span>Gender</span>
              </Label>
              <div className="flex space-x-2">
                <Select
                  value={formData.gender}
                  onValueChange={(value) => onUpdateFormData("gender", value)}
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
                >
                  <MicIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Income */}
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <IndianRupee className="w-4 h-4 text-green-600" />
                <span>Annual Income</span>
              </Label>
              <div className="flex space-x-2">
                <Select
                  value={formData.income}
                  onValueChange={(value) => onUpdateFormData("income", value)}
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
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-600"
                  type="button"
                  onClick={() =>
                    startDictation((text) => onUpdateFormData("location", text))
                  }
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
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-600"
                  type="button"
                  onClick={() =>
                    startDictation((text) => onUpdateFormData("occupation", text))
                  }
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
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-green-600"
                  type="button"
                  onClick={() =>
                    startDictation((text) => onUpdateFormData("phone", text))
                  }
                >
                  <MicIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={onSubmit}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-8 py-3"
              disabled={!formData.age || !formData.gender || !formData.income}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Check Eligibility
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
