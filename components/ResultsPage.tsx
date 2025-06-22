"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import type { Scheme } from "@/types"

interface ResultsPageProps {
  eligibleSchemes: Scheme[]
  onApplyScheme: (scheme: Scheme) => void
  onNavigate: (path: string) => void
}

export default function ResultsPage({ eligibleSchemes, onApplyScheme, onNavigate }: ResultsPageProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Your Eligible Schemes</h2>
        <p className="text-gray-600">Based on your information, here are the schemes you can apply for</p>
      </div>

      <div className="grid gap-6">
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
                  <strong>Deadline:</strong> {scheme.applicationDeadline}
                </p>
                <p className="text-sm">
                  <strong>Required Documents:</strong> {scheme.documents.join(", ")}
                </p>
              </div>
              <div className="flex space-x-3">
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => onApplyScheme(scheme)}>
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
          onClick={() => onNavigate("/form")}
          className="border-green-200 text-green-700 hover:bg-green-50"
        >
          Update Information
        </Button>
      </div>
    </div>
  )
}
