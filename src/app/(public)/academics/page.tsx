import PageBanner from "@/components/PageBanner";
import { FaBookReader, FaFlask, FaLaptopCode, FaGlobeAmericas, FaPalette, FaAtom } from "react-icons/fa";

export default function AcademicsPage() {
  return (
    <div className="bg-slate-50">

      <PageBanner
        eyebrow="Learning & Growth"
        title="Academics"
        subtitle="A rigorous, innovative and holistic curriculum designed to prepare students for a successful 21st-century life."
        image="/hero.jpg"
      />

      {/* ── METHODOLOGY ── */}
      <section className="py-20">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            <div>
              <p className="uppercase tracking-[4px] text-[#D4A017] font-bold text-sm mb-4">OUR APPROACH</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Learning Beyond<br />the Classroom
              </h2>
              <div className="w-20 h-1 bg-[#D4A017] rounded-full mt-4" />
              <div className="mt-8 space-y-5 text-gray-600 text-lg leading-8">
                <p>
                  Our curriculum stimulates intellectual curiosity and fosters a love of lifelong learning through hands-on activities and collaborative problem-solving — not just textbooks.
                </p>
                <p>
                  With small class sizes and personalized attention, our expert faculty ensures every student's unique learning style is recognised and nurtured.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: FaFlask,         label: "Experiential",   bg: "bg-blue-50",   color: "text-[#1E3A8A]" },
                { icon: FaLaptopCode,    label: "Tech-Driven",    bg: "bg-amber-50",  color: "text-[#D4A017]" },
                { icon: FaBookReader,    label: "Research Based", bg: "bg-green-50",  color: "text-green-700" },
                { icon: FaGlobeAmericas, label: "Global Focus",   bg: "bg-purple-50", color: "text-purple-700" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`${item.bg} rounded-3xl p-8 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                >
                  <item.icon className={`text-4xl mx-auto mb-4 ${item.color}`} />
                  <h3 className="font-bold text-slate-900 text-sm">{item.label}</h3>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── CURRICULUM LEVELS ── */}
      <section className="py-20 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16">

          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Curriculum Levels</h2>
            <div className="w-20 h-1 bg-[#D4A017] rounded-full mt-4 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: "🎒",
                title: "Primary School",
                grades: "Grades 1 – 5",
                desc: "Building a strong foundation in literacy, numeracy and environmental awareness through play-based, interactive learning.",
                subjects: ["Language Arts", "Mathematics", "Environmental Science"],
              },
              {
                emoji: "📚",
                title: "Middle School",
                grades: "Grades 6 – 8",
                desc: "Transitioning to structured disciplines — fostering independent thinking, research skills, and collaborative projects.",
                subjects: ["Advanced Sciences", "Social Studies & History", "Foreign Languages"],
              },
              {
                emoji: "🎓",
                title: "High School",
                grades: "Grades 9 – 12",
                desc: "Rigorous academic preparation for higher education with specialised streams and professional career counseling.",
                subjects: ["STEM Focus", "Commerce & Humanities", "Board Exam Prep"],
              },
            ].map((level) => (
              <div
                key={level.title}
                className="group bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-10"
              >
                <div className="text-5xl mb-5">{level.emoji}</div>
                <h3 className="text-xl font-bold text-[#1E3A8A] mb-1">{level.title}</h3>
                <p className="text-[#D4A017] font-bold text-xs uppercase tracking-widest mb-5">{level.grades}</p>
                <p className="text-gray-600 leading-7 text-sm mb-6">{level.desc}</p>
                <ul className="space-y-2">
                  {level.subjects.map((s) => (
                    <li key={s} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                      <div className="w-2 h-2 rounded-full bg-[#1E3A8A] shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── DEPARTMENTS ── */}
      <section className="py-20">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16">
          <div className="rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#2563EB] text-white px-8 md:px-16 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold">Academic Departments</h2>
              <div className="w-20 h-1 bg-[#D4A017] rounded-full mt-4 mx-auto" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: FaAtom,       title: "Sciences",   desc: "Physics, Chemistry, Biology with state-of-the-art labs." },
                { icon: FaLaptopCode, title: "Technology", desc: "Computer Science, AI basics, and digital literacy." },
                { icon: FaBookReader, title: "Humanities", desc: "History, Geography, Economics, and Social Sciences." },
                { icon: FaPalette,    title: "Fine Arts",  desc: "Visual arts, music, drama, and creative expression." },
              ].map((dept) => (
                <div key={dept.title} className="group bg-white/10 rounded-3xl p-8 border border-white/10 hover:bg-white/20 transition-all duration-300 text-center">
                  <dept.icon className="text-4xl text-[#FFD54F] mx-auto mb-5" />
                  <h3 className="text-lg font-bold mb-3">{dept.title}</h3>
                  <p className="text-blue-100 text-sm leading-6">{dept.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
