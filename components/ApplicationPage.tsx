"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, ArrowRight, Download, Send, FileText, AlertCircle } from "lucide-react"
import type { FormData, Scheme } from "@/types"

interface ApplicationPageProps {
  selectedScheme: Scheme | null
  formData: FormData
  currentFormStep: number
  onUpdateFormData: (field: keyof FormData, value: string) => void
  onNextStep: () => void
  onPrevStep: () => void
  onSubmit: () => void
}

export default function ApplicationPage({
  selectedScheme,
  formData,
  currentFormStep,
  onUpdateFormData,
  onNextStep,
  onPrevStep,
  onSubmit,
}: ApplicationPageProps) {
  const totalSteps = 3
  const progress = (currentFormStep / totalSteps) * 100

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Apply for {selectedScheme?.name}</h2>
        <div className="space-y-2">
          <Progress value={progress} className="w-full max-w-md mx-auto" />
          <p className="text-sm text-gray-600">
            Step {currentFormStep} of {totalSteps}
          </p>
        </div>
      </div>

      <Card className="border-green-100 shadow-sm">
        <CardContent className="p-6">
          {currentFormStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => onUpdateFormData("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Textarea
                    placeholder="Enter your complete address"
                    value={formData.address}
                    onChange={(e) => onUpdateFormData("address", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {currentFormStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Document Upload</h3>
              <div className="space-y-4">
                {selectedScheme?.documents.map((doc, index) => (
                  <div key={index} className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload {doc}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Choose File
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentFormStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Review & Submit</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Application Summary</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Name: {formData.name}</div>
                    <div>Age: {formData.age}</div>
                    <div>Phone: {formData.phone}</div>
                    <div>Email: {formData.email}</div>
                    <div>Location: {formData.location}</div>
                    <div>Occupation: {formData.occupation}</div>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please review all information carefully before submitting. You will receive SMS and email
                    notifications about your application status.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={onPrevStep} disabled={currentFormStep === 1}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentFormStep < totalSteps ? (
              <Button onClick={onNextStep} className="bg-green-600 hover:bg-green-700">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Form
                </Button>
                <Button onClick={onSubmit} className="bg-green-600 hover:bg-green-700">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
