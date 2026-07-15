import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { FaFileAlt, FaCheckCircle, FaGraduationCap, FaMoneyCheckAlt, FaArrowRight } from "react-icons/fa";

export default function AdmissionsPage() {
  return (
    <div className="bg-slate-50">

      <PageBanner
        eyebrow="Join Our Community"
        title="Admissions"
        subtitle="Take the first step towards a bright future. Explore our admission process, eligibility criteria and opportunities."
        image="/school.jpg"
      />

      {/* ── PROCESS ── */}
      <section className="py-20">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16">

          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Admission Process</h2>
            <div className="w-20 h-1 bg-[#D4A017] rounded-full mt-4 mx-auto" />
            <p className="text-gray-500 mt-6 text-lg max-w-xl mx-auto">
              A simple, transparent 4-step process to get your child enrolled.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaFileAlt,       step: "01", title: "Application",  desc: "Submit the inquiry form online or collect an application kit from our campus." },
              { icon: FaCheckCircle,   step: "02", title: "Assessment",   desc: "A brief interactive session to understand the child's current learning level." },
              { icon: FaGraduationCap, step: "03", title: "Interview",    desc: "A meeting with the Principal and parents to align on educational goals." },
              { icon: FaMoneyCheckAlt, step: "04", title: "Enrollment",   desc: "Complete documentation and fee payment to officially secure admission." },
            ].map((item) => (
              <div key={item.title} className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#1E3A8A] text-white flex items-center justify-center text-xl mb-6 shadow-lg group-hover:bg-[#D4A017] transition-colors duration-300">
                  <item.icon />
                </div>
                <span className="text-xs font-bold text-[#D4A017] uppercase tracking-widest">Step {item.step}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-2 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-7 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── ELIGIBILITY + FEES ── */}
      <section className="py-20 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16">
          <div className="grid lg:grid-cols-2 gap-10">

            {/* Eligibility */}
            <div className="rounded-3xl bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] p-10 text-white shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Eligibility Criteria</h2>
              <div className="w-16 h-1 bg-[#D4A017] rounded-full mb-8" />
              <ul className="space-y-6">
                {[
                  ["Age Requirement", "Pre-Primary students must be 3+ years old by March 31st of the academic year."],
                  ["Previous Records", "Valid report cards and transfer certificates from a recognised school (Grade 2+)."],
                  ["Medical Fitness",  "Submission of a recent medical fitness certificate and vaccination records."],
                ].map(([title, desc]) => (
                  <li key={title} className="flex gap-4">
                    <div className="mt-1 w-6 h-6 shrink-0 rounded-full bg-[#D4A017] text-[#0F172A] flex items-center justify-center font-bold text-xs">✓</div>
                    <div>
                      <strong className="block font-bold mb-1">{title}</strong>
                      <span className="text-blue-100 text-sm leading-6">{desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fee Overview */}
            <div className="bg-slate-50 rounded-3xl border border-slate-100 p-10 shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Fee Overview</h2>
              <div className="w-16 h-1 bg-[#D4A017] rounded-full mb-8" />
              <p className="text-gray-600 leading-7 text-sm mb-8">
                Our fee structure is transparent with no hidden charges. Detailed grade-wise fees are provided after successful registration.
              </p>
              <div className="space-y-4">
                {[
                  ["Registration Fee (One-time)", "₹ 5,000"],
                  ["Admission Fee (One-time)",    "₹ 25,000"],
                  ["Tuition Fee (Quarterly)",     "Varies by Grade"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <span className="font-semibold text-slate-800 text-sm">{label}</span>
                    <span className="font-bold text-[#1E3A8A] text-sm">{value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-2xl p-4 leading-6">
                <strong>Note:</strong> Detailed fee structures are provided during the campus tour.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16">
          <div className="rounded-3xl bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#60A5FA] text-white text-center px-8 py-20 shadow-2xl">
            <p className="uppercase tracking-[4px] text-yellow-300 font-semibold mb-3 text-sm">Admissions Open</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Ready to Apply?</h2>
            <p className="max-w-2xl mx-auto text-blue-100 leading-8 mb-10">
              Seats are limited. Submit your inquiry today and our counselors will guide you through every step.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#D4A017] text-[#0F172A] px-10 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Enquire Now <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
