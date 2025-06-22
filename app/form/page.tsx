"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"
import FormPage from "@/components/FormPage"
import type { FormData } from "@/types"
import { mockSchemes } from "@/data/mockData"

export default function FormPageRoute() {
  const router = useRouter()
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

  useEffect(() => {
    // Load saved form data
    const savedFormData = localStorage.getItem("janseva-form-data")
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData))
    }
  }, [])

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("janseva-form-data", JSON.stringify(formData))
  }, [formData])

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleEligibilityCheck = () => {
    // Filter eligible schemes based on form data
    const eligible = mockSchemes.filter((scheme) => {
      if (
        formData.occupation.toLowerCase().includes("farm") ||
        formData.occupation.toLowerCase().includes("agriculture")
      ) {
        return scheme.eligibility.includes("farmer") || scheme.eligibility.includes("agriculture")
      }
      if (formData.income === "below-2-lakh") {
        return scheme.eligibility.includes("low-income") || scheme.eligibility.includes("below-poverty")
      }
      return true
    })

    // Store eligible schemes
    localStorage.setItem("janseva-eligible-schemes", JSON.stringify(eligible))

    // Navigate to results page
    router.push("/results")
  }

  return (
    <AuthenticatedLayout>
      <FormPage formData={formData} onUpdateFormData={updateFormData} onSubmit={handleEligibilityCheck} />
    </AuthenticatedLayout>
  )
}
