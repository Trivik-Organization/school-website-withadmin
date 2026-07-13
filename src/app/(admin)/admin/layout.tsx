"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Pin,
  Calendar,
  FileText,
  Image as ImageIcon,
  Mail,
  LogOut,
  Bell,
  Settings,
  Globe,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/notices", label: "Notices", icon: Pin },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/gallery", label: "Media Gallery", icon: ImageIcon },
  { href: "/admin/inquiries", label: "Inquiries", icon: Mail },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [checking, setChecking] = useState(!isLoginPage);
  const [username, setUsername] = useState("Admin");

  useEffect(() => {
    if (isLoginPage) return;

    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data.user?.username) {
          setUsername(data.user.username);
        }
        setChecking(false);
      })
      .catch(() => router.push("/admin/login"));
  }, [router, isLoginPage]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          <p className="text-sm font-medium text-gray-500">Verifying session...</p>
        </div>
      </div>
    );
  }

  // Get user initials for avatar
  const initials = username
    ? username.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  return (
    <div className="flex min-h-screen w-full bg-gray-50">

      {/* ── Fixed Sidebar ── */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-52.5 flex-col bg-white border-r border-gray-100">

        {/* Branding Header */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white text-sm font-bold select-none">
            {initials}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-gray-800">Control Centre</span>
            <span className="text-[11px] text-gray-400 font-medium">Trivik School Admin</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-gray-400"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer Logout */}
        <div className="px-3 py-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150 cursor-pointer"
            title="Logout"
          >
            <LogOut className="h-4 w-4 shrink-0 text-gray-400" />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main Area ── */}
      <div className="flex-1 flex flex-col ml-52.5 min-h-screen">

        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between bg-white border-b border-gray-100 px-6">
          <h1 className="text-base font-semibold text-gray-800"></h1>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Public Site
            </Link>
            {/* <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
              <Settings className="h-4 w-4" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold select-none">
              {initials}
            </div> */}
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
