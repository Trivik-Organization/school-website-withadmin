import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { inquiries } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required" },
        { status: 400 }
      );
    }

    const [newInquiry] = await db
      .insert(inquiries)
      .values({
        name,
        email,
        subject,
        message,
        isRead: false,
      })
      .returning();

    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch (error) {
    console.error("Inquiries POST error:", error);
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Inquiries GET error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, isRead } = body;

    if (id === undefined || isRead === undefined) {
      return NextResponse.json({ error: "ID and isRead parameters are required" }, { status: 400 });
    }

    const [updatedInquiry] = await db
      .update(inquiries)
      .set({ isRead: !!isRead })
      .where(eq(inquiries.id, id))
      .returning();

    if (!updatedInquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry: updatedInquiry });
  } catch (error) {
    console.error("Inquiries PATCH error:", error);
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idStr = searchParams.get("id");

    if (!idStr) {
      return NextResponse.json({ error: "Inquiry ID is required" }, { status: 400 });
    }

    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid inquiry ID" }, { status: 400 });
    }

    const [deletedInquiry] = await db.delete(inquiries).where(eq(inquiries.id, id)).returning();

    if (!deletedInquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully",
      inquiry: deletedInquiry,
    });
  } catch (error) {
    console.error("Inquiries DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
