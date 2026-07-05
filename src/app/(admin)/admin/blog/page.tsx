"use client";

import React, { useState, useEffect } from "react";

interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  imageUrl: string | null;
  createdAt: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [form, setForm] = useState({
    id: null as number | null,
    title: "",
    content: "",
    author: "",
    imageUrl: "",
  });

  const fetchBlogs = () => {
    fetch("/api/blogs?limit=50")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (blog: Blog) => {
    setForm({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      author: blog.author,
      imageUrl: blog.imageUrl || "",
    });
  };

  const handleReset = () => {
    setForm({
      id: null,
      title: "",
      content: "",
      author: "",
      imageUrl: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = form.id !== null;
    const url = "/api/blogs";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.status === 200) {
        fetchBlogs();
        handleReset();
      } else {
        alert(data.error || "Failed to save blog post.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error occurred.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const res = await fetch(`/api/blogs?id=${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        fetchBlogs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {/* List Panel */}
      <div style={{ flex: 2, minWidth: "300px" }}>
        <h1>Manage Blog & News</h1>
        {loading ? (
          <p>Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p>No blog posts found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", border: "1px solid #ddd" }}>
            <thead>
              <tr style={{ backgroundColor: "#f1f5f9", textAlign: "left" }}>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Title</th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Author</th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Created At</th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px" }}><strong>{blog.title}</strong></td>
                  <td style={{ padding: "10px", fontSize: "0.9rem" }}>{blog.author}</td>
                  <td style={{ padding: "10px", fontSize: "0.85rem", color: "#666" }}>{blog.createdAt}</td>
                  <td style={{ padding: "10px", display: "flex", gap: "5px" }}>
                    <button
                      onClick={() => handleEdit(blog)}
                      style={{ padding: "4px 8px", backgroundColor: "#f59e0b", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      style={{ padding: "4px 8px", backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Editor Form Panel */}
      <div style={{ flex: 1, minWidth: "250px", backgroundColor: "#fff", padding: "20px", border: "1px solid #ddd", borderRadius: "6px", alignSelf: "flex-start" }}>
        <h2>{form.id ? "Edit Post" : "Add Post"}</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label htmlFor="title" style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label htmlFor="author" style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Author</label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="e.g. Principal Miller"
              value={form.author}
              onChange={handleChange}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label htmlFor="content" style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Content</label>
            <textarea
              id="content"
              name="content"
              rows={6}
              required
              value={form.content}
              onChange={handleChange}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", fontFamily: "inherit" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label htmlFor="imageUrl" style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Image URL (Optional)</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "#10b981",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Save Post
            </button>
            {form.id && (
              <button
                type="button"
                onClick={handleReset}
                style={{
                  padding: "10px",
                  backgroundColor: "#6b7280",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
