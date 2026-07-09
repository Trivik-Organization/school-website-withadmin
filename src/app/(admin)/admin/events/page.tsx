"use client";

import { useEffect, useState } from "react";

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string | null;
  createdAt: string;
};

const emptyForm = { id: null as number | null, title: "", description: "", date: "", location: "", imageUrl: "" };

export default function EventsManagerPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  async function loadEvents() {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function startEdit(event: Event) {
    setForm({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      imageUrl: event.imageUrl || "",
    });
  }

  function resetForm() {
    setForm(emptyForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: form.title,
      description: form.description,
      date: form.date,
      location: form.location,
      imageUrl: form.imageUrl || null,
    };

    if (form.id) {
      await fetch(`/api/events/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    resetForm();
    await loadEvents();
    setLoading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    await loadEvents();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1e3a5f] mb-8">Manage Events</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm h-fit">
          <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4">
            {form.id ? "Edit Event" : "Add Event"}
          </h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              required
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-24"
              required
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              required
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />

            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#1e3a5f] text-white px-4 py-2 rounded-md text-sm hover:bg-[#16304d] transition-colors disabled:opacity-50"
              >
                {form.id ? "Update" : "Add"} Event
              </button>
              {form.id && (
                <button
                  onClick={resetForm}
                  className="px-4 py-2 rounded-md text-sm border border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#f8f9fa] text-left text-gray-600">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">{event.title}</td>
                  <td className="px-4 py-3 text-gray-500">{event.date}</td>
                  <td className="px-4 py-3 text-gray-500">{event.location}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => startEdit(event)}
                      className="text-[#1e3a5f] hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                    No events yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
