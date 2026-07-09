"use client";

import { useEffect, useState } from "react";

type GalleryItem = {
  id: number;
  type: string;
  url: string;
  caption: string | null;
  category: string;
};

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const categories = ["all", ...Array.from(new Set(items.map((i) => i.category)))];

  const filtered = items.filter((item) => {
    const typeMatch = typeFilter === "all" || item.type === typeFilter;
    const categoryMatch = categoryFilter === "all" || item.category === categoryFilter;
    return typeMatch && categoryMatch;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8 border-b-4 border-[#d4a017] inline-block pb-2">
        Gallery
      </h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="all">All Types</option>
          <option value="photo">Photos</option>
          <option value="video">Videos</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "All Categories" : c}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No media found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {item.type === "photo" ? (
                <img src={item.url} alt={item.caption || ""} className="w-full h-48 object-cover" />
              ) : (
                <video src={item.url} controls className="w-full h-48 object-cover" />
              )}
              <div className="p-3">
                <p className="text-sm text-gray-700">{item.caption}</p>
                <p className="text-xs text-gray-400 mt-1">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
