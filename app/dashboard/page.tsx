"use client"

import { useRouter } from "next/navigation"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"
import HomePage from "@/components/HomePage"

export default function DashboardPage() {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <AuthenticatedLayout>
      <HomePage onNavigate={handleNavigate} />
    </AuthenticatedLayout>
  )
}
