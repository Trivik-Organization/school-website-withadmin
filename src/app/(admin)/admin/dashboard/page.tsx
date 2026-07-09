import { db } from "@/db/db";
import { notices, events, blogs, inquiries } from "@/db/schema";
import Link from "next/link";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const allNotices = await db.select().from(notices);
  const allEvents = await db.select().from(events);
  const allBlogs = await db.select().from(blogs);
  const allInquiries = await db.select().from(inquiries);

  const unreadCount = allInquiries.filter((i) => !i.isRead).length;
  const recentInquiries = [...allInquiries]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  const stats = [
    { label: "Total Notices", value: allNotices.length, href: "/admin/notices", icon: "📌" },
    { label: "Total Events", value: allEvents.length, href: "/admin/events", icon: "📅" },
    { label: "Total Blog Posts", value: allBlogs.length, href: "/admin/blog", icon: "📝" },
    { label: "Unread Inquiries", value: unreadCount, href: "/admin/inquiries", icon: "✉️" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1e3a5f] mb-1">Dashboard</h1>
      <p className="text-gray-500 mb-8">Overview of your school website</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-3xl font-bold text-[#1e3a5f]">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#1e3a5f]">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="text-sm text-[#d4a017] hover:underline">
            View All →
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <p className="text-gray-500 text-sm">No inquiries yet.</p>
        ) : (
          <div className="space-y-3">
            {recentInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {inquiry.subject}{" "}
                    {!inquiry.isRead && (
                      <span className="ml-2 text-xs bg-[#d4a017] text-white px-2 py-0.5 rounded-full">New</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">{inquiry.name} • {inquiry.email}</p>
                </div>
                <p className="text-xs text-gray-400">{inquiry.createdAt}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
