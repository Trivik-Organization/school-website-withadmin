import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { notices } from "@/db/schema";
import { eq, like, and, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pinnedParam = searchParams.get("pinned");
    const searchParam = searchParams.get("search");

    const conditions = [];

    if (pinnedParam !== null) {
      const isPinned = pinnedParam === "true";
      conditions.push(eq(notices.isPinned, isPinned));
    }

    if (searchParam) {
      conditions.push(like(notices.title, `%${searchParam}%`));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const data = await db
      .select()
      .from(notices)
      .where(whereClause)
      .orderBy(desc(notices.isPinned), desc(notices.createdAt));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Notices GET error:", error);
    return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, attachmentUrl, isPinned } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const [newNotice] = await db
      .insert(notices)
      .values({
        title,
        content,
        attachmentUrl: attachmentUrl || null,
        isPinned: !!isPinned,
      })
      .returning();

    return NextResponse.json({ success: true, notice: newNotice });
  } catch (error) {
    console.error("Notices POST error:", error);
    return NextResponse.json({ error: "Failed to create notice" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, content, attachmentUrl, isPinned } = body;

    if (!id || !title || !content) {
      return NextResponse.json({ error: "ID, title and content are required" }, { status: 400 });
    }

    const [updatedNotice] = await db
      .update(notices)
      .set({
        title,
        content,
        attachmentUrl: attachmentUrl !== undefined ? attachmentUrl : null,
        isPinned: !!isPinned,
      })
      .where(eq(notices.id, id))
      .returning();

    if (!updatedNotice) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, notice: updatedNotice });
  } catch (error) {
    console.error("Notices PUT error:", error);
    return NextResponse.json({ error: "Failed to update notice" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idStr = searchParams.get("id");

    if (!idStr) {
      return NextResponse.json({ error: "Notice ID is required" }, { status: 400 });
    }

    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid notice ID" }, { status: 400 });
    }

    const [deletedNotice] = await db
      .delete(notices)
      .where(eq(notices.id, id))
      .returning();

    if (!deletedNotice) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Notice deleted successfully",
      notice: deletedNotice,
    });
  } catch (error) {
    console.error("Notices DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete notice" }, { status: 500 });
  }
}
