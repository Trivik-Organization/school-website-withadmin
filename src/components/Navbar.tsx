"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/notices", label: "Notices" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top bar */}
      <div className="bg-[#122943] text-gray-300 text-xs">
        <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="hidden sm:flex gap-5">
            <span>📞 +91 00000 00000</span>
            <span>✉️ contact@ourschool.edu</span>
          </div>
          <div className="flex gap-3 ml-auto">
            <a href="#" aria-label="Facebook" className="hover:text-[#d4a017] transition-colors">Facebook</a>
            <a href="#" aria-label="Instagram" className="hover:text-[#d4a017] transition-colors">Instagram</a>
            <a href="#" aria-label="YouTube" className="hover:text-[#d4a017] transition-colors">YouTube</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-[#1e3a5f] text-white">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-wide">
            🏫 Our School
          </Link>
          <ul className="hidden md:flex gap-6 text-sm font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#d4a017] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md hover:bg-white/10"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
        {open && (
          <ul className="md:hidden px-6 pb-4 space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:bg-white/10">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
