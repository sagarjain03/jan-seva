"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-orange-100 shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <FileQuestion className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-orange-800">Page Not Found</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <p className="text-gray-600">The page you're looking for doesn't exist or has been moved.</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          <div className="text-center mt-6">
            <h3 className="text-lg font-semibold text-green-800">JanSeva</h3>
            <p className="text-sm text-green-600">जन सेवा</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
