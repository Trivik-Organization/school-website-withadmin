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

export default function AdminGalleryPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [form, setForm] = useState({
    type: "photo", // 'photo' | 'video'
    url: "",
    caption: "",
    category: "General",
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchMedia = () => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setMedia(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setForm({
      type: "photo",
      url: "",
      caption: "",
      category: "General",
    });
    setSelectedFile(null);
    // Reset file input element manually
    const fileInput = document.getElementById("file") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let finalUrl = form.url;

    try {
      // 1. If it's a photo and a file is selected, upload it first
      if (form.type === "photo" && selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();

        if (uploadRes.status === 200 && uploadData.success) {
          finalUrl = uploadData.url;
        } else {
          alert(uploadData.error || "Failed to upload image file.");
          setUploading(false);
          return;
        }
      }

      if (!finalUrl) {
        alert("Please select a file to upload or enter a video URL.");
        setUploading(false);
        return;
      }

      // 2. Submit media metadata to database
      const saveRes = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: form.type,
          url: finalUrl,
          caption: form.caption,
          category: form.category,
        }),
      });

      const saveData = await saveRes.json();

      if (saveRes.status === 200) {
        fetchMedia();
        handleReset();
      } else {
        alert(saveData.error || "Failed to save media metadata.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error occurred.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this media item? This will also remove local files from disk.")) return;

    try {
      const res = await fetch(`/api/gallery?id=${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        fetchMedia();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {/* List Panel */}
      <div style={{ flex: 2, minWidth: "300px" }}>
        <h1>Manage Gallery</h1>
        {loading ? (
          <p>Loading media...</p>
        ) : media.length === 0 ? (
          <p>No gallery media found.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "15px" }}>
            {media.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ height: "110px", backgroundColor: "#f0f0f0" }}>
                  {item.type === "photo" ? (
                    <img src={item.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#666", fontSize: "0.8rem", fontWeight: "bold" }}>
                      🎥 Video Link
                    </div>
                  )}
                </div>
                <div style={{ padding: "8px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase" }}>{item.category}</span>
                  <p style={{ margin: "4px 0", fontSize: "0.8rem", color: "#333", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {item.caption || "No description."}
                  </p>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      marginTop: "6px",
                      width: "100%",
                      padding: "4px",
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                      fontSize: "0.75rem",
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

      {/* Editor Form Panel */}
      <div style={{ flex: 1, minWidth: "250px", backgroundColor: "#fff", padding: "20px", border: "1px solid #ddd", borderRadius: "6px", alignSelf: "flex-start" }}>
        <h2>Add Media</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label htmlFor="type" style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Type</label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            >
              <option value="photo">Photo (File Upload)</option>
              <option value="video">Video (URL Link)</option>
            </select>
          </div>

          {form.type === "photo" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label htmlFor="file" style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Image File</label>
              <input
                type="file"
                id="file"
                name="file"
                required
                accept="image/*"
                onChange={handleFileChange}
                style={{ padding: "5px" }}
              />
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label htmlFor="url" style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Embedded Video URL</label>
              <input
                type="url"
                id="url"
                name="url"
                required
                placeholder="e.g. https://www.youtube.com/embed/..."
                value={form.url}
                onChange={handleChange}
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label htmlFor="category" style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Category</label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="e.g. Infrastructure, Sports, Events"
              value={form.category}
              onChange={handleChange}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label htmlFor="caption" style={{ fontWeight: "bold", fontSize: "0.9rem" }}>Caption (Optional)</label>
            <input
              type="text"
              id="caption"
              name="caption"
              value={form.caption}
              onChange={handleChange}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#10b981",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: uploading ? "not-allowed" : "pointer",
              marginTop: "10px",
            }}
          >
            {uploading ? "Uploading & Saving..." : "Add Media Asset"}
          </button>
        </form>
      </div>
    </div>
  );
}
