"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/notices", label: "Notices", icon: "📌" },
  { href: "/admin/events", label: "Events", icon: "📅" },
  { href: "/admin/blog", label: "Blog", icon: "📝" },
  { href: "/admin/gallery", label: "Gallery", icon: "🖼️" },
  { href: "/admin/inquiries", label: "Inquiries", icon: "✉️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [checking, setChecking] = useState(!isLoginPage);

  useEffect(() => {
    if (isLoginPage) return;

    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error();
        setChecking(false);
      })
      .catch(() => router.push("/admin/login"));
  }, [router, isLoginPage]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <p className="text-gray-500">Checking session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#f8f9fa]">
      <aside className="w-64 bg-[#1e3a5f] text-white flex flex-col">
        <div className="px-6 py-5 text-xl font-bold border-b border-white/10">
          🏫 Admin Panel
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                pathname === item.href ? "bg-[#d4a017] text-[#1e3a5f] font-semibold" : "hover:bg-white/10"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mx-3 mb-4 px-3 py-2 text-sm rounded-md bg-white/10 hover:bg-white/20 transition-colors text-left"
        >
          🚪 Logout
        </button>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
