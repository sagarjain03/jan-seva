"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"
import AdminDashboard from "@/components/AdminDashboard"
import type { Scheme, Application } from "@/types"
import { mockSchemes, mockApplications } from "@/data/mockData"

export default function AdminPage() {
  const router = useRouter()
  const [schemes, setSchemes] = useState<Scheme[]>(mockSchemes)
  const [applications, setApplications] = useState<Application[]>(mockApplications)

  useEffect(() => {
    // Load schemes and applications
    const savedSchemes = localStorage.getItem("janseva-admin-schemes")
    if (savedSchemes) {
      setSchemes(JSON.parse(savedSchemes))
    }

    const userApplications = JSON.parse(localStorage.getItem("janseva-applications") || "[]")
    setApplications([...mockApplications, ...userApplications])
  }, [])

  const addNewScheme = (newScheme: Partial<Scheme>) => {
    if (newScheme.name && newScheme.description) {
      const scheme: Scheme = {
        id: Date.now().toString(),
        name: newScheme.name,
        description: newScheme.description,
        category: newScheme.category || "General",
        eligibility: newScheme.eligibility || [],
        documents: newScheme.documents || [],
        benefits: newScheme.benefits || "",
        applicationDeadline: newScheme.applicationDeadline || "",
        isActive: true,
      }
      const updatedSchemes = [...schemes, scheme]
      setSchemes(updatedSchemes)
      localStorage.setItem("janseva-admin-schemes", JSON.stringify(updatedSchemes))
    }
  }

  const toggleSchemeStatus = (schemeId: string) => {
    const updatedSchemes = schemes.map((scheme) =>
      scheme.id === schemeId ? { ...scheme, isActive: !scheme.isActive } : scheme,
    )
    setSchemes(updatedSchemes)
    localStorage.setItem("janseva-admin-schemes", JSON.stringify(updatedSchemes))
  }

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <AuthenticatedLayout requireAdmin={true}>
      <AdminDashboard
        schemes={schemes}
        applications={applications}
        onAddScheme={addNewScheme}
        onToggleSchemeStatus={toggleSchemeStatus}
        onNavigate={handleNavigate}
      />
    </AuthenticatedLayout>
  )
}
