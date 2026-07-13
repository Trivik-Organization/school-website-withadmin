"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Video,
  Tag,
  Upload,
  Loader2,
  X,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function loadItems() {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : data.gallery || data.items || []);
  }

  useEffect(() => {
    loadItems();
  }, []);

  function startAdd() {
    setForm(emptyForm);
    setFile(null);
    setIsDialogOpen(true);
  }

  function resetForm() {
    setForm(emptyForm);
    setFile(null);
    setIsDialogOpen(false);
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
      
      if (uploadRes.ok && uploadResult.success) {
        finalUrl = uploadResult.url;
      } else {
        alert(uploadResult.error || "Failed to upload file");
        setLoading(false);
        return;
      }
    }

    if (!finalUrl) {
      alert("Please select a file to upload or enter a video URL");
      setLoading(false);
      return;
    }

    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: form.type,
        url: finalUrl,
        caption: form.caption || null,
        category: form.category,
      }),
    });

    resetForm();
    await loadItems();
    setLoading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this media item? This will also remove the file from local storage.")) return;
    await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
    await loadItems();
  }

  return (
    <div className="space-y-6">
      
      {/* Top Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Media Gallery</h1>
        </div>
        <Button onClick={startAdd} className="bg-[#1e3a5f] hover:bg-[#16304d] text-white flex items-center gap-2 cursor-pointer">
          <Plus className="h-4 w-4" /> Add Media
        </Button>
      </div>

      {/* Media Items Grid */}
      {items.length === 0 ? (
        <Card className="border border-gray-200 shadow-sm">
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <ImageIcon className="h-16 w-16 text-gray-300 mb-3" />
            <p className="text-base font-bold text-gray-700">No media uploaded yet</p>
            <p className="text-sm text-gray-400 mt-1">Click "Add Media" above to upload your first school photo or video.</p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <Card key={item.id} className="border border-gray-200/80 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
              
              {/* Media Thumbnail Container */}
              <div className="relative aspect-video bg-gray-100 overflow-hidden border-b border-gray-100 flex items-center justify-center">
                {item.type === "photo" ? (
                  <img
                    src={item.url}
                    alt={item.caption || ""}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="relative flex flex-col items-center justify-center w-full h-full bg-[#1e3a5f]/5 text-[#1e3a5f]">
                    <PlayCircle className="h-12 w-12 text-[#1e3a5f]" />
                    <span className="text-[10px] uppercase font-bold tracking-wider mt-2 bg-[#1e3a5f]/10 px-2 py-0.5 rounded-full">
                      Video Link
                    </span>
                  </div>
                )}
                
                {/* Category Badge overlay */}
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-gray-100 shadow-xs text-[10px] font-bold text-gray-700 uppercase">
                  <Tag className="h-2.5 w-2.5 text-gray-400" />
                  {item.category}
                </div>
              </div>

              {/* Card Footer Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-sm font-medium text-gray-700 line-clamp-2">
                  {item.caption || <span className="text-gray-400 italic">No description provided</span>}
                </p>

                <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                  <span className="text-[10px] text-gray-400 font-medium">Uploaded: {item.createdAt.split(" ")[0]}</span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:bg-red-50 hover:text-red-600 rounded-md cursor-pointer h-7 w-7"
                    title="Delete Media"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Form Dialog Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-112.5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900">Add Media Asset</DialogTitle>
              <DialogDescription className="text-xs text-gray-500">
                Upload a campus photo or link an embedded video URL to showcase.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Media Type</label>
                <Select
                  value={form.type}
                  onValueChange={(val) => setForm({ ...form, type: val || "photo" })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photo">Photo File</SelectItem>
                    <SelectItem value="video">Video URL Embed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {form.type === "photo" ? (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Image File</label>
                  <div className="flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-5 hover:bg-gray-50 transition-colors relative cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      required
                    />
                    <div className="flex flex-col items-center text-center gap-1.5 pointer-events-none">
                      <Upload className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                      {file ? (
                        <span className="text-sm font-semibold text-gray-700 max-w-62.5 truncate">{file.name}</span>
                      ) : (
                        <>
                          <span className="text-xs font-semibold text-gray-600">Click to choose image file</span>
                          <span className="text-[10px] text-gray-400">PNG, JPG, or WEBP up to 5MB</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Embedded Video URL</label>
                  <Input
                    type="url"
                    placeholder="e.g. https://www.youtube.com/embed/..."
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                  <Select
                    value={form.category}
                    onValueChange={(val) => setForm({ ...form, category: val || "General" })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Events">Events</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Caption</label>
                  <Input
                    type="text"
                    placeholder="Short description..."
                    value={form.caption}
                    onChange={(e) => setForm({ ...form, caption: e.target.value })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="border-t border-gray-100 pt-4 flex gap-2 sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={loading}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#1e3a5f] hover:bg-[#16304d] text-white flex items-center gap-1.5 cursor-pointer"
              >
                {loading && <Loader2 className="h-3 w-3 animate-spin" />}
                {loading ? "Uploading..." : "Add Media"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
