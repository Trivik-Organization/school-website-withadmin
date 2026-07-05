"use client";

import React, { useState, useEffect } from "react";

interface MediaItem {
  id: number;
  type: string;
  url: string;
  caption: string | null;
  category: string;
  createdAt: string;
}

export default function GalleryPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setMedia(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch gallery:", err);
        setLoading(false);
      });
  }, []);

  // Filter items
  const filteredMedia = media.filter((item) => {
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesType && matchesCategory;
  });

  // Extract unique categories
  const categories = ["all", ...Array.from(new Set(media.map((item) => item.category)))];

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <h1>School Photo & Video Gallery</h1>
      <p style={{ color: "#666", marginBottom: "25px" }}>
        Browse campus highlights, classrooms, sports meets, and student events.
      </p>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "25px" }}>
        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          <option value="all">All Types</option>
          <option value="photo">Photos</option>
          <option value="video">Videos</option>
        </select>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading media assets...</p>
      ) : filteredMedia.length === 0 ? (
        <p>No media items found matching the filters.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Media element */}
              <div style={{ height: "180px", backgroundColor: "#f0f0f0", position: "relative" }}>
                {item.type === "photo" ? (
                  <img
                    src={item.url}
                    alt={item.caption || "Gallery Photo"}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <iframe
                    src={item.url}
                    title={item.caption || "Gallery Video"}
                    style={{ width: "100%", height: "100%", border: "none" }}
                    allowFullScreen
                  />
                )}
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: "#fff",
                    padding: "3px 6px",
                    borderRadius: "4px",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                  }}
                >
                  {item.category}
                </span>
              </div>

              {/* Caption */}
              <div style={{ padding: "12px", flex: 1, display: "flex", alignItems: "center" }}>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#333", fontWeight: "medium" }}>
                  {item.caption || "No description provided."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
