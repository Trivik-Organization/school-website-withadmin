import { db } from "@/db/db";
import { notices, events, blogs, inquiries } from "@/db/schema";
import Link from "next/link";
import {
  Pin,
  Calendar,
  FileText,
  Mail,
  ArrowRight,
  Inbox,
  Clock,
  ChevronRight,
} from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const allNotices = await db.select().from(notices);
  const allEvents = await db.select().from(events);
  const allBlogs = await db.select().from(blogs);
  const allInquiries = await db.select().from(inquiries);

  const unreadCount = allInquiries.filter((i) => !i.isRead).length;
  const recentInquiries = [...allInquiries]
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
    .slice(0, 5);

  const stats = [
    {
      label: "Notices Board",
      value: allNotices.length,
      href: "/admin/notices",
      icon: Pin,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-300",
      description: "School circulars & notices",
    },
    {
      label: "Scheduled Events",
      value: allEvents.length,
      href: "/admin/events",
      icon: Calendar,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-300",
      description: "Calendar & activities",
    },
    {
      label: "Blog Articles",
      value: allBlogs.length,
      href: "/admin/blog",
      icon: FileText,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-300",
      description: "News & publication posts",
    },
    {
      label: "Inquiries Box",
      value: allInquiries.length,
      href: "/admin/inquiries",
      icon: Mail,
      iconBg: "bg-red-50",
      iconColor: "text-red-300",
      unread: unreadCount,
      description: "Contact form messages",
    },
  ];

  return (
    <div className="space-y-2">
      {/* Page Title */}
      <div className="space-x-2">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col justify-between shadow-xs hover:shadow-sm hover:border-gray-200 transition-all duration-200"
            >
              {/* Top row — label + icon */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-col gap-0.5">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
                {/* Large pastel icon */}
                <div className={`${stat.iconBg} rounded-xl p-3`}>
                  <Icon className={`h-7 w-7 ${stat.iconColor}`} />
                </div>
              </div>

              {/* Count */}
              <div className="mb-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900 tracking-tight">
                    {stat.value}
                  </span>
                  {stat.unread !== undefined && stat.unread > 0 && (
                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                      {stat.unread} new
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">{stat.description}</p>
              </div>

              {/* Manage link */}
              <div className="pt-3 mt-1 border-t border-gray-50">
                <Link
                  href={stat.href}
                  className="flex items-center gap-1 text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors w-fit"
                >
                  Manage items <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Contact Messages */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-xs overflow-hidden">
        {/* Section Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-800">Recent Contact Messages</h2>
            <p className="text-xs text-gray-400 mt-0.5 font-medium">
              The latest user submissions from the public contact page.
            </p>
          </div>
          <Link
            href="/admin/inquiries"
            className="flex items-center gap-1 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
          >
            Go to Inbox <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Table */}
        {recentInquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 px-4 text-center">
            <Inbox className="h-10 w-10 text-gray-200 mb-3" />
            <p className="text-sm font-semibold text-gray-500">Inbox is empty</p>
            <p className="text-xs text-gray-400 mt-1">No contact inquiries have been received yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider w-52.5">
                    Sender
                  </th>
                  <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider w-52.5">
                    Received Date
                  </th>
                  <th className="px-6 py-3 text-right text-[10px] font-bold text-gray-400 uppercase tracking-wider w-22.5">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800 text-sm">{inquiry.name}</span>
                        <span className="text-xs text-gray-400">{inquiry.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {inquiry.subject}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-gray-500 font-medium">{inquiry.createdAt}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold border ${inquiry.isRead
                            ? "bg-gray-50 text-gray-500 border-gray-200"
                            : "bg-orange-50 text-orange-600 border-orange-100"
                          }`}
                      >
                        {inquiry.isRead ? "Read" : "New"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
