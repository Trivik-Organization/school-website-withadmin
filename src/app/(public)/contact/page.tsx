"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

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

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] rounded-3xl text-white px-8 py-14 shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>

        <p className="text-blue-100 max-w-2xl leading-7">
          We'd love to hear from you. Whether you have questions about
          admissions, academics or school activities, feel free to get in touch
          with us.
        </p>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
            <div className="text-3xl mb-3">📍</div>
            <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">Address</h3>
            <p className="text-gray-600">
              School Address
              <br />
              City, State - PIN
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
            <div className="text-3xl mb-3">📞</div>
            <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">Phone</h3>
            <p className="text-gray-600">+91 XXXXX XXXXX</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
            <div className="text-3xl mb-3">✉️</div>
            <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">Email</h3>
            <p className="text-gray-600">school@example.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-[#1E3A8A] mb-8">
            Send us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />

            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />

            <textarea
              placeholder="Write your message..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-[#1E3A8A] hover:bg-[#163172] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-green-600 font-medium">
                ✅ Message sent successfully!
              </p>
            )}

            {status === "error" && (
              <p className="text-red-600 font-medium">
                ❌ Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
