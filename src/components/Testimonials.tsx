"use client";

import { useEffect, useState } from "react";

const testimonials = [
  { quote: "My daughter has grown so much in confidence and discipline since joining. The teachers genuinely care about every child.", name: "Parent, Class V" },
  { quote: "A school that truly balances academics with values. We couldn't have asked for a better environment for our son.", name: "Parent, Class VIII" },
  { quote: "The dedication of the faculty and the warmth of the community make this school feel like family.", name: "Parent, LKG" },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-10 text-center max-w-2xl mx-auto">
      <div className="text-4xl text-[#d4a017] mb-3">"</div>
      <p className="text-gray-700 text-lg leading-relaxed italic mb-5 min-h-[80px]">{current.quote}</p>
      <p className="text-sm font-semibold text-[#1e3a5f]">{current.name}</p>
      <div className="flex justify-center gap-2 mt-5">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Testimonial ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors ${i === index ? "bg-[#d4a017]" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}
