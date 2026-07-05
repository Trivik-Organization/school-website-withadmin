"use client";

import React, { useState, useEffect } from "react";

interface Notice {
  id: number;
  title: string;
  content: string;
  attachmentUrl: string | null;
  isPinned: boolean;
  createdAt: string;
}

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [form, setForm] = useState({
    id: null as number | null,
    title: "",
    content: "",
    attachmentUrl: "",
    isPinned: false,
  });

  const fetchNotices = () => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => {
        setNotices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleEdit = (notice: Notice) => {
    setForm({
      id: notice.id,
      title: notice.title,
      content: notice.content,
      attachmentUrl: notice.attachmentUrl || "",
      isPinned: notice.isPinned,
    });
  };

  const handleReset = () => {
    setForm({
      id: null,
      title: "",
      content: "",
      attachmentUrl: "",
      isPinned: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = form.id !== null;
    const url = "/api/notices";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.status === 200) {
        fetchNotices();
        handleReset();
      } else {
        alert(data.error || "Failed to save notice.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error occurred.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;

    try {
      const res = await fetch(`/api/notices?id=${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        fetchNotices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {/* List Panel */}
      <div style={{ flex: 2, minWidth: "300px" }}>
        <h1>Manage Notices</h1>
        {loading ? (
          <p>Loading notices...</p>
        ) : notices.length === 0 ? (
          <p>No notices found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", border: "1px solid #ddd" }}>
            <thead>
              <tr style={{ backgroundColor: "#f1f5f9", textAlign: "left" }}>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Title</th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Pinned</th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Created At</th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice) => (
                <tr key={notice.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px" }}><strong>{notice.title}</strong></td>
                  <td style={{ padding: "10px" }}>{notice.isPinned ? "📌 Yes" : "No"}</td>
                  <td style={{ padding: "10px", fontSize: "0.85rem", color: "#666" }}>{notice.createdAt}</td>
                  <td style={{ padding: "10px", display: "flex", gap: "5px" }}>
                    <button
                      onClick={() => handleEdit(notice)}
                      style={{ padding: "4px 8px", backgroundColor: "#f59e0b", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(notice.id)}
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
        <h2>{form.id ? "Edit Notice" : "Add Notice"}</h2>
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
            <label htmlFor="content" style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Content</label>
            <textarea
              id="content"
              name="content"
              rows={4}
              required
              value={form.content}
              onChange={handleChange}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", fontFamily: "inherit" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label htmlFor="attachmentUrl" style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Attachment URL (Optional)</label>
            <input
              type="text"
              id="attachmentUrl"
              name="attachmentUrl"
              value={form.attachmentUrl}
              onChange={handleChange}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "5px 0" }}>
            <input
              type="checkbox"
              id="isPinned"
              name="isPinned"
              checked={form.isPinned}
              onChange={handleChange}
              style={{ cursor: "pointer" }}
            />
            <label htmlFor="isPinned" style={{ fontWeight: "bold", fontSize: "0.9rem", cursor: "pointer" }}>Pin to top</label>
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
              Save Notice
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
