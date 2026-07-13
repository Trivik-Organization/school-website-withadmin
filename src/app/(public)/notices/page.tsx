import { db } from "@/db/db";
import { notices } from "@/db/schema";
import { desc } from "drizzle-orm";

export const revalidate = 0;

export default async function NoticesPage() {
  const allNotices = await db
    .select()
    .from(notices)
    .orderBy(desc(notices.isPinned), desc(notices.createdAt));

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] rounded-3xl text-white px-8 py-14 shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">School Notices</h1>

        <p className="text-blue-100 max-w-2xl leading-7">
          Stay updated with the latest announcements, circulars, examination
          schedules, holidays and important information from the school.
        </p>
      </section>

      {/* Notices */}
      {allNotices.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 py-20 text-center">
          <div className="text-6xl mb-4">📢</div>
          <h2 className="text-2xl font-semibold text-[#1E3A8A]">
            No Notices Available
          </h2>
          <p className="text-gray-500 mt-2">New notices will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {allNotices.map((notice) => (
            <div
              key={notice.id}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                notice.isPinned
                  ? "border-amber-300 bg-gradient-to-r from-amber-50 to-white"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="p-7">
                <div className="flex justify-between items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {notice.isPinned && (
                        <span className="bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          📌 Pinned
                        </span>
                      )}

                      <span className="text-sm text-gray-500">
                        {new Date(notice.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-[#1E3A8A] mb-3">
                      {notice.title}
                    </h2>

                    <p className="text-gray-600 leading-7">{notice.content}</p>
                  </div>

                  {notice.attachmentUrl && (
                    <a
                      href={notice.attachmentUrl}
                      target="_blank"
                      className="bg-[#1E3A8A] hover:bg-[#163172] text-white px-5 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg"
                    >
                      Download
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
