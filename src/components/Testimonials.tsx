"use client";

import { useEffect, useState, useCallback } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  { quote: "My daughter has grown so much in confidence and discipline since joining. The teachers genuinely care about every child.", name: "Parent, Class V" },
  { quote: "A school that truly balances academics with values. We couldn't have asked for a better environment for our son.", name: "Parent, Class VIII" },
  { quote: "The dedication of the faculty and the warmth of the community make this school feel like family.", name: "Parent, LKG" },
  { quote: "We are continually impressed by the modern facilities and the innovative approach to learning here.", name: "Parent, Class X" },
  { quote: "The extracurricular programs have allowed my children to discover hidden talents. Highly recommended!", name: "Parent, Class VI" },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = useCallback(() => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  return (
    <div className="relative max-w-7xl mx-auto px-4 overflow-hidden py-10">
      <div className="flex justify-center items-center h-[380px] relative">
        {testimonials.map((testimonial, i) => {
          let offset = i - activeIndex;
          if (offset < -Math.floor(testimonials.length / 2)) {
            offset += testimonials.length;
          }
          if (offset > Math.floor(testimonials.length / 2)) {
            offset -= testimonials.length;
          }

          const isActive = offset === 0;
          const isPrev = offset === -1 || (offset < 0 && testimonials.length === 2);
          const isNext = offset === 1 || (offset > 0 && testimonials.length === 2);
          
          let translate = 'translateX(0)';
          let scale = 1;
          let opacity = 1;
          let zIndex = 10;
          
          if (isActive) {
            translate = 'translateX(0)';
            scale = 1.05;
            opacity = 1;
            zIndex = 20;
          } else if (isPrev) {
            translate = 'translateX(-110%)';
            scale = 0.85;
            opacity = 0.6;
            zIndex = 10;
          } else if (isNext) {
            translate = 'translateX(110%)';
            scale = 0.85;
            opacity = 0.6;
            zIndex = 10;
          } else {
            translate = offset < 0 ? 'translateX(-200%)' : 'translateX(200%)';
            scale = 0.7;
            opacity = 0;
            zIndex = 0;
          }

          return (
            <div
              key={i}
              className="absolute w-full max-w-[320px] sm:max-w-[400px] transition-all duration-500 ease-in-out cursor-pointer"
              style={{
                transform: `${translate} scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
              }}
              onClick={() => setActiveIndex(i)}
            >
              <div
                className={`bg-white rounded-3xl p-8 shadow-xl border ${
                  isActive ? "border-[#D4A017] shadow-2xl" : "border-slate-200"
                } h-full flex flex-col`}
              >
                <div className={`text-4xl mb-4 transition-colors ${isActive ? "text-[#D4A017]" : "text-slate-300"}`}>
                  <FaQuoteLeft />
                </div>
                <p className="text-gray-700 text-lg leading-relaxed italic mb-6 flex-1">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-bold ${isActive ? "text-[#1E3A8A]" : "text-slate-500"}`}>
                      {testimonial.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center gap-6 mt-8">
        <button 
          onClick={prevTestimonial}
          className="w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white transition duration-300 border border-slate-200"
        >
          <FaChevronLeft />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
             <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-3 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-[#D4A017] w-8" : "bg-gray-300 w-3"
              }`}
            />
          ))}
        </div>
        <button 
          onClick={nextTestimonial}
          className="w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white transition duration-300 border border-slate-200"
        >
           <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
