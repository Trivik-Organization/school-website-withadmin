import { db } from "@/db/db";
import { notices } from "@/db/schema";
import { desc } from "drizzle-orm";
import React from "react";

export const revalidate = 0;

export default async function PublicNoticesPage() {
  const noticesList = await db
    .select()
    .from(notices)
    .orderBy(desc(notices.isPinned), desc(notices.createdAt));

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>Official School Notices</h1>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Stay updated with the latest announcements, schedules, and circulars from the administration.
      </p>

      {noticesList.length === 0 ? (
        <p>No notices posted at this time.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {noticesList.map((notice) => (
            <div
              key={notice.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                backgroundColor: notice.isPinned ? "#fffdf3" : "#fff",
                borderColor: notice.isPinned ? "#fcd34d" : "#ddd",
                position: "relative",
              }}
            >
              {notice.isPinned && (
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "15px",
                    backgroundColor: "#fcd34d",
                    color: "#78350f",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                  }}
                >
                  PINNED
                </span>
              )}
              <h2 style={{ marginTop: 0, paddingRight: "70px", fontSize: "1.3rem" }}>
                {notice.title}
              </h2>
              <p style={{ whiteSpace: "pre-line", color: "#333", fontSize: "1rem" }}>
                {notice.content}
              </p>

              {notice.attachmentUrl && (
                <div style={{ marginTop: "15px" }}>
                  <a
                    href={notice.attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      backgroundColor: "#0066cc",
                      color: "#fff",
                      padding: "8px 12px",
                      borderRadius: "4px",
                      textDecoration: "none",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                    }}
                  >
                    📎 Download Attachment
                  </a>
                </div>
              )}

              <div
                style={{
                  marginTop: "15px",
                  fontSize: "0.8rem",
                  color: "#888",
                  borderTop: "1px solid #eee",
                  paddingTop: "8px",
                }}
              >
                Posted on: {notice.createdAt}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
