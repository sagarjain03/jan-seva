"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import Header from "@/components/Header";



export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userType, setUserType] = useState<"user" | "admin">("user")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("janseva-user", JSON.stringify(data.user));
        // Redirect based on user type
        if (data.user?.type === "admin") {
          router.push("/admin-dashboard")
        } else {
          router.push("/dashboard")
        }
      } else {
        throw new Error(data.error || "Login failed. Please check your credentials.")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-green-100 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-700">
            Welcome to Scheme Portal
          </CardTitle>
          <p className="text-gray-600">Sign in to access your account</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-green-200 focus:border-green-400"
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-green-200 focus:border-green-400"
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700">Login As</Label>
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant={userType === "user" ? "default" : "outline"}
                  className={`w-full ${userType === "user" ? "bg-green-600 hover:bg-green-700" : ""}`}
                  onClick={() => setUserType("user")}
                >
                  Citizen
                </Button>
                <Button
                  type="button"
                  variant={userType === "admin" ? "default" : "outline"}
                  className={`w-full ${userType === "admin" ? "bg-green-600 hover:bg-green-700" : ""}`}
                  onClick={() => setUserType("admin")}
                >
                  Admin
                </Button>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Don't have an account?{" "}
              <Button variant="link" className="text-green-600 p-0 h-auto">
                Contact support
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

