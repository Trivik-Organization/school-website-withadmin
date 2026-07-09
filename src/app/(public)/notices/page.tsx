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
    <div>
      <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8 border-b-4 border-[#d4a017] inline-block pb-2">
        Notices
      </h1>

      {allNotices.length === 0 ? (
        <p className="text-gray-500">No notices posted yet.</p>
      ) : (
        <div className="space-y-4">
          {allNotices.map((notice) => (
            <div
              key={notice.id}
              className={`rounded-lg border p-5 shadow-sm ${
                notice.isPinned
                  ? "bg-[#fff8e6] border-[#d4a017]"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-[#1e3a5f]">
                    {notice.isPinned && <span className="mr-2">📌</span>}
                    {notice.title}
                  </h2>
                  <p className="text-gray-600 mt-1 text-sm">{notice.content}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {notice.createdAt}
                  </p>
                </div>
                {notice.attachmentUrl && (
                  <a
                    href={notice.attachmentUrl}
                    target="_blank"
                    className="shrink-0 bg-[#1e3a5f] text-white text-sm px-3 py-1.5 rounded-md hover:bg-[#16304d] transition-colors"
                  >
                    Download
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
