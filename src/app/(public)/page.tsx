import { db } from "@/db/db";
import { notices, events, blogs } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";

export const revalidate = 0; // Disable cache so it updates instantly in dev

export default async function HomePage() {
  // Fetch latest data directly from database on server
  const latestNotices = await db
    .select()
    .from(notices)
    .orderBy(desc(notices.createdAt))
    .limit(3);

  const latestEvents = await db
    .select()
    .from(events)
    .orderBy(desc(events.date))
    .limit(3);

  const latestBlogs = await db
    .select()
    .from(blogs)
    .orderBy(desc(blogs.createdAt))
    .limit(3);

  return (
    <div>
      {/* Hero Section */}
      <section style={{ padding: "40px 20px", backgroundColor: "#f0f4f8", borderRadius: "8px", marginBottom: "30px", textAlign: "center" }}>
        <h1>Welcome to Our School</h1>
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          Providing quality education, fostering innovation, and building leaders of tomorrow.
        </p>
      </section>

      {/* Grid of Sections */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        {/* Notices Section */}
        <section style={{ border: "1px solid #ddd", borderRadius: "6px", padding: "15px" }}>
          <h2>Latest Notices</h2>
          {latestNotices.length === 0 ? (
            <p>No active notices.</p>
          ) : (
            <ul style={{ paddingLeft: "20px" }}>
              {latestNotices.map((notice) => (
                <li key={notice.id} style={{ marginBottom: "10px" }}>
                  <strong>{notice.title}</strong> {notice.isPinned && "📌"}
                  <br />
                  <span style={{ fontSize: "0.85rem", color: "#666" }}>{notice.createdAt}</span>
                </li>
              ))}
            </ul>
          )}
          <Link href="/notices" style={{ display: "inline-block", marginTop: "10px" }}>View All Notices →</Link>
        </section>

        {/* Events Section */}
        <section style={{ border: "1px solid #ddd", borderRadius: "6px", padding: "15px" }}>
          <h2>Upcoming Events</h2>
          {latestEvents.length === 0 ? (
            <p>No upcoming events scheduled.</p>
          ) : (
            <ul style={{ paddingLeft: "20px" }}>
              {latestEvents.map((event) => (
                <li key={event.id} style={{ marginBottom: "10px" }}>
                  <strong>{event.title}</strong>
                  <br />
                  <span style={{ fontSize: "0.85rem", color: "#666" }}>
                    📅 {event.date} | 📍 {event.location}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link href="/events" style={{ display: "inline-block", marginTop: "10px" }}>View All Events →</Link>
        </section>

        {/* Blogs Section */}
        <section style={{ border: "1px solid #ddd", borderRadius: "6px", padding: "15px" }}>
          <h2>Recent Blog Posts & News</h2>
          {latestBlogs.length === 0 ? (
            <p>No blog posts published yet.</p>
          ) : (
            <ul style={{ paddingLeft: "20px" }}>
              {latestBlogs.map((blog) => (
                <li key={blog.id} style={{ marginBottom: "10px" }}>
                  <Link href={`/blog/${blog.id}`} style={{ fontWeight: "bold", textDecoration: "none", color: "#0066cc" }}>
                    {blog.title}
                  </Link>
                  <br />
                  <span style={{ fontSize: "0.85rem", color: "#666" }}>By {blog.author}</span>
                </li>
              ))}
            </ul>
          )}
          <Link href="/blog" style={{ display: "inline-block", marginTop: "10px" }}>View All Blogs →</Link>
        </section>
      </div>
    </div>
  );
}
