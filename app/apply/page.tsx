"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"
import ApplicationPage from "@/components/ApplicationPage"
import type { Scheme, FormData, Application } from "@/types"

export default function ApplyPageRoute() {
  const router = useRouter()
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null)
  const [formData, setFormData] = useState<FormData>({
    age: "",
    gender: "",
    income: "",
    caste: "",
    location: "",
    occupation: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const [currentFormStep, setCurrentFormStep] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load selected scheme
    const scheme = localStorage.getItem("janseva-selected-scheme")
    if (!scheme) {
      router.push("/results")
      return
    }

    setSelectedScheme(JSON.parse(scheme))

    // Load form data
    const savedFormData = localStorage.getItem("janseva-form-data")
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData))
    }

    setIsLoading(false)
  }, [router])

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    setCurrentFormStep(Math.min(3, currentFormStep + 1))
  }

  const handlePrevStep = () => {
    setCurrentFormStep(Math.max(1, currentFormStep - 1))
  }

  const submitApplication = async () => {
    const userData = localStorage.getItem("janseva-user")
    const currentUser = userData ? JSON.parse(userData) : null

    const newApplication: Application = {
      id: `APP${Date.now()}`,
      userId: currentUser?.id || "",
      schemeId: selectedScheme?.id || "",
      schemeName: selectedScheme?.name || "",
      status: "pending",
      submittedAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      formData,
    }

    // Store application
    const existingApplications = JSON.parse(localStorage.getItem("janseva-applications") || "[]")
    existingApplications.push(newApplication)
    localStorage.setItem("janseva-applications", JSON.stringify(existingApplications))

    // Mock notification
    alert(
      `Application submitted successfully! Your application ID is ${newApplication.id}. You will receive SMS/Email confirmation shortly.`,
    )

    router.push("/dashboard")
  }

  if (isLoading) {
    return (
      <AuthenticatedLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-green-600">Loading application form...</p>
          </div>
        </div>
      </AuthenticatedLayout>
    )
  }

  if (!selectedScheme) {
    return null
  }

  return (
    <AuthenticatedLayout>
      <ApplicationPage
        selectedScheme={selectedScheme}
        formData={formData}
        currentFormStep={currentFormStep}
        onUpdateFormData={updateFormData}
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
        onSubmit={submitApplication}
      />
    </AuthenticatedLayout>
  )
}
