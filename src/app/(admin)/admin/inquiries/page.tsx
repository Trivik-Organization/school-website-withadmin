"use client";

import React, { useState, useEffect } from "react";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = () => {
    fetch("/api/inquiries")
      .then((res) => res.json())
      .then((data) => {
        setInquiries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const toggleReadStatus = async (id: number, currentRead: boolean) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: !currentRead }),
      });
      if (res.status === 200) {
        fetchInquiries(); // Refresh
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInquiry = async (id: number) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const res = await fetch(`/api/inquiries?id=${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        fetchInquiries(); // Refresh
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Contact Inquiries</h1>
      <p style={{ color: "#555", marginBottom: "20px" }}>
        Review messages submitted by visitors through the public Contact page.
      </p>

      {loading ? (
        <p>Loading inquiries...</p>
      ) : inquiries.length === 0 ? (
        <p>No inquiries found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "15px",
                backgroundColor: inquiry.isRead ? "#fff" : "#f1f5f9",
                borderLeft: inquiry.isRead ? "1px solid #ddd" : "4px solid #3b82f6",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <strong>From:</strong> {inquiry.name} ({inquiry.email})
                  <br />
                  <strong>Subject:</strong> {inquiry.subject}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#666", textAlign: "right" }}>
                  Posted: {inquiry.createdAt}
                  <br />
                  <span style={{ color: inquiry.isRead ? "green" : "blue", fontWeight: "bold" }}>
                    {inquiry.isRead ? "Read" : "New / Unread"}
                  </span>
                </div>
              </div>

              <div style={{ padding: "10px", backgroundColor: "#fff", border: "1px solid #eee", borderRadius: "4px", margin: "10px 0", whiteSpace: "pre-line", color: "#333" }}>
                {inquiry.message}
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  onClick={() => toggleReadStatus(inquiry.id, inquiry.isRead)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    fontSize: "0.85rem"
                  }}
                >
                  {inquiry.isRead ? "Mark Unread" : "Mark Read"}
                </button>
                <button
                  onClick={() => deleteInquiry(inquiry.id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#b91c1c",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "0.85rem"
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
