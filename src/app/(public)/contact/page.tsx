"use client";

import { useState } from "react";
import PageBanner from "@/components/PageBanner";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaArrowRight } from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const contactInfo = [
    { icon: FaMapMarkerAlt, title: "Our Address",  detail: "123 Education Road, Knowledge City, State – 400001" },
    { icon: FaPhoneAlt,     title: "Phone",        detail: "+91 98765 43210" },
    { icon: FaEnvelope,     title: "Email",         detail: "info@ourschool.edu.in" },
    { icon: FaClock,        title: "Office Hours",  detail: "Mon – Fri: 8:00 AM – 4:00 PM" },
  ];

  return (
    <div className="bg-slate-50">

      <PageBanner
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="Whether you have questions about admissions, academics or campus life — our team is here to help."
        image="/school.jpg"
      />

      {/* ── CONTACT SECTION ── */}
      <section className="py-20">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Info Cards */}
            <div className="space-y-5">
              {contactInfo.map((item) => (
                <div
                  key={item.title}
                  className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-5"
                >
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#1E3A8A] text-white flex items-center justify-center group-hover:bg-[#D4A017] transition-colors duration-300">
                    <item.icon className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-6">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-xl p-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Send us a Message</h2>
              <div className="w-16 h-1 bg-[#D4A017] rounded-full mb-8" />

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      required
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="How can we help?"
                    required
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your message here..."
                    required
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 h-36 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-3 bg-[#1E3A8A] hover:bg-[#163172] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:shadow-xl disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                  <FaArrowRight />
                </button>

                {status === "success" && (
                  <p className="p-4 bg-green-50 text-green-700 rounded-2xl border border-green-200 font-medium text-sm">
                    ✅ Message sent! We'll get back to you soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-200 font-medium text-sm">
                    ❌ Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
