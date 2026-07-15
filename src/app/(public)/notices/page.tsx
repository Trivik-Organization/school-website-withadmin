import { db } from "@/db/db";
import { notices } from "@/db/schema";
import { desc } from "drizzle-orm";
import PageBanner from "@/components/PageBanner";
import { BsPinAngleFill } from "react-icons/bs";
import { FaBell, FaDownload } from "react-icons/fa";

export const revalidate = 0;

export default async function NoticesPage() {
  const allNotices = await db
    .select()
    .from(notices)
    .orderBy(desc(notices.isPinned), desc(notices.createdAt));

  return (
    <div className="bg-slate-50">

      <PageBanner
        eyebrow="Stay Informed"
        title="Notice Board"
        subtitle="Latest announcements, circulars, examination schedules, holidays and important updates from the school."
      />

      <section className="py-20">
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16">

          {allNotices.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-lg py-24 text-center">
              <FaBell className="text-6xl text-slate-200 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-slate-900">No Notices Yet</h2>
              <p className="text-gray-500 mt-2">New notices will appear here.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {allNotices.map((notice) => (
                <div
                  key={notice.id}
                  className={`bg-white rounded-3xl border shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden ${
                    notice.isPinned ? "border-amber-200" : "border-slate-100"
                  }`}
                >
                  {/* Top accent line */}
                  <div className={`h-1.5 ${notice.isPinned ? "bg-[#F59E0B]" : "bg-[#1E3A8A]"}`} />

                  <div className="p-7 flex flex-col md:flex-row md:items-center gap-6">

                    {/* Date badge */}
                    <div className="shrink-0 w-20 rounded-2xl overflow-hidden border border-slate-100 shadow-sm text-center">
                      <div className={`py-1.5 text-white text-xs font-bold uppercase tracking-wider ${notice.isPinned ? "bg-[#F59E0B]" : "bg-[#1E3A8A]"}`}>
                        {new Date(notice.createdAt).toLocaleString("default", { month: "short" })}
                      </div>
                      <div className="py-2 text-2xl font-black text-slate-800">
                        {new Date(notice.createdAt).getDate()}
                      </div>
                      <div className="py-1 bg-slate-50 text-slate-400 text-xs font-semibold">
                        {new Date(notice.createdAt).getFullYear()}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {notice.isPinned && (
                          <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
                            <BsPinAngleFill /> PINNED
                          </span>
                        )}
                        <span className="text-xs text-slate-400 font-medium">
                          {new Date(notice.createdAt).toLocaleDateString("en-IN", {
                            year: "numeric", month: "long", day: "numeric",
                          })}
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{notice.title}</h2>
                      <p className="text-gray-600 leading-7 text-sm">{notice.content}</p>
                    </div>

                    {/* Download */}
                    {notice.attachmentUrl && (
                      <div className="shrink-0">
                        <a
                          href={notice.attachmentUrl}
                          target="_blank"
                          className="inline-flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#163172] text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg"
                        >
                          <FaDownload /> Download
                        </a>
                      </div>
                    )}

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
