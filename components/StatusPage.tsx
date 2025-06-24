"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import type { Application } from "@/types"

export default function StatusPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Application[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch application status from backend
  const fetchApplicationStatus = async (query: string) => {
    try {
      setLoading(true)
      setError(null)
      
      // Search applications by ID, name, or phone
      const response = await fetch(`/api/applications/search?query=${encodeURIComponent(query)}`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch application status")
      }
      
      const data = await response.json()
      setSearchResults(data.applications || [])
    } catch (err) {
      console.error("Error fetching application status:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchApplicationStatus(searchQuery)
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Check Application Status</h2>
        <p className="text-gray-600">Enter your application ID, name, or phone number</p>
      </div>

      <Card className="border-green-100 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Enter Application ID, Name, or Phone Number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="border-green-200 focus:border-green-400 flex-grow"
              disabled={loading}
            />
            <Button 
              onClick={handleSearch} 
              className="bg-green-600 hover:bg-green-700"
              disabled={loading || !searchQuery.trim()}
            >
              <Search className="w-4 h-4 mr-2" />
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {searchResults.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Search Results</h3>
          {searchResults.map((app) => (
            <Card key={app.id} className="border-green-100">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div className="mb-2 sm:mb-0">
                    <h4 className="font-semibold">{app.schemeName}</h4>
                    <p className="text-sm text-gray-600">Application ID: {app.id}</p>
                  </div>
                  <Badge
                    variant={
                      app.status === "approved" ? "default" : 
                      app.status === "rejected" ? "destructive" : "secondary"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>Submitted: {app.submittedAt}</div>
                  <div>Last Updated: {app.lastUpdated}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : searchQuery && !loading && !error ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No applications found matching your search</p>
        </div>
      ) : null}
    </div>
  )
}