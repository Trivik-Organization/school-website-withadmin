import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { gallery } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { unlink } from "fs/promises";
import { join } from "path";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const typeParam = searchParams.get("type"); // 'photo' | 'video'
    const categoryParam = searchParams.get("category");

    const conditions = [];

    if (typeParam) {
      conditions.push(eq(gallery.type, typeParam));
    }

    if (categoryParam) {
      conditions.push(eq(gallery.category, categoryParam));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const data = await db
      .select()
      .from(gallery)
      .where(whereClause)
      .orderBy(desc(gallery.createdAt));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Gallery GET error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery media" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, url, caption, category } = body;

    if (!type || !url) {
      return NextResponse.json({ error: "Type and URL are required" }, { status: 400 });
    }

    if (type !== "photo" && type !== "video") {
      return NextResponse.json({ error: "Invalid type. Must be 'photo' or 'video'" }, { status: 400 });
    }

    const [newMedia] = await db
      .insert(gallery)
      .values({
        type,
        url,
        caption: caption || null,
        category: category || "General",
      })
      .returning();

    return NextResponse.json({ success: true, media: newMedia });
  } catch (error) {
    console.error("Gallery POST error:", error);
    return NextResponse.json({ error: "Failed to add gallery media" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idStr = searchParams.get("id");

    if (!idStr) {
      return NextResponse.json({ error: "Media ID is required" }, { status: 400 });
    }

    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid media ID" }, { status: 400 });
    }

    // Retrieve media details to delete the file from local storage if applicable
    const [mediaItem] = await db.select().from(gallery).where(eq(gallery.id, id));

    if (!mediaItem) {
      return NextResponse.json({ error: "Media item not found" }, { status: 404 });
    }

    // Delete record from database
    await db.delete(gallery).where(eq(gallery.id, id));

    // If local file, delete it from disk
    if (mediaItem.url.startsWith("/uploads/")) {
      const filePath = join(process.cwd(), "public", mediaItem.url);
      try {
        await unlink(filePath);
      } catch (err) {
        console.warn(`Failed to delete local file: ${filePath}`, err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Media deleted successfully",
      media: mediaItem,
    });
  } catch (error) {
    console.error("Gallery DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
  }
}
