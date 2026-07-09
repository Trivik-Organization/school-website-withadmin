"use client";

import { useEffect, useState } from "react";

type Notice = {
  id: number;
  title: string;
  content: string;
  attachmentUrl: string | null;
  isPinned: boolean;
  createdAt: string;
};

const emptyForm = { id: null as number | null, title: "", content: "", attachmentUrl: "", isPinned: false };

export default function NoticesManagerPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  async function loadNotices() {
    const res = await fetch("/api/notices");
    const data = await res.json();
    setNotices(data);
  }

  useEffect(() => {
    loadNotices();
  }, []);

  function startEdit(notice: Notice) {
    setForm({
      id: notice.id,
      title: notice.title,
      content: notice.content,
      attachmentUrl: notice.attachmentUrl || "",
      isPinned: notice.isPinned,
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
      content: form.content,
      attachmentUrl: form.attachmentUrl || null,
      isPinned: form.isPinned,
    };

    if (form.id) {
      await fetch(`/api/notices/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    resetForm();
    await loadNotices();
    setLoading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this notice?")) return;
    await fetch(`/api/notices/${id}`, { method: "DELETE" });
    await loadNotices();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1e3a5f] mb-8">Manage Notices</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm h-fit">
          <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4">
            {form.id ? "Edit Notice" : "Add Notice"}
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
              placeholder="Content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-24"
              required
            />
            <input
              type="text"
              placeholder="Attachment URL (optional)"
              value={form.attachmentUrl}
              onChange={(e) => setForm({ ...form, attachmentUrl: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.isPinned}
                onChange={(e) => setForm({ ...form, isPinned: e.target.checked })}
              />
              Pin this notice
            </label>

            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#1e3a5f] text-white px-4 py-2 rounded-md text-sm hover:bg-[#16304d] transition-colors disabled:opacity-50"
              >
                {form.id ? "Update" : "Add"} Notice
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
                <th className="px-4 py-3">Pinned</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice) => (
                <tr key={notice.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">{notice.title}</td>
                  <td className="px-4 py-3">{notice.isPinned ? "📌 Yes" : "No"}</td>
                  <td className="px-4 py-3 text-gray-500">{notice.createdAt}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => startEdit(notice)}
                      className="text-[#1e3a5f] hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(notice.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {notices.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                    No notices yet.
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
