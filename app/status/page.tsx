"use client"

import { useState, useEffect } from "react"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"
import StatusPage from "@/components/StatusPage"
import type { Application } from "@/types"
import { mockApplications } from "@/data/mockData"

export default function StatusPageRoute() {
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    // Load applications (combine mock data with user applications)
    const userApplications = JSON.parse(localStorage.getItem("janseva-applications") || "[]")
    setApplications([...mockApplications, ...userApplications])
  }, [])

  return (
    <AuthenticatedLayout>
      <StatusPage applications={applications} />
    </AuthenticatedLayout>
  )
}
