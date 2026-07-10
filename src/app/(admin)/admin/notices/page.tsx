"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Download,
  Pin,
  Megaphone,
  X,
  Loader2,
  FileText,
  BarChart2,
  Eye,
  Cloud,
  Link as LinkIcon,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  async function loadNotices() {
    const res = await fetch(`/api/notices?page=${page}&limit=5`);
    const data = await res.json();
    setNotices(data.data || []);
    if (data.pagination) {
      setTotalPages(data.pagination.totalPages);
      setTotalItems(data.pagination.total);
    }
  }

  useEffect(() => {
    loadNotices();
  }, [page]);

  function startAdd() {
    setForm(emptyForm);
    setIsDialogOpen(true);
  }

  function startEdit(notice: Notice) {
    setForm({
      id: notice.id,
      title: notice.title,
      content: notice.content,
      attachmentUrl: notice.attachmentUrl || "",
      isPinned: notice.isPinned,
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
      content: form.content,
      attachmentUrl: form.attachmentUrl || null,
      isPinned: form.isPinned,
    };

    if (form.id) {
      await fetch("/api/notices", {
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
    if (!confirm("Are you sure you want to delete this notice?")) return;
    await fetch(`/api/notices?id=${id}`, { method: "DELETE" });
    await loadNotices();
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Top Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">School Notices</h1>
   
        </div>
        <Button onClick={startAdd} className="bg-[#ffcc00] hover:bg-[#e6b800] text-black font-semibold flex items-center gap-2 cursor-pointer shadow-sm rounded-md px-4">
          <Plus className="h-4 w-4" /> Add Notice
        </Button>
      </div>

      {/* Notices Table Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#f4f7fb] text-gray-500 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 w-62.5">Title</th>
                <th className="px-6 py-3">Content Preview</th>
                <th className="px-6 py-3 w-40">Date Posted</th>
                <th className="px-6 py-3 w-30 text-center">Attachment</th>
                <th className="px-6 py-3 w-25 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {notices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500 text-sm">
                    No notices available. Click "Add Notice" to create one.
                  </td>
                </tr>
              ) : (
                notices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-gray-50/50 transition-colors bg-white">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {notice.isPinned ? (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                            <Pin className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                            <FileText className="h-4 w-4" />
                          </div>
                        )}
                        <span className="font-bold text-gray-800 text-sm leading-tight">{notice.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs truncate max-w-62.5">
                      {notice.content}
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs font-medium">
                      {notice.createdAt}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {notice.attachmentUrl ? (
                        <a
                          href={notice.attachmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-7 w-7 items-center justify-center rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors mx-auto"
                          title="Download attachment"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <span className="text-gray-300 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => startEdit(notice)}
                          className="text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
                          title="Edit Notice"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(notice.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete Notice"
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
              Showing {notices.length} of {totalItems} entries
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
          <div className="bg-white rounded-xl shadow-lg w-full max-w-125 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {form.id ? "Edit Notice" : "Create New Notice"}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Provide the details of the announcement below. Click save to publish.
                </p>
              </div>
              <button 
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Notice Title</label>
                <Input
                  type="text"
                  placeholder="e.g. Summer Vacation Schedule"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full text-sm border-gray-200 focus-visible:ring-gray-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Notice Content</label>
                <Textarea
                  placeholder="Provide the detailed content of the announcement..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  required
                  className="min-h-25 w-full text-sm border-gray-200 focus-visible:ring-gray-200 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Attachment URL (Optional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="e.g. /uploads/circular-document.pdf"
                    value={form.attachmentUrl}
                    onChange={(e) => setForm({ ...form, attachmentUrl: e.target.value })}
                    className="w-full pl-9 text-sm border-gray-200 focus-visible:ring-gray-200"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 bg-[#f4f7fb] border border-gray-100 rounded-lg p-4 cursor-pointer select-none mt-2">
                <input
                  type="checkbox"
                  checked={form.isPinned}
                  onChange={(e) => setForm({ ...form, isPinned: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black bg-white"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900">Pin Notice</span>
                  <span className="text-xs text-gray-500 mt-0.5">Keep this notice highlighted at the top of the feed</span>
                </div>
              </label>

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
                  {form.id ? "Update Notice" : "Publish Notice"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
