"use client";

import { useEffect, useState } from "react";

type Blog = {
  id: number;
  title: string;
  content: string;
  author: string;
  imageUrl: string | null;
  createdAt: string;
};

const emptyForm = { id: null as number | null, title: "", content: "", author: "Admin", imageUrl: "" };

export default function BlogManagerPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  async function loadBlogs() {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(data.blogs);
  }

  useEffect(() => {
    loadBlogs();
  }, []);

  function startEdit(blog: Blog) {
    setForm({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      author: blog.author,
      imageUrl: blog.imageUrl || "",
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
      author: form.author,
      imageUrl: form.imageUrl || null,
    };

    if (form.id) {
      await fetch(`/api/blogs/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    resetForm();
    await loadBlogs();
    setLoading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this blog post?")) return;
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    await loadBlogs();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1e3a5f] mb-8">Manage Blog Posts</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm h-fit">
          <h2 className="text-lg font-semibold text-[#1e3a5f] mb-4">
            {form.id ? "Edit Post" : "Add Post"}
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
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-32"
              required
            />
            <input
              type="text"
              placeholder="Author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
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
                {form.id ? "Update" : "Add"} Post
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
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">{blog.title}</td>
                  <td className="px-4 py-3 text-gray-500">{blog.author}</td>
                  <td className="px-4 py-3 text-gray-500">{blog.createdAt}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => startEdit(blog)}
                      className="text-[#1e3a5f] hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                    No blog posts yet.
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
