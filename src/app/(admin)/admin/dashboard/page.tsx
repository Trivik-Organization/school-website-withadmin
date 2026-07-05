import { db } from "@/db/db";
import { notices, events, blogs, inquiries } from "@/db/schema";
import { sql, eq } from "drizzle-orm";
import React from "react";

export const revalidate = 0;

export default async function AdminDashboard() {
  // Query total counts in database
  const [noticesCount] = await db.select({ count: sql<number>`count(*)` }).from(notices);
  const [eventsCount] = await db.select({ count: sql<number>`count(*)` }).from(events);
  const [blogsCount] = await db.select({ count: sql<number>`count(*)` }).from(blogs);
  
  // Total and unread inquiries count
  const [inquiriesCount] = await db.select({ count: sql<number>`count(*)` }).from(inquiries);
  const [unreadInquiriesCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(inquiries)
    .where(eq(inquiries.isRead, false));

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p style={{ color: "#555", marginBottom: "30px" }}>
        Welcome to the administration panel. Here is an overview of the school website content statistics.
      </p>

      {/* Grid of Metric Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        
        {/* Notice Card */}
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "6px", backgroundColor: "#fff" }}>
          <h3 style={{ margin: 0, color: "#475569" }}>School Notices</h3>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "10px 0 5px 0" }}>
            {noticesCount?.count ?? 0}
          </p>
          <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Active circulars & updates</span>
        </div>

        {/* Event Card */}
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "6px", backgroundColor: "#fff" }}>
          <h3 style={{ margin: 0, color: "#475569" }}>School Events</h3>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "10px 0 5px 0" }}>
            {eventsCount?.count ?? 0}
          </p>
          <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Upcoming & past activities</span>
        </div>

        {/* Blog Card */}
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "6px", backgroundColor: "#fff" }}>
          <h3 style={{ margin: 0, color: "#475569" }}>Blog & News Posts</h3>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "10px 0 5px 0" }}>
            {blogsCount?.count ?? 0}
          </p>
          <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Articles & stories published</span>
        </div>

        {/* Inquiry Card */}
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "6px", backgroundColor: "#fff" }}>
          <h3 style={{ margin: 0, color: "#475569" }}>Contact Inquiries</h3>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "10px 0 5px 0" }}>
            {inquiriesCount?.count ?? 0}
          </p>
          <span style={{ fontSize: "0.85rem", color: "#b91c1c", fontWeight: "bold" }}>
            {unreadInquiriesCount?.count ?? 0} Unread
          </span>
        </div>

      </div>

      <div style={{ marginTop: "40px", padding: "20px", backgroundColor: "#f1f5f9", borderRadius: "8px", border: "1px dashed #cbd5e1" }}>
        <h3>Need to edit or update site content?</h3>
        <p>Use the navigation panel on the left to add, edit, or delete items in the database.</p>
      </div>
    </div>
  );
}
