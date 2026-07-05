import Link from "next/link";
import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Basic Navigation Header */}
      <header style={{ borderBottom: "1px solid #ccc", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          <Link href="/" style={{ textDecoration: "none", color: "#333" }}>School Portal</Link>
        </div>
        <nav style={{ display: "flex", gap: "15px" }}>
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/notices">Notices</Link>
          <Link href="/events">Events</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/admin/login" style={{ marginLeft: "15px", color: "blue" }}>Admin Login</Link>
        </nav>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "20px" }}>
        {children}
      </main>

      {/* Basic Footer */}
      <footer style={{ borderTop: "1px solid #ccc", padding: "15px", textAlign: "center", fontSize: "0.9rem", color: "#666" }}>
        © {new Date().getFullYear()} School Portal. All rights reserved.
      </footer>
    </div>
  );
}
