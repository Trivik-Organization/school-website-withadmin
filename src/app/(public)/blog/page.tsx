import { db } from "@/db/db";
import { blogs } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import React from "react";

export const revalidate = 0;

export default async function PublicBlogPage() {
  const blogsList = await db
    .select()
    .from(blogs)
    .orderBy(desc(blogs.createdAt));

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>School Blog & News</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Read articles, stories, achievements, and academic insights from our teachers and staff.
      </p>

      {blogsList.length === 0 ? (
        <p>No blog posts published yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          {blogsList.map((blog) => (
            <article
              key={blog.id}
              style={{
                borderBottom: "1px solid #eee",
                paddingBottom: "25px",
              }}
            >
              <h2 style={{ marginBottom: "10px" }}>
                <Link
                  href={`/blog/${blog.id}`}
                  style={{ textDecoration: "none", color: "#0066cc" }}
                >
                  {blog.title}
                </Link>
              </h2>
              <div style={{ fontSize: "0.85rem", color: "#888", marginBottom: "12px" }}>
                Written by: <strong>{blog.author}</strong> | Posted on: {blog.createdAt}
              </div>
              <p style={{ color: "#333", lineHeight: "1.6" }}>
                {blog.content.length > 200
                  ? `${blog.content.substring(0, 200)}...`
                  : blog.content}
              </p>
              <Link
                href={`/blog/${blog.id}`}
                style={{
                  display: "inline-block",
                  color: "#0066cc",
                  fontWeight: "bold",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                }}
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
