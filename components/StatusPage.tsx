"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import type { Application } from "@/types"

interface StatusPageProps {
  applications: Application[]
}

export default function StatusPage({ applications }: StatusPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Application[]>([])

  const handleSearch = () => {
    const results = applications.filter(
      (app) =>
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.formData.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.formData.phone?.includes(searchQuery),
    )
    setSearchResults(results)
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Check Application Status</h2>
        <p className="text-gray-600">Enter your application ID, name, or phone number</p>
      </div>

      <Card className="border-green-100 shadow-sm">
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <Input
              placeholder="Enter Application ID, Name, or Phone Number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-green-200 focus:border-green-400"
            />
            <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Search Results</h3>
          {searchResults.map((app) => (
            <Card key={app.id} className="border-green-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold">{app.schemeName}</h4>
                    <p className="text-sm text-gray-600">Application ID: {app.id}</p>
                  </div>
                  <Badge
                    variant={
                      app.status === "approved" ? "default" : app.status === "rejected" ? "destructive" : "secondary"
                    }
                    className={
                      app.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : app.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {app.status === "approved" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {app.status === "rejected" && <AlertCircle className="w-3 h-3 mr-1" />}
                    {app.status === "under-review" && <Clock className="w-3 h-3 mr-1" />}
                    {app.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1).replace("-", " ")}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Submitted: {app.submittedAt}</div>
                  <div>Last Updated: {app.lastUpdated}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
