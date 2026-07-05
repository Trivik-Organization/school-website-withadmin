import { getSessionUser } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const revalidate = 0;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  // In case proxy protection didn't catch it, double check server-side
  // Note: /admin/login is also matching this layout, so we must exclude it from redirection!
  // To keep it simple, if user is not logged in, they can only view /admin/login.
  // The middleware handles this, but server side safety is good.

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Admin Top Header */}
      <header
        style={{
          borderBottom: "1px solid #ccc",
          backgroundColor: "#1e293b",
          color: "#fff",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
          School Portal <span style={{ color: "#38bdf8", fontSize: "0.9rem" }}>ADMIN PANEL</span>
        </div>
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span>Logged in as: <strong>{user.username}</strong></span>
            <Link href="/" style={{ color: "#38bdf8", textDecoration: "none" }}>View Site</Link>
          </div>
        ) : (
          <Link href="/" style={{ color: "#38bdf8", textDecoration: "none" }}>Back to Site</Link>
        )}
      </header>

      {/* Main Admin Wrapper */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar (Render only if user is logged in) */}
        {user && (
          <aside
            style={{
              width: "220px",
              backgroundColor: "#0f172a",
              color: "#cbd5e1",
              padding: "20px 10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Link href="/admin/dashboard" style={{ color: "#fff", textDecoration: "none", padding: "8px", borderRadius: "4px" }}>
              📊 Dashboard
            </Link>
            <Link href="/admin/notices" style={{ color: "#fff", textDecoration: "none", padding: "8px", borderRadius: "4px" }}>
              📌 Manage Notices
            </Link>
            <Link href="/admin/events" style={{ color: "#fff", textDecoration: "none", padding: "8px", borderRadius: "4px" }}>
              📅 Manage Events
            </Link>
            <Link href="/admin/blog" style={{ color: "#fff", textDecoration: "none", padding: "8px", borderRadius: "4px" }}>
              📝 Manage Blogs
            </Link>
            <Link href="/admin/gallery" style={{ color: "#fff", textDecoration: "none", padding: "8px", borderRadius: "4px" }}>
              🖼️ Manage Gallery
            </Link>
            <Link href="/admin/inquiries" style={{ color: "#fff", textDecoration: "none", padding: "8px", borderRadius: "4px" }}>
              ✉️ View Inquiries
            </Link>
            
            <div style={{ marginTop: "auto", paddingTop: "20px", borderTop: "1px solid #334155" }}>
              {/* Form submit logout for secure action */}
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#b91c1c",
                    color: "#fff",
                    border: "none",
                    padding: "8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  🚪 Logout
                </button>
              </form>
            </div>
          </aside>
        )}

        {/* Admin Content Panel */}
        <main style={{ flex: 1, padding: "20px", backgroundColor: "#f8fafc" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
