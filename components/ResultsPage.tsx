"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import type { Scheme } from "@/types"

export default function ResultsPage() {
  const router = useRouter()
  const [eligibleSchemes, setEligibleSchemes] = useState<Scheme[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Parse the query parameters
    const queryParams = new URLSearchParams(window.location.search)
    const dataParam = queryParams.get("data")
    
    if (dataParam) {
      try {
        const schemes = JSON.parse(decodeURIComponent(dataParam))
        setEligibleSchemes(schemes)
      } catch (err) {
        setError("Failed to parse results data")
        console.error("Parsing error:", err)
      } finally {
        setLoading(false)
      }
    } else {
      setError("No results data found")
      setLoading(false)
    }
  }, [])

  const handleApplyScheme = (scheme: Scheme) => {
    // Store selected scheme in localStorage for application process
    localStorage.setItem("selectedScheme", JSON.stringify(scheme))
    router.push("/apply")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-green-600">Loading your eligible schemes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md border-red-100">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button 
              onClick={() => router.push("/form")}
              className="bg-green-600 hover:bg-green-700"
            >
              Go Back to Form
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (eligibleSchemes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md border-yellow-100">
          <CardHeader>
            <CardTitle>No Eligible Schemes Found</CardTitle>
            <CardDescription>
              Based on your information, we couldn't find any matching government schemes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              This could be because:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>Your details don't match current scheme criteria</li>
              <li>There are no active schemes for your profile</li>
              <li>You might need to update your information</li>
            </ul>
            <div className="flex justify-center">
              <Button 
                onClick={() => router.push("/form")}
                className="bg-green-600 hover:bg-green-700"
              >
                Update Information
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8 py-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Your Eligible Schemes</h2>
        <p className="text-gray-600">
          Based on your information, we found {eligibleSchemes.length} scheme{eligibleSchemes.length !== 1 ? 's' : ''} you can apply for
        </p>
      </div>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {eligibleSchemes.map((scheme) => (
          <Card key={scheme.id} className="border-green-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg text-gray-800">{scheme.name}</CardTitle>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {scheme.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 mb-4">{scheme.description}</CardDescription>
              <div className="space-y-2 mb-4">
                <p className="text-sm">
                  <strong>Benefits:</strong> {scheme.benefits}
                </p>
                <p className="text-sm">
                  <strong>Deadline:</strong> {scheme.applicationDeadline || "No deadline specified"}
                </p>
                {scheme.documents && (
                  <p className="text-sm">
                    <strong>Required Documents:</strong> {scheme.documents.join(", ")}
                  </p>
                )}
              </div>
              <div className="flex space-x-3">
                <Button 
                  className="bg-green-600 hover:bg-green-700" 
                  onClick={() => handleApplyScheme(scheme)}
                >
                  Apply Now
                </Button>
                <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  More Info
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => router.push("/form")}
          className="border-green-200 text-green-700 hover:bg-green-50"
        >
          Update Information
        </Button>
      </div>
    </div>
  )
}