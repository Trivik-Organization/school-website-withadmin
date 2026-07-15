"use client";

import { useEffect, useState } from "react";
import PageBanner from "@/components/PageBanner";
import { FaImage, FaVideo, FaImages } from "react-icons/fa";

type GalleryItem = { id: number; type: string; url: string; caption: string | null; category: string };

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");

  useEffect(() => {
    fetch("/api/gallery").then((r) => r.json()).then(setItems);
  }, []);

  const categories = ["all", ...Array.from(new Set(items.map((i) => i.category)))];

  const filtered = items.filter(
    (i) => (typeFilter === "all" || i.type === typeFilter) && (catFilter === "all" || i.category === catFilter)
  );

  return (
    <div className="bg-slate-50">

      <PageBanner
        eyebrow="Our Campus"
        title="School Gallery"
        subtitle="Explore memorable moments, achievements, celebrations and activities from our vibrant school life."
        image="/school.jpg"
      />

      {/* Filters */}
      <section className="py-10">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-lg p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <span className="text-slate-700 font-semibold text-sm shrink-0">Filter:</span>
            <div className="flex flex-wrap gap-2">
              {/* Type pills */}
              {[
                { val: "all",   label: "All Media" },
                { val: "photo", label: "📷 Photos" },
                { val: "video", label: "🎥 Videos" },
              ].map((t) => (
                <button
                  key={t.val}
                  onClick={() => setTypeFilter(t.val)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    typeFilter === t.val ? "bg-[#1E3A8A] text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}

              {/* Divider */}
              {categories.length > 1 && <span className="self-center text-slate-200">|</span>}

              {/* Category pills */}
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCatFilter(c)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-200 ${
                    catFilter === c ? "bg-[#D4A017] text-[#0F172A] shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {c === "all" ? "All Categories" : c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-20">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-lg py-24 text-center">
              <FaImages className="text-6xl text-slate-200 mx-auto mb-5" />
              <h2 className="text-2xl font-bold text-slate-900">No Media Found</h2>
              <p className="text-slate-500 mt-2">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
                    {item.type === "photo" ? (
                      <img
                        src={item.url}
                        alt={item.caption || "Gallery image"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <video src={item.url} controls className="w-full h-full object-cover" />
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <div>
                        <span className="inline-block bg-[#D4A017] text-[#0F172A] text-xs font-bold px-3 py-1 rounded-full capitalize mb-2">
                          {item.category}
                        </span>
                        <p className="text-white font-semibold text-sm line-clamp-1">
                          {item.caption || "School Activity"}
                        </p>
                      </div>
                    </div>

                    {/* Type badge */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-[#1E3A8A] shadow-sm">
                      {item.type === "photo" ? <FaImage className="text-xs" /> : <FaVideo className="text-xs" />}
                    </div>
                  </div>

                  <div className="p-4">
                    <span className="inline-block bg-blue-50 text-[#1E3A8A] text-xs font-bold px-3 py-1 rounded-full capitalize mb-2">
                      {item.category}
                    </span>
                    <p className="text-sm font-semibold text-slate-800 line-clamp-1">
                      {item.caption || "School Activity"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
