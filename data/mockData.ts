import type { Scheme, Application, FormData } from "@/types"

export const mockSchemes: Scheme[] = [
  {
    id: "1",
    name: "PM Kisan Samman Nidhi",
    description: "Direct income support of ₹6,000 per year to small and marginal farmers",
    category: "Agriculture",
    eligibility: ["farmer", "agriculture"],
    documents: ["Aadhaar Card", "Bank Passbook", "Land Records"],
    benefits: "₹6,000 per year in 3 installments",
    applicationDeadline: "31st March 2024",
    isActive: true,
  },
  {
    id: "2",
    name: "Ayushman Bharat",
    description: "Health insurance coverage up to ₹5 lakh per family per year",
    category: "Healthcare",
    eligibility: ["low-income", "below-poverty"],
    documents: ["Aadhaar Card", "Ration Card", "Income Certificate"],
    benefits: "Health insurance up to ₹5 lakh",
    applicationDeadline: "Open",
    isActive: true,
  },
  {
    id: "3",
    name: "Pradhan Mantri Awas Yojana",
    description: "Affordable housing scheme for economically weaker sections",
    category: "Housing",
    eligibility: ["low-income", "no-house"],
    documents: ["Aadhaar Card", "Income Certificate", "Property Documents"],
    benefits: "Subsidy for home construction/purchase",
    applicationDeadline: "31st December 2024",
    isActive: true,
  },
]

export const mockApplications: Application[] = [
  {
    id: "APP001",
    userId: "user1",
    schemeId: "1",
    schemeName: "PM Kisan Samman Nidhi",
    status: "approved",
    submittedAt: "2024-01-15",
    lastUpdated: "2024-01-20",
    formData: {} as FormData,
  },
  {
    id: "APP002",
    userId: "user2",
    schemeId: "2",
    schemeName: "Ayushman Bharat",
    status: "under-review",
    submittedAt: "2024-01-18",
    lastUpdated: "2024-01-18",
    formData: {} as FormData,
  },
]
