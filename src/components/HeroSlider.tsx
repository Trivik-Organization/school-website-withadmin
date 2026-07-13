"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const taglines = [
  { title: "Quality Education", text: "Providing holistic education that nurtures knowledge, character, discipline, and leadership among students." },
  { title: "Academic Excellence", text: "Encouraging students to achieve high academic standards through dedicated teachers and modern methods." },
  { title: "Character Formation", text: "Instilling moral values, responsibility, and integrity to shape compassionate, responsible citizens." },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % taglines.length), 4500);
    return () => clearInterval(timer);
  }, []);

  const current = taglines[index];

  return (
    <div className="relative z-10 max-w-xl">
      <span className="inline-block bg-[#d4a017] text-[#1e3a5f] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
        Welcome to Our School
      </span>
      <h1 className="font-serif text-4xl md:text-6xl font-bold mb-5 leading-tight text-white min-h-[1.2em] md:min-h-[2.4em]">
        {current.title}
      </h1>
      <p className="text-gray-200 text-lg mb-8 min-h-[3.5em]">{current.text}</p>
      <div className="flex flex-wrap gap-4 mb-8">
        <Link href="/contact" className="bg-[#d4a017] text-[#1e3a5f] font-semibold px-6 py-3 rounded-md hover:bg-[#e0ac1f] transition-colors">
          Get in Touch
        </Link>
        <Link href="/about" className="border border-white/40 text-white px-6 py-3 rounded-md hover:bg-white/10 transition-colors">
          About Our School
        </Link>
      </div>
      <div className="flex gap-2">
        {taglines.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`w-8 h-1 rounded-full transition-colors ${i === index ? "bg-[#d4a017]" : "bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}
