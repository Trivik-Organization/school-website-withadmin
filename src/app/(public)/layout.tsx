 "use client";

 import Link from "next/link";
 import React, { useEffect, useState } from "react";
 import Image from "next/image";
 import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
 import { usePathname } from "next/navigation";
 import {
   FaGraduationCap,
   FaArrowRight,
 } from "react-icons/fa";

 export default function PublicLayout({
   children,
 }: {
   children: React.ReactNode;
 }) {
   const pathname = usePathname();

   const links = [
     { href: "/", label: "Home" },
     { href: "/about", label: "About" },
     { href: "/academics", label: "Academics" },
     { href: "/admissions", label: "Admissions" },
     { href: "/school-life", label: "School Life" },
     { href: "/notices", label: "Notices" },
     { href: "/events", label: "Events" },
     { href: "/blog", label: "Blog" },
     { href: "/gallery", label: "Gallery" },
     { href: "/contact", label: "Contact" },
   ];

   const [menuOpen, setMenuOpen] = useState(false);
   const [scrolled, setScrolled] = useState(false);
   useEffect(() => {
     const handleScroll = () => {
       setScrolled(window.scrollY > 50);
     };

     handleScroll(); // Set initial state

     window.addEventListener("scroll", handleScroll);

     return () => window.removeEventListener("scroll", handleScroll);
   }, []);
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        {/* Navbar */}
        <header
          className={`fixed w-full top-0 z-50 transition-all duration-500 ${
            !scrolled
              ? "bg-transparent"
              : "bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-lg"
          }`}
        >
          <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 xl:px-16 h-20 flex items-center justify-between">

            {/* Logo */}

            <Link href="/" className="flex items-center gap-4 group">

              <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-white shadow-lg ring-2 ring-white/20 transition-all duration-300 group-hover:scale-105">

                <Image
                  src="/logo.png"
                  alt="School Logo"
                  fill
                  className="object-contain p-2"
                  priority
                />

              </div>

              <div>

                <h2
                  className={`text-2xl font-bold transition-colors duration-300 ${
                    !scrolled ? "text-white" : "text-slate-900"
                  }`}
                >
                  School Portal
                </h2>

                <p
                  className={`text-xs transition-colors duration-300 ${
                    !scrolled ? "text-white/70" : "text-gray-600"
                  }`}
                >
                  Excellence • Discipline • Success
                </p>

              </div>

            </Link>

            {/* Navigation */}

            <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 text-sm">

              {links.map((link) => (

                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-semibold transition group ${
                    pathname === link.href
                      ? "text-[#D4A017]"
                      : !scrolled
                        ? "text-white hover:text-[#FFD54F]"
                        : "text-slate-700 hover:text-[#1E3A8A]"
                  }`}
                >

                  {link.label}

                  <span
                    className={`absolute left-0 -bottom-2 h-[3px] rounded-full bg-[#D4A017] transition-all duration-300 ${
                      pathname === link.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>

              ))}

            </nav>

            {/* Right Side */}

            <div className="flex items-center gap-4">

              <div className="flex items-center gap-4">

                <Link
                  href="/admin/login"
                  className={`hidden md:inline-flex px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg border ${
                    !scrolled
                      ? "border-white/40 text-white hover:bg-white hover:text-[#1E3A8A]"
                      : "bg-[#1E3A8A] hover:bg-[#163172] text-white border-transparent"
                  }`}
                >
                  Admin Login
                </Link>

                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className={`xl:hidden text-3xl transition-colors duration-300 ${
                    !scrolled ? "text-white" : "text-[#1E3A8A]"
                  }`}
                >
                  {menuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
                </button>

              </div>

            </div>

          </div>

        </header>
        {menuOpen && (
          <div className="xl:hidden fixed top-20 left-0 w-full z-40 bg-white border-b shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto">

            <div className="flex flex-col py-4">

              {links.map((link) => (

                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-6 py-4 font-semibold transition ${
                    pathname === link.href
                      ? "text-[#1E3A8A] bg-blue-50"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>

              ))}

              <Link
                href="/admin/login"
                onClick={() => setMenuOpen(false)}
                className={`hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                pathname === "/" && !scrolled
                    ? "bg-[#D4A017] text-[#0F172A]"
                    : "bg-[#1E3A8A] text-white hover:bg-[#163172]"
                }`}
              >
                Admin Login
              </Link>

            </div>

          </div>
        )}
        {/* Content */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-[#0F172A] text-gray-300 mt-24">

          <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 xl:px-16 py-20">

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-14">

              {/* School */}

              <div>

                <div className="flex items-center gap-4 mb-6">

                  <div className="relative w-14 h-14 rounded-2xl bg-white overflow-hidden shadow-lg">

                    <Image
                      src="/logo.png"
                      alt="School Logo"
                      fill
                      className="object-contain p-2"
                    />

                  </div>

                  <div>

                    <h3 className="text-2xl font-bold text-white">
                      School Portal
                    </h3>

                    <p className="text-sm text-gray-400">
                      Excellence • Discipline • Success
                    </p>

                  </div>

                </div>

                <p className="leading-7 text-gray-400">
                  We inspire students through quality education,
                  innovation, discipline and holistic development,
                  preparing them to become confident leaders of tomorrow.
                </p>

              </div>

              {/* Quick Links */}

              <div>

                <h3 className="text-xl font-semibold text-white mb-6">
                  Quick Links
                </h3>

                <div className="space-y-3">

                  {links.map((link) => (

                    <Link
                      key={link.href}
                      href={link.href}
                      className="block hover:text-[#D4A017] transition"
                    >
                      {link.label}
                    </Link>

                  ))}

                </div>

              </div>

              {/* Contact */}

              <div>

                <h3 className="text-xl font-semibold text-white mb-6">
                  Contact
                </h3>

                <div className="space-y-4 text-gray-400">

                  <p>📍 School Address</p>

                  <p>📞 +91 XXXXX XXXXX</p>

                  <p>✉️ school@example.com</p>

                  <p>🕒 Mon - Fri : 8:00 AM - 4:00 PM</p>

                </div>

              </div>

              {/* CTA */}

              <div>

                <h3 className="text-xl font-semibold text-white mb-6">
                  Admissions Open
                </h3>

                <p className="text-gray-400 leading-7 mb-6">
                  Give your child the opportunity to learn, grow and succeed in a modern educational environment.
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-[#D4A017] text-[#0F172A] px-7 py-3 rounded-full font-bold hover:scale-105 transition-all duration-300"
                >
                  Apply Now
                  <FaArrowRight />
                </Link>

              </div>

            </div>

            <div className="border-t border-slate-700 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-5">

              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} School Portal. All Rights Reserved.
              </p>

              <div className="flex items-center gap-6 text-sm">

                <Link href="/" className="hover:text-[#D4A017] transition">
                  Privacy Policy
                </Link>

                <Link href="/" className="hover:text-[#D4A017] transition">
                  Terms
                </Link>

                <Link href="/" className="hover:text-[#D4A017] transition">
                  Sitemap
                </Link>

              </div>

            </div>

          </div>

        </footer>
      </div>
    );
  }
