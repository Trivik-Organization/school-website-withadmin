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

  const categories = [
    "all",
    ...Array.from(new Set(items.map((i) => i.category))),
  ];

  const filtered = items.filter((item) => {
    const typeMatch = typeFilter === "all" || item.type === typeFilter;
    const categoryMatch =
      categoryFilter === "all" || item.category === categoryFilter;
    return typeMatch && categoryMatch;
  });

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] rounded-3xl text-white px-8 py-14 shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">School Gallery</h1>

        <p className="text-blue-100 max-w-2xl leading-7">
          Explore memorable moments, achievements, celebrations and activities
          that showcase the vibrant life of our school community.
        </p>
      </section>

      {/* Filters */}
      <section className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <div className="flex flex-wrap gap-4">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
          >
            <option value="all">📂 All Media</option>
            <option value="photo">📷 Photos</option>
            <option value="video">🎥 Videos</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Categories" : c}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Gallery */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 py-20 text-center">
          <div className="text-6xl mb-4">🖼️</div>

          <h2 className="text-2xl font-bold text-[#1E3A8A]">
            No Media Available
          </h2>

          <p className="text-gray-500 mt-2">Gallery items will appear here.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="overflow-hidden">
                {item.type === "photo" ? (
                  <img
                    src={item.url}
                    alt={item.caption || ""}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <video
                    src={item.url}
                    controls
                    className="w-full h-64 object-cover"
                  />
                )}
              </div>

              <div className="p-5">
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {item.category}
                </span>

                <h3 className="font-semibold text-lg text-[#1E3A8A]">
                  {item.caption || "School Activity"}
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  {item.type === "photo" ? "Photo Gallery" : "Video Gallery"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
