// isme checking wala kaam hoga ki bnda kaun kaun si scheme k lie eligible h aur kaunsi k lie nhi hai 

// app/api/eligibility/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db/dbConfig"; // your db connection
import Scheme from "@/models/schemeModel"; // your Mongoose model

export async function POST(req: NextRequest) {
  try {
    console.log("[ELIGIBILITY API] Connecting to DB...");
    await connectDB(); // important

    
    const formData = await req.json();
    console.log("[User Input]", formData);
    const {
      age,
      gender,
      income,
      caste,
      location,
      occupation
    } = formData;

    // Convert values for safe comparison
    const numericAge = parseInt(age);
    const normalizedIncome = income?.toLowerCase();
    const normalizedCaste = caste?.toLowerCase();
    const normalizedGender = gender?.toLowerCase();
    const normalizedOccupation = occupation?.toLowerCase();
    const normalizedLocation = location?.toLowerCase();

    // Fetch all schemes from DB
    const allSchemes = await Scheme.find();
    console.log("[Fetched Schemes]", allSchemes.length);

    // Eligibility filtering logic
    const eligibleSchemes = allSchemes.filter((scheme) => {
      const rules = scheme.eligibility || {};

      // Check each condition only if defined in the DB
      if (rules.minAge && numericAge < rules.minAge) return false;
      if (rules.maxAge && numericAge > rules.maxAge) return false;
      if (rules.gender && rules.gender !== normalizedGender) return false;
      if (rules.income && rules.income !== normalizedIncome) return false;
      if (rules.caste && rules.caste !== normalizedCaste) return false;
      if (rules.occupation && rules.occupation !== normalizedOccupation) return false;
      if (rules.location && !normalizedLocation.includes(rules.location)) return false;

      return true; // Passed all checks
    });

    

    return NextResponse.json(eligibleSchemes);
  } catch (error) {
    console.error("[ELIGIBILITY_API_ERROR]", error);
    return NextResponse.json({ message: "Something went wrong while checking eligibility." }, { status: 500 });
  }
}
