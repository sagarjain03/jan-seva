// AuthPage.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart } from "lucide-react"
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  
  // ADMIN_EMAIL should be stored in environment variables in production
  const ADMIN_EMAIL = "admin@janseva.com"; 

  // Form states
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
    phonenumber: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle login
  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/users/login", loginData);
      
      // Check if user is admin by email
      const isAdmin = loginData.email === ADMIN_EMAIL;
      
      if (isAdmin) {
        alert("Welcome Admin!");
        router.push("/admin-dashboard");
      } else {
        alert("Welcome User!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle signup
  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/users/register", signupData);

      // Auto-login after signup
      const loginResponse = await axios.post("/api/users/login", {
        email: signupData.email,
        password: signupData.password
      });

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // Update handlers
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

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
          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as "login" | "signup")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input 
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    type="password" 
                    placeholder="Enter your password" 
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Login"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input 
                    name="fullname"
                    value={signupData.fullname}
                    onChange={handleSignupChange}
                    placeholder="Enter your full name" 
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input name="email" value={signupData.email} onChange={handleSignupChange} placeholder="Enter your email" />
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input name="phonenumber" value={signupData.phonenumber} onChange={handleSignupChange} placeholder="Enter your phone number" />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input name="password" value={signupData.password} onChange={handleSignupChange} placeholder="Create a password" />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleSignup}
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}