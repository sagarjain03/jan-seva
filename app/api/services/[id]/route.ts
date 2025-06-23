// isme alag alag request bnegi 

// GET - service id k according mil jayegi , ye sb access kr skte h 

// PUT - ye bhi admin k lie h services update krne k lie
// DELETE - ye bhi sirf admin k lie h services delete krne k lie
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db/dbConfig";
import Scheme from "@/models/schemeModel";

connectDB();

// GET - Get scheme by ID (public)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const scheme = await Scheme.findById(id);

    if (!scheme) {
      return NextResponse.json({ error: "Scheme not found" }, { status: 404 });
    }

    return NextResponse.json({ scheme }, { status: 200 });
  } catch (error) {
    console.error("Error fetching scheme by id:", error);
    return NextResponse.json({ error: "Failed to fetch scheme" }, { status: 500 });
  }
}



// PUT - Update scheme by ID (admin only)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();

    const updatedScheme = await Scheme.findByIdAndUpdate(id, body, { new: true });

    if (!updatedScheme) {
      return NextResponse.json({ error: "Scheme not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Scheme updated successfully", scheme: updatedScheme }, { status: 200 });
  } catch (error) {
    console.error("Error updating scheme:", error);
    return NextResponse.json({ error: "Failed to update scheme" }, { status: 500 });
  }
}

// DELETE - Delete scheme by ID (admin only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const deletedScheme = await Scheme.findByIdAndDelete(id);

    if (!deletedScheme) {
      return NextResponse.json({ error: "Scheme not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Scheme deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting scheme:", error);
    return NextResponse.json({ error: "Failed to delete scheme" }, { status: 500 });
  }
}