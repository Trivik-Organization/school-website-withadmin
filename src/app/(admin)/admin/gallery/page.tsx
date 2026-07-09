"use client";

import { useEffect, useState } from "react";

type GalleryItem = {
  id: number;
  type: string;
  url: string;
  caption: string | null;
  category: string;
  createdAt: string;
};

const emptyForm = { type: "photo", url: "", caption: "", category: "General" };

export default function GalleryManagerPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadItems() {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : data.gallery || data.items || []);
  }

  useEffect(() => {
    loadItems();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setFile(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    let finalUrl = form.url;

    if (form.type === "photo" && file) {
      const uploadData = new FormData();
      uploadData.append("file", file);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData });
      const uploadResult = await uploadRes.json();
      finalUrl = uploadResult.url;
    }

    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: form.type,
        url: finalUrl,
        caption: form.caption,
        category: form.category,
      }),
    });

    resetForm();
    await loadItems();
    setLoading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this media item?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    await loadItems();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1e3a5f] mb-8">Manage Gallery</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm h-fit">
          <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4">Add Media</h2>
          <div className="space-y-3">
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="photo">Photo</option>
              <option value="video">Video</option>
            </select>

            {form.type === "photo" ? (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            ) : (
              <input
                type="text"
                placeholder="Video URL (YouTube etc.)"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                required
              />
            )}

            <input
              type="text"
              placeholder="Caption"
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="General">General</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Sports">Sports</option>
              <option value="Events">Events</option>
            </select>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#1e3a5f] text-white px-4 py-2 rounded-md text-sm hover:bg-[#16304d] transition-colors disabled:opacity-50 w-full"
            >
              {loading ? "Uploading..." : "Add Media"}
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {item.type === "photo" ? (
                <img src={item.url} alt={item.caption || ""} className="w-full h-40 object-cover" />
              ) : (
                <video src={item.url} controls className="w-full h-40 object-cover" />
              )}
              <div className="p-3">
                <p className="text-sm text-gray-700">{item.caption}</p>
                <p className="text-xs text-gray-400">{item.category}</p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline text-xs mt-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-gray-400 text-sm col-span-2">No media uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
