export interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "user" | "admin";
}

export interface FormData {
  age: string;
  gender: string;
  income: string;
  caste: string;
  location: string;
  occupation: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  category: string;
  eligibility: string[];
  documents: string[];
  benefits: string;
  applicationDeadline: string;
  isActive: boolean;
}

export interface Application {
  id: string;
  userId: string;
  schemeId: string;
  schemeName: string;
  status: "pending" | "under-review" | "approved" | "rejected";
  submittedAt: string;
  lastUpdated: string;
  formData: FormData;
}


export type AuthMode = "login" | "signup"
export type UserTypeOption = "user" | "admin"
export type Language = "en" | "hi"


export interface DecodedToken {
  id: string;
  username: string;
  email: string;
 
}