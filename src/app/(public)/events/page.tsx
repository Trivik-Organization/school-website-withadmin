import { db } from "@/db/db";
import { events } from "@/db/schema";
import { gte, lt, desc, asc } from "drizzle-orm";
import React from "react";

export const revalidate = 0;

export default async function PublicEventsPage() {
  const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // Fetch upcoming events
  const upcomingEventsList = await db
    .select()
    .from(events)
    .where(gte(events.date, todayStr))
    .orderBy(asc(events.date));

  // Fetch past events
  const pastEventsList = await db
    .select()
    .from(events)
    .where(lt(events.date, todayStr))
    .orderBy(desc(events.date));

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>School Events & Activities</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Discover our upcoming programs and look back at past school achievements.
      </p>

      {/* Upcoming Events */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ borderBottom: "2px solid #0066cc", paddingBottom: "8px", color: "#0066cc" }}>
          📅 Upcoming Events
        </h2>
        {upcomingEventsList.length === 0 ? (
          <p>No upcoming events scheduled at the moment.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {upcomingEventsList.map((event) => (
              <div
                key={event.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "15px",
                  backgroundColor: "#fff",
                }}
              >
                <h3 style={{ marginTop: 0 }}>{event.title}</h3>
                <p style={{ color: "#333" }}>{event.description}</p>
                <div style={{ fontSize: "0.85rem", color: "#555", fontWeight: "bold" }}>
                  📅 Date: {event.date} | 📍 Location: {event.location}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Past Events */}
      <section>
        <h2 style={{ borderBottom: "2px solid #666", paddingBottom: "8px", color: "#666" }}>
          🕰️ Past Events & Highlights
        </h2>
        {pastEventsList.length === 0 ? (
          <p>No past events recorded.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {pastEventsList.map((event) => (
              <div
                key={event.id}
                style={{
                  border: "1px solid #eee",
                  borderRadius: "6px",
                  padding: "15px",
                  backgroundColor: "#fafafa",
                }}
              >
                <h3 style={{ marginTop: 0, color: "#555" }}>{event.title}</h3>
                <p style={{ color: "#666" }}>{event.description}</p>
                <div style={{ fontSize: "0.85rem", color: "#777" }}>
                  📅 Date: {event.date} | 📍 Location: {event.location}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
