"use client";

import React, { useState, useEffect } from "react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string | null;
  createdAt: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [form, setForm] = useState({
    id: null as number | null,
    title: "",
    description: "",
    date: "",
    location: "",
    imageUrl: "",
  });

  const fetchEvents = () => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (event: Event) => {
    setForm({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      imageUrl: event.imageUrl || "",
    });
  };

  const handleReset = () => {
    setForm({
      id: null,
      title: "",
      description: "",
      date: "",
      location: "",
      imageUrl: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = form.id !== null;
    const url = "/api/events";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.status === 200) {
        fetchEvents();
        handleReset();
      } else {
        alert(data.error || "Failed to save event.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error occurred.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`/api/events?id=${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        fetchEvents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {/* List Panel */}
      <div style={{ flex: 2, minWidth: "300px" }}>
        <h1>Manage Events</h1>
        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", border: "1px solid #ddd" }}>
            <thead>
              <tr style={{ backgroundColor: "#f1f5f9", textAlign: "left" }}>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Title</th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Date</th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Location</th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px" }}><strong>{event.title}</strong></td>
                  <td style={{ padding: "10px", fontSize: "0.9rem" }}>{event.date}</td>
                  <td style={{ padding: "10px", fontSize: "0.9rem" }}>{event.location}</td>
                  <td style={{ padding: "10px", display: "flex", gap: "5px" }}>
                    <button
                      onClick={() => handleEdit(event)}
                      style={{ padding: "4px 8px", backgroundColor: "#f59e0b", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
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
        <h2>{form.id ? "Edit Event" : "Add Event"}</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label htmlFor="title" style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Event Title</label>
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
            <label htmlFor="description" style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Description</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              value={form.description}
              onChange={handleChange}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", fontFamily: "inherit" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label htmlFor="date" style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Date</label>
            <input
              type="date"
              id="date"
              name="date"
              required
              value={form.date}
              onChange={handleChange}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label htmlFor="location" style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Location</label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={form.location}
              onChange={handleChange}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
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
              Save Event
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
