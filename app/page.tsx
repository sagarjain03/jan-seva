"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { WifiOff } from "lucide-react"

// Components
import Header from "@/components/Header"
import AuthPage from "@/components/AuthPage"
import HomePage from "@/components/HomePage"
import FormPage from "@/components/FormPage"
import ResultsPage from "@/components/ResultsPage"
import ApplicationPage from "@/components/ApplicationPage"
import StatusPage from "@/components/StatusPage"
import AdminDashboard from "@/components/AdminDashboard"

// Types and Data
import type { UserType, FormData, Scheme, Application, ViewType, UserTypeOption, Language } from "@/types"
import { mockSchemes, mockApplications } from "@/data/mockData"

export default function JanSevaApp() {

  

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  // State Management
  const [currentView, setCurrentView] = useState<ViewType>("auth")
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [language, setLanguage] = useState<Language>("en")
  const [isOnline, setIsOnline] = useState(true)

  // Form States
  const [formData, setFormData] = useState<FormData>({
    age: "",
    gender: "",
    income: "",
    caste: "",
    location: "",
    occupation: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const [currentFormStep, setCurrentFormStep] = useState(1)
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null)
  const [eligibleSchemes, setEligibleSchemes] = useState<Scheme[]>([])

  // Admin States
  const [schemes, setSchemes] = useState<Scheme[]>(mockSchemes)
  const [applications, setApplications] = useState<Application[]>(mockApplications)

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem("janseva-user")
    if (userData) {
      const user = JSON.parse(userData)
      // Redirect based on user type
      if (user.type === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    } else {
      setIsLoading(false)
    }
  }, [router])

  // PWA and Offline Support
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Load offline data
    const offlineData = localStorage.getItem("janseva-offline-data")
    if (offlineData) {
      const data = JSON.parse(offlineData)
      if (data.formData) setFormData(data.formData)
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Save data offline
  useEffect(() => {
    if (!isOnline) {
      localStorage.setItem("janseva-offline-data", JSON.stringify({ formData }))
    }
  }, [formData, isOnline])

  // Authentication Functions
  const handleLogin = async (email: string, password: string, type: UserTypeOption) => {
    // Mock authentication - in real app, this would be an API call
    const user = {
      id: "user1",
      name: type === "admin" ? "Admin User" : "John Doe",
      email,
      phone: "+91 9876543210",
      type,
    }

    // Store user in localStorage for persistence
    localStorage.setItem("janseva-user", JSON.stringify(user))

    // Redirect based on user type
    if (type === "admin") {
      router.push("/admin")
    } else {
      router.push("/dashboard")
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentView("auth")
  }

  // Form Functions
  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleEligibilityCheck = () => {
    const eligible = schemes.filter((scheme) => {
      if (
        formData.occupation.toLowerCase().includes("farm") ||
        formData.occupation.toLowerCase().includes("agriculture")
      ) {
        return scheme.eligibility.includes("farmer") || scheme.eligibility.includes("agriculture")
      }
      if (formData.income === "below-2-lakh") {
        return scheme.eligibility.includes("low-income") || scheme.eligibility.includes("below-poverty")
      }
      return true
    })
    setEligibleSchemes(eligible)
    setCurrentView("results")
  }

  const handleSchemeApplication = (scheme: Scheme) => {
    setSelectedScheme(scheme)
    setCurrentView("application")
    setCurrentFormStep(1)
  }

  const submitApplication = () => {
    const newApplication: Application = {
      id: `APP${Date.now()}`,
      userId: currentUser?.id || "",
      schemeId: selectedScheme?.id || "",
      schemeName: selectedScheme?.name || "",
      status: "pending",
      submittedAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      formData,
    }

    setApplications((prev) => [...prev, newApplication])

    // Mock notification
    alert(
      `Application submitted successfully! Your application ID is ${newApplication.id}. You will receive SMS/Email confirmation shortly.`,
    )

    setCurrentView("home")
  }

  // Admin Functions
  const addNewScheme = (newScheme: Partial<Scheme>) => {
    if (newScheme.name && newScheme.description) {
      const scheme: Scheme = {
        id: Date.now().toString(),
        name: newScheme.name,
        description: newScheme.description,
        category: newScheme.category || "General",
        eligibility: newScheme.eligibility || [],
        documents: newScheme.documents || [],
        benefits: newScheme.benefits || "",
        applicationDeadline: newScheme.applicationDeadline || "",
        isActive: true,
      }
      setSchemes((prev) => [...prev, scheme])
    }
  }

  const toggleSchemeStatus = (schemeId: string) => {
    setSchemes((prev) =>
      prev.map((scheme) => (scheme.id === schemeId ? { ...scheme, isActive: !scheme.isActive } : scheme)),
    )
  }

  // Application Form Navigation
  const handleNextStep = () => {
    setCurrentFormStep(Math.min(3, currentFormStep + 1))
  }

  const handlePrevStep = () => {
    setCurrentFormStep(Math.max(1, currentFormStep - 1))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-green-600">Loading JanSeva...</p>
        </div>
      </div>
    )
  }

  // Main Render
  if (currentView === "auth") {
    return <AuthPage onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header
        language={language}
        setLanguage={setLanguage}
        isOnline={isOnline}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {!isOnline && (
          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <WifiOff className="h-4 w-4" />
            <AlertDescription>
              You're currently offline. Your data will be saved and submitted when you're back online.
            </AlertDescription>
          </Alert>
        )}

        {currentView === "home" && <HomePage onNavigate={setCurrentView} />}

        {currentView === "form" && (
          <FormPage formData={formData} onUpdateFormData={updateFormData} onSubmit={handleEligibilityCheck} />
        )}

        {currentView === "results" && (
          <ResultsPage
            eligibleSchemes={eligibleSchemes}
            onApplyScheme={handleSchemeApplication}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === "application" && (
          <ApplicationPage
            selectedScheme={selectedScheme}
            formData={formData}
            currentFormStep={currentFormStep}
            onUpdateFormData={updateFormData}
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
            onSubmit={submitApplication}
          />
        )}

        {currentView === "status" && <StatusPage applications={applications} />}

        {currentView === "admin" && (
          <AdminDashboard
            schemes={schemes}
            applications={applications}
            onAddScheme={addNewScheme}
            onToggleSchemeStatus={toggleSchemeStatus}
            onNavigate={setCurrentView}
          />
        )}
      </main>

      {/* Bottom Section */}
      {currentView !== "admin" && (
        <div className="bg-white border-t border-green-100 mt-16">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-orange-600">Digital Bharat</span> Initiative
                </p>
                <p className="text-xs text-gray-500">Empowering Citizens Through Technology</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
