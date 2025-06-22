"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"
import ResultsPage from "@/components/ResultsPage"
import type { Scheme } from "@/types"

export default function ResultsPageRoute() {
  const router = useRouter()
  const [eligibleSchemes, setEligibleSchemes] = useState<Scheme[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load eligible schemes
    const schemes = localStorage.getItem("janseva-eligible-schemes")
    if (!schemes) {
      router.push("/form")
      return
    }

    setEligibleSchemes(JSON.parse(schemes))
    setIsLoading(false)
  }, [router])

  const handleApplyScheme = (scheme: Scheme) => {
    // Store selected scheme
    localStorage.setItem("janseva-selected-scheme", JSON.stringify(scheme))
    router.push("/apply")
  }

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  if (isLoading) {
    return (
      <AuthenticatedLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-green-600">Loading eligible schemes...</p>
          </div>
        </div>
      </AuthenticatedLayout>
    )
  }

  return (
    <AuthenticatedLayout>
      <ResultsPage eligibleSchemes={eligibleSchemes} onApplyScheme={handleApplyScheme} onNavigate={handleNavigate} />
    </AuthenticatedLayout>
  )
}
