// isme saare services ki list aa jaye aisa kuch kr dio 


import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db/dbConfig";
import Scheme from "@/models/schemeModel";

connectDB();

export async function POST(request: NextRequest) {
  try {
  

    const body = await request.json();
    const {
      name,
      description,
      category,
      eligibility,
      documents,
      benefits,
      applicationDeadline,
      isActive,
    } = body;

    // Basic validation
    if (!name || !description || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newScheme = await Scheme.create({
      name,
      description,
      category,
      eligibility,
      documents,
      benefits,
      applicationDeadline,
      isActive,
    });

    return NextResponse.json(
      { message: "Scheme created successfully", scheme: newScheme },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating scheme:", error);
    return NextResponse.json({ error: "Failed to create scheme" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const schemes = await Scheme.find({});
    return NextResponse.json({ schemes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching schemes:", error);
    return NextResponse.json({ error: "Failed to fetch schemes" }, { status: 500 });
  }
}