"use client";

import { useEffect, useState } from "react";

type Inquiry = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export default function InquiriesManagerPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  async function loadInquiries() {
    const res = await fetch("/api/inquiries");
    const data = await res.json();
    setInquiries(Array.isArray(data) ? data : data.inquiries || []);
  }

  useEffect(() => {
    loadInquiries();
  }, []);

  async function toggleRead(id: number, current: boolean) {
    await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: !current }),
    });
    await loadInquiries();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this inquiry?")) return;
    await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
    await loadInquiries();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1e3a5f] mb-8">Contact Inquiries</h1>

      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className={`bg-white border rounded-lg p-5 shadow-sm ${
              inquiry.isRead ? "border-gray-200" : "border-[#d4a017]"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-gray-800">
                  {inquiry.subject}{" "}
                  {!inquiry.isRead && (
                    <span className="ml-2 text-xs bg-[#d4a017] text-white px-2 py-0.5 rounded-full">New</span>
                  )}
                </h2>
                <p className="text-sm text-gray-500">{inquiry.name} • {inquiry.email}</p>
                <p className="text-sm text-gray-700 mt-2">{inquiry.message}</p>
                <p className="text-xs text-gray-400 mt-2">{inquiry.createdAt}</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => toggleRead(inquiry.id, inquiry.isRead)}
                  className="text-sm text-[#1e3a5f] hover:underline whitespace-nowrap"
                >
                  Mark as {inquiry.isRead ? "Unread" : "Read"}
                </button>
                <button
                  onClick={() => handleDelete(inquiry.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {inquiries.length === 0 && (
          <p className="text-gray-400 text-sm">No inquiries yet.</p>
        )}
      </div>
    </div>
  );
}
