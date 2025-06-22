"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart } from "lucide-react"
import type { AuthMode, UserTypeOption } from "@/types"

interface AuthPageProps {
  onLogin: (email: string, password: string, type: UserTypeOption) => void
}

export default function AuthPage({ onLogin }: AuthPageProps) {
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const [userType, setUserType] = useState<UserTypeOption>("user")

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-green-100 shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-green-800">JanSeva</h1>
            <p className="text-sm text-green-600">जन सेवा</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as AuthMode)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>User Type</Label>
                  <Select value={userType} onValueChange={(value) => setUserType(value as UserTypeOption)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="Enter your email" />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" placeholder="Enter your password" />
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => onLogin("user@example.com", "password", userType)}
                >
                  Login as {userType === "admin" ? "Admin" : "User"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Enter your full name" />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="Enter your email" />
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input placeholder="Enter your phone number" />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" placeholder="Create a password" />
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => onLogin("newuser@example.com", "password", "user")}
                >
                  Create Account
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
