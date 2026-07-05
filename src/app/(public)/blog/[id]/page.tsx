import { db } from "@/db/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export const revalidate = 0;

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);

  if (isNaN(id)) {
    return notFound();
  }

  // Fetch blog from database
  const [blog] = await db.select().from(blogs).where(eq(blogs.id, id));

  if (!blog) {
    return notFound();
  }

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", lineHeight: "1.7" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/blog" style={{ textDecoration: "none", color: "#666" }}>
          ← Back to Blog list
        </Link>
      </div>

      <article>
        <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>{blog.title}</h1>
        <div
          style={{
            fontSize: "0.9rem",
            color: "#666",
            borderBottom: "1px solid #eee",
            paddingBottom: "15px",
            marginBottom: "25px",
          }}
        >
          By <strong>{blog.author}</strong> | Published on {blog.createdAt}
        </div>

        {blog.imageUrl && (
          <div style={{ marginBottom: "25px", textAlign: "center" }}>
            <img
              src={blog.imageUrl}
              alt={blog.title}
              style={{ maxWidth: "100%", borderRadius: "8px", maxHeight: "400px" }}
            />
          </div>
        )}

        <div style={{ whiteSpace: "pre-line", fontSize: "1.1rem", color: "#222" }}>
          {blog.content}
        </div>
      </article>
    </div>
  );
}
