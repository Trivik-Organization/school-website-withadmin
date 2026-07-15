import Link from "next/link";
import {
  FaBullseye,
  FaEye,
  FaLightbulb,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaTrophy,
  FaArrowRight,
} from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

// ─── Reusable components local to this file ───────────────────────────────────

function PageBanner({
  eyebrow,
  title,
  subtitle,
  image = "/hero.jpg",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image?: string;
}) {
  return (
    <div className="w-full bg-[#0F172A] relative overflow-hidden" style={{ minHeight: 420 }}>
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none select-none"
      />
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16 py-32 text-center text-white">
        <p className="uppercase tracking-[5px] text-[#D4A017] font-semibold mb-4 text-sm">
          {eyebrow}
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">{title}</h1>
        <p className="mt-6 text-blue-100 text-lg max-w-2xl mx-auto leading-8">{subtitle}</p>
      </div>
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return <p className="uppercase tracking-[4px] text-[#D4A017] font-bold text-sm mb-4">{text}</p>;
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div>
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{title}</h2>
      <div className="w-20 h-1 bg-[#D4A017] rounded-full mt-4" />
    </div>
  );
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16 ${className}`}>
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="bg-slate-50">

      <PageBanner
        eyebrow="Discover Our Legacy"
        title="About Our School"
        subtitle="Building bright minds through quality education, strong values, and an environment where every student grows with confidence."
        image="/school.jpg"
      />

      {/* ── OUR STORY ── */}
      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: 460 }}>
              <img
                src="/school.jpg"
                alt="Our school building"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-5xl font-black text-[#D4A017]">25+</p>
                <p className="text-lg font-semibold mt-1">Years of Excellence</p>
              </div>
            </div>

            {/* Text */}
            <div>
              <SectionLabel text="OUR STORY" />
              <SectionHeading title="A Legacy of Excellence Since 1998" />
              <div className="mt-8 space-y-5 text-gray-600 text-lg leading-8">
                <p>
                  Established over two decades ago, our school has been at the forefront of exceptional education — growing from a small community initiative into a premier institution recognised for academic rigour and holistic development.
                </p>
                <p>
                  We believe education is not just about textbooks but about nurturing curiosity, building character, and instilling a lifelong love for learning.
                </p>
              </div>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-3 mt-10 bg-[#1E3A8A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#163f9f] transition-all duration-300 hover:shadow-xl"
              >
                Join Our Community <FiArrowRight />
              </Link>
            </div>

          </div>
        </Container>
      </section>

      {/* ── MISSION / VISION / VALUES ── */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-14">
            <SectionHeading title="Our Guiding Principles" />
            <div className="flex justify-center mt-0">
              {/* heading already has the gold bar */}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FaBullseye,
                title: "Our Mission",
                desc: "To provide quality education that inspires creativity, develops character, and prepares students to become responsible global citizens.",
                dark: false,
              },
              {
                icon: FaEye,
                title: "Our Vision",
                desc: "To become a leading institution where academic excellence, innovation, leadership, and lifelong learning flourish together.",
                dark: true,
              },
              {
                icon: FaLightbulb,
                title: "Our Values",
                desc: "Integrity, empathy, excellence, and collaboration guide every action. We foster respect and encourage unique talents.",
                dark: false,
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`group rounded-3xl p-10 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ${
                  item.dark
                    ? "bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] text-white"
                    : "bg-slate-50 border border-slate-100 text-slate-800"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md group-hover:scale-110 transition-transform duration-300 ${
                    item.dark ? "bg-white/20 text-[#FFD54F]" : "bg-[#1E3A8A] text-white"
                  }`}
                >
                  <item.icon />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${item.dark ? "text-white" : "text-[#1E3A8A]"}`}>
                  {item.title}
                </h3>
                <p className={`leading-7 ${item.dark ? "text-blue-100" : "text-gray-600"}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20">
        <Container>
          <div className="rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#2563EB] text-white px-8 md:px-16 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold">Why Choose Our School?</h2>
              <div className="w-20 h-1 bg-[#D4A017] rounded-full mt-4 mx-auto" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: FaChalkboardTeacher, title: "Expert Faculty",     desc: "Highly qualified and passionate educators dedicated to your child." },
                { icon: FaLaptopCode,        title: "Modern Curriculum",  desc: "Tech-integrated learning designed for the 21st century." },
                { icon: FaTrophy,            title: "Proven Results",     desc: "Consistent top-tier academic and extracurricular performance." },
                { icon: FaLightbulb,         title: "Holistic Growth",    desc: "Sports, arts, and life skills cultivated alongside academics." },
              ].map((item) => (
                <div key={item.title} className="text-center group">
                  <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-[#D4A017] group-hover:scale-110 transition-all duration-300">
                    <item.icon className="text-3xl" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-blue-100 text-sm leading-6">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── PRINCIPAL'S MESSAGE ── */}
      <section className="py-20 bg-white">
        <Container>
          <div className="bg-slate-50 rounded-3xl border border-slate-100 shadow-lg p-10 lg:p-14">
            <div className="grid md:grid-cols-3 gap-10 items-center">

              {/* Photo placeholder */}
              <div className="flex justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] flex flex-col items-center justify-center text-white border-4 border-white shadow-2xl">
                  <FaChalkboardTeacher className="text-5xl mb-2 opacity-80" />
                  <span className="text-xs font-medium opacity-70">Principal</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <SectionLabel text="FROM THE DESK OF" />
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Principal's Message</h2>
                <blockquote className="text-gray-600 text-lg leading-8 italic border-l-4 border-[#D4A017] pl-6">
                  "Education is not only about academic success, but about nurturing confidence, discipline, compassion, and curiosity. We believe every child possesses unique potential, and our responsibility is to help them discover it."
                </blockquote>
                <div className="mt-8">
                  <p className="font-bold text-xl text-slate-900">Dr. Sarah Jenkins</p>
                  <p className="text-[#D4A017] font-semibold mt-1">Principal, Our School</p>
                </div>
              </div>

            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}
