"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdmissionPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative bg-white rounded-lg shadow-2xl max-w-sm w-full overflow-hidden">
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#1e3a5f] flex items-center justify-center hover:bg-white z-10"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2c5282] text-white p-6 text-center">
          <p className="uppercase tracking-widest text-[#d4a017] text-xs font-semibold mb-2">Admissions Open</p>
          <h3 className="font-serif text-2xl font-bold mb-1">2026–2027</h3>
          <p className="text-sm text-gray-300">Academic Session</p>
        </div>
        <div className="p-6 text-center">
          <p className="text-sm text-gray-600 mb-1">Admission forms available from</p>
          <p className="font-semibold text-[#1e3a5f] mb-4">20th January, 2026</p>
          <Link
            href="/contact"
            onClick={() => setShow(false)}
            className="inline-block bg-[#d4a017] text-[#1e3a5f] font-semibold px-6 py-2.5 rounded-md hover:bg-[#e0ac1f] transition-colors"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
}
