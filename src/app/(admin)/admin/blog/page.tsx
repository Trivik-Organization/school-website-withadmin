"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  FileText,
  User,
  Calendar,
  Image as ImageIcon,
  X,
  Loader2,
  BarChart2,
  Eye,
  Cloud,
  Link as LinkIcon,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  coverImage: string | null;
  createdAt: string;
};

const emptyForm = { id: null as number | null, title: "", excerpt: "", content: "", author: "", coverImage: "" };

export default function BlogsManagerPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  async function loadBlogs() {
    const res = await fetch(`/api/blogs?page=${page}&limit=5`);
    const data = await res.json();
    setBlogs(data.data || []);
    if (data.pagination) {
      setTotalPages(data.pagination.totalPages);
      setTotalItems(data.pagination.total);
    }
  }

  useEffect(() => {
    loadBlogs();
  }, [page]);

  function startAdd() {
    setForm(emptyForm);
    setIsDialogOpen(true);
  }

  function startEdit(blog: Blog) {
    setForm({
      id: blog.id,
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      coverImage: blog.coverImage || "",
    });
    setIsDialogOpen(true);
  }

  function resetForm() {
    setForm(emptyForm);
    setIsDialogOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      id: form.id,
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      author: form.author,
      coverImage: form.coverImage || null,
    };

    if (form.id) {
      await fetch("/api/blogs", {
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
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
    await loadBlogs();
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Top Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">School Blog Posts</h1>
        </div>
        <Button onClick={startAdd} className="bg-[#ffcc00] hover:bg-[#e6b800] text-black font-semibold flex items-center gap-2 cursor-pointer shadow-sm rounded-md px-4">
          <Plus className="h-4 w-4" /> Add Post
        </Button>
      </div>

      {/* Blogs Table Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#f4f7fb] text-gray-500 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 w-62.5">Title</th>
                <th className="px-6 py-3">Excerpt Preview</th>
                <th className="px-6 py-3 w-40">Author & Date</th>
                <th className="px-6 py-3 w-30 text-center">Cover</th>
                <th className="px-6 py-3 w-25 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500 text-sm">
                    No blog posts available. Click "Add Post" to create one.
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors bg-white">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                          <FileText className="h-4 w-4" />
                        </div>
                        <span className="font-bold text-gray-800 text-sm leading-tight">{blog.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs truncate max-w-62.5">
                      {blog.excerpt}
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs font-medium">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1.5"><User className="h-3 w-3" /> {blog.author}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {blog.createdAt.split(' ')[0]}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {blog.coverImage ? (
                        <div
                          className="inline-flex h-7 w-7 items-center justify-center rounded bg-blue-50 text-blue-600 mx-auto"
                          title="Has cover image"
                        >
                          <ImageIcon className="h-3.5 w-3.5" />
                        </div>
                      ) : (
                        <span className="text-gray-300 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => startEdit(blog)}
                          className="text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
                          title="Edit Post"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete Post"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        {totalItems > 5 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
            <span className="text-xs font-bold text-gray-500">
              Showing {blogs.length} of {totalItems} entries
            </span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-2.5 py-1 text-xs font-semibold text-gray-400 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPage(idx + 1)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer ${
                    page === idx + 1
                      ? "text-white bg-black"
                      : "text-gray-600 border border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-2.5 py-1 text-xs font-semibold text-gray-600 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Custom Dialog Modal Background Overlay */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-150 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 max-h-[90vh]">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {form.id ? "Edit Blog Post" : "Create New Post"}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Provide details for the publication below. Click save to publish.
                </p>
              </div>
              <button 
                type="button"
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto">
              <form onSubmit={handleSubmit} className="flex flex-col p-6 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Post Title</label>
                  <Input
                    type="text"
                    placeholder="e.g. Science Fair Highlights 2026"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    className="w-full text-sm border-gray-200 focus-visible:ring-gray-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Author</label>
                    <Input
                      type="text"
                      placeholder="e.g. Jane Doe"
                      value={form.author}
                      onChange={(e) => setForm({ ...form, author: e.target.value })}
                      required
                      className="w-full text-sm border-gray-200 focus-visible:ring-gray-200"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Cover Image URL (Optional)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LinkIcon className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        type="text"
                        placeholder="e.g. /uploads/science-fair.jpg"
                        value={form.coverImage}
                        onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                        className="w-full pl-9 text-sm border-gray-200 focus-visible:ring-gray-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Short Excerpt (Summary)</label>
                  <Textarea
                    placeholder="A brief 1-2 sentence summary of the post..."
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    required
                    className="min-h-15 w-full text-sm border-gray-200 focus-visible:ring-gray-200 resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Full Content</label>
                  <Textarea
                    placeholder="Write the full body of the post here..."
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    required
                    className="min-h-40 w-full text-sm border-gray-200 focus-visible:ring-gray-200 resize-none"
                  />
                </div>

                <div className="border-t border-gray-100 pt-5 mt-2 flex items-center justify-center gap-3 sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    disabled={loading}
                    className="cursor-pointer border-gray-200 text-gray-600 font-semibold"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-[#111827] hover:bg-gray-800 text-white font-semibold flex items-center gap-2 cursor-pointer"
                  >
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {form.id ? "Update Post" : "Publish Post"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
