import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { events } from "@/db/schema";
import { eq, gte, lt, asc, desc, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter"); // 'upcoming' | 'past' | null
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10);
    const offset = (page - 1) * limit;

    const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    let whereClause = undefined;
    let order = desc(events.date);

    if (filter === "upcoming") {
      whereClause = gte(events.date, todayStr);
      order = asc(events.date); // Soonest upcoming events first
    } else if (filter === "past") {
      whereClause = lt(events.date, todayStr);
      order = desc(events.date); // Most recent past events first
    }

    const data = await db
      .select()
      .from(events)
      .where(whereClause)
      .orderBy(order)
      .limit(limit)
      .offset(offset);

    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(events)
      .where(whereClause);
    const total = countResult?.count ?? 0;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      }
    });
  } catch (error) {
    console.error("Events GET error:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, date, location, imageUrl } = body;

    if (!title || !description || !date || !location) {
      return NextResponse.json(
        { error: "Title, description, date, and location are required" },
        { status: 400 }
      );
    }

    const [newEvent] = await db
      .insert(events)
      .values({
        title,
        description,
        date,
        location,
        imageUrl: imageUrl || null,
      })
      .returning();

    return NextResponse.json({ success: true, event: newEvent });
  } catch (error) {
    console.error("Events POST error:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, date, location, imageUrl } = body;

    if (!id || !title || !description || !date || !location) {
      return NextResponse.json(
        { error: "ID, title, description, date, and location are required" },
        { status: 400 }
      );
    }

    const [updatedEvent] = await db
      .update(events)
      .set({
        title,
        description,
        date,
        location,
        imageUrl: imageUrl !== undefined ? imageUrl : null,
      })
      .where(eq(events.id, id))
      .returning();

    if (!updatedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, event: updatedEvent });
  } catch (error) {
    console.error("Events PUT error:", error);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idStr = searchParams.get("id");

    if (!idStr) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    }

    const [deletedEvent] = await db.delete(events).where(eq(events.id, id)).returning();

    if (!deletedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully",
      event: deletedEvent,
    });
  } catch (error) {
    console.error("Events DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
