import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { blogs } from "@/db/schema";
import { eq, like, or, desc, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    let whereClause = undefined;
    if (search) {
      whereClause = or(like(blogs.title, `%${search}%`), like(blogs.content, `%${search}%`));
    }

    const data = await db
      .select()
      .from(blogs)
      .where(whereClause)
      .orderBy(desc(blogs.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination metadata
    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(blogs)
      .where(whereClause);
    const total = countResult?.count ?? 0;

    return NextResponse.json({
      blogs: data,
      pagination: {
        total,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error("Blogs GET error:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, author, imageUrl } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const [newBlog] = await db
      .insert(blogs)
      .values({
        title,
        content,
        author: author || "Admin",
        imageUrl: imageUrl || null,
      })
      .returning();

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error("Blogs POST error:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, content, author, imageUrl } = body;

    if (!id || !title || !content) {
      return NextResponse.json({ error: "ID, title, and content are required" }, { status: 400 });
    }

    const [updatedBlog] = await db
      .update(blogs)
      .set({
        title,
        content,
        author: author !== undefined ? author : "Admin",
        imageUrl: imageUrl !== undefined ? imageUrl : null,
      })
      .where(eq(blogs.id, id))
      .returning();

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error("Blogs PUT error:", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idStr = searchParams.get("id");

    if (!idStr) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const [deletedBlog] = await db.delete(blogs).where(eq(blogs.id, id)).returning();

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
      blog: deletedBlog,
    });
  } catch (error) {
    console.error("Blogs DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
