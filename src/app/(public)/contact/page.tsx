"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<{ type: "success" | "error" | null; msg: string }>({
    type: null,
    msg: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, msg: "" });

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 200 && data.success) {
        setStatus({
          type: "success",
          msg: "Your inquiry has been submitted successfully! We will get back to you shortly.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({
          type: "error",
          msg: data.error || "Failed to submit inquiry. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        msg: "A network error occurred. Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>Contact Us</h1>
      <p style={{ color: "#666", marginBottom: "25px" }}>
        Have questions about admissions, careers, or school policies? Send us a message!
      </p>

      {status.type && (
        <div
          style={{
            padding: "12px 15px",
            borderRadius: "4px",
            marginBottom: "20px",
            fontWeight: "bold",
            color: status.type === "success" ? "#15803d" : "#b91c1c",
            backgroundColor: status.type === "success" ? "#f0fdf4" : "#fef2f2",
            border: `1px solid ${status.type === "success" ? "#bbf7d0" : "#fecaca"}`,
          }}
        >
          {status.msg}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="name" style={{ fontWeight: "bold" }}>Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "1rem" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="email" style={{ fontWeight: "bold" }}>Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "1rem" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="subject" style={{ fontWeight: "bold" }}>Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "1rem" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="message" style={{ fontWeight: "bold" }}>Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "1rem", fontFamily: "inherit" }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            backgroundColor: "#0066cc",
            color: "#fff",
            padding: "12px",
            borderRadius: "4px",
            border: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: submitting ? "not-allowed" : "pointer",
            marginTop: "10px",
          }}
        >
          {submitting ? "Submitting Inquiry..." : "Submit Inquiry"}
        </button>
      </form>
    </div>
  );
}
