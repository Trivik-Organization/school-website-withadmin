import { db } from "@/db/db";
import { notices, events, blogs, gallery } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import AdmissionPopup from "@/components/AdmissionPopup";
import Testimonials from "@/components/Testimonials";
import {
  FaSchool,
  FaBookOpen,
  FaChalkboardTeacher,
  FaTrophy,
  FaBullseye,
  FaEye,
  FaLightbulb,
  FaBus,
  FaLaptopCode,
  FaFutbol,
  FaPlay,
  FaArrowRight,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { MdOutlineScience } from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsPinAngleFill } from "react-icons/bs";
import { FiImage, FiArrowRight } from "react-icons/fi";

export const revalidate = 0;

function monthDay(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return { month: "—", day: "—" };
  return {
    month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    day: d.getDate(),
  };
}

export default async function HomePage() {
  const latestNotices = await db
    .select()
    .from(notices)
    .orderBy(desc(notices.createdAt))
    .limit(3);
  const latestEvents = await db
    .select()
    .from(events)
    .orderBy(desc(events.date))
    .limit(3);
  const latestBlogs = await db
    .select()
    .from(blogs)
    .orderBy(desc(blogs.createdAt))
    .limit(3);
  const galleryPreview = await db.select().from(gallery).limit(6);

  const quickLinks = [
    { icon: FaSchool, title: "Who We Are", href: "/about" },
    { icon: HiOutlineAcademicCap, title: "Admissions", href: "/contact" },
    { icon: FaBookOpen, title: "Academics", href: "/notices" },
    { icon: IoDocumentTextOutline, title: "School Life", href: "/events" },
  ];

  const featured = latestEvents[0];
  const rest = latestEvents.slice(1);

  return (
    <div className="bg-slate-50">
      <AdmissionPopup />

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-[#0F172A]/70" />

        <div className="relative w-full max-w-[1600px] mx-auto px-6 lg:px-10 xl:px-16 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

            <div className="text-white">
              <p className="uppercase tracking-[5px] text-[#D4A017] font-semibold mb-4">
                Welcome To Our School
              </p>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Building Future
                <span className="block text-[#D4A017]">
                  Leaders
                </span>
              </h1>

              <p className="text-gray-200 text-lg mt-8 max-w-xl leading-8">
                We provide academic excellence, strong values, modern
                education and holistic development that prepares every
                student for tomorrow.
              </p>

              <div className="flex flex-wrap gap-5 mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#D4A017] text-[#0F172A] px-8 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300"
                >
                  Apply Now
                  <FaArrowRight />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 border border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#0F172A] transition-all duration-300"
                >
                  Learn More
                  <FiArrowRight />
                </Link>
              </div>
            </div>

            <div>
              <HeroSlider />
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK LINKS ================= */}

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

            {quickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-500 text-center"
              >
                <link.icon className="mx-auto text-5xl text-[#1E3A8A] group-hover:text-[#D4A017] transition-colors" />

                <h3 className="mt-5 text-lg font-semibold text-slate-800">
                  {link.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WELCOME ================= */}

      <section className="py-24">
        <div className="w-full px-6 lg:px-16 py-20 space-y-28">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div className="relative overflow-hidden rounded-3xl shadow-2xl h-[520px]">

              <img
                src="/school.jpg"
                alt="School"
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-3xl font-bold">
                  Excellence Since 1998
                </h3>

                <p className="text-white/80 mt-2">
                  Inspiring Young Minds Every Day
                </p>
              </div>
            </div>

            <div>

              <p className="uppercase tracking-[4px] text-[#D4A017] font-bold text-sm">
                ABOUT US
              </p>

              <h2 className="text-5xl font-bold text-slate-900 mt-4 leading-tight">
                Welcome To
                <br />
                Our School
              </h2>

              <div className="w-24 h-1 bg-[#D4A017] rounded-full mt-6" />

              <p className="mt-8 text-gray-600 leading-8 text-lg">
                Our school is committed to providing quality education,
                discipline, character building and modern learning
                experiences. We nurture every child with care,
                innovation and academic excellence.
              </p>

              <Link
                href="/about"
                className="inline-flex items-center gap-3 mt-10 bg-[#1E3A8A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#163f9f] transition"
              >
                Learn More
                <FiArrowRight />
              </Link>

            </div>

          </div>

        </div>
      </section>

      <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-8 xl:px-10 space-y-24">

      {/* ===================== Notices & Events ===================== */}
      <section className="py-20">
        <div className="flex items-center justify-between mb-10">
          <SectionHeading title="Latest News & Events" />

          <Link
            href="/events"
            className="hidden md:flex items-center gap-2 text-[#1E40AF] font-semibold hover:text-[#F59E0B] transition"
          >
            View All
            <FaArrowRight />
          </Link>
        </div>


        <div className="grid lg:grid-cols-3 gap-8">

          {/* Featured Event */}
          <div className="lg:col-span-2">
            {featured ? (
              <Link
                href="/events"
                className="group relative block h-[420px] rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6]" />

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all" />

                <div className="absolute top-6 left-6 bg-white rounded-2xl px-5 py-3 text-center shadow-xl">
                  <p className="text-xs font-bold text-[#F59E0B]">
                    {monthDay(featured.date).month}
                  </p>

                  <p className="text-3xl font-bold text-[#1E3A8A]">
                    {monthDay(featured.date).day}
                  </p>
                </div>

                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="uppercase tracking-widest text-[#FBBF24] text-xs mb-2">
                    Upcoming Event
                  </p>

                  <h3 className="text-3xl font-bold mb-3">
                    {featured.title}
                  </h3>

                  <p className="flex items-center gap-2 text-white/90">
                    <FaMapMarkerAlt />
                    {featured.location}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 font-semibold text-[#FBBF24]">
                    Learn More
                    <FaArrowRight />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 h-[420px] flex items-center justify-center text-slate-500">
                No events available.
              </div>
            )}
          </div>

          {/* Events + Notices */}
          <div className="space-y-5">

            {rest.map((e) => {
              const { month, day } = monthDay(e.date);

              return (
                <Link
                  key={e.id}
                  href="/events"
                  className="group flex gap-4 bg-white rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
                >
                  <div className="w-16 h-16 rounded-xl bg-[#1E3A8A] text-white flex flex-col justify-center items-center">
                    <span className="text-[11px] text-[#FBBF24] font-bold">
                      {month}
                    </span>

                    <span className="text-xl font-bold">
                      {day}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 group-hover:text-[#1E40AF]">
                      {e.title}
                    </h4>

                    <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                      <FaMapMarkerAlt />
                      {e.location}
                    </p>
                  </div>
                </Link>
              );
            })}

            {latestNotices.slice(0, 2).map((n) => (
              <Link
                key={n.id}
                href="/notices"
                className="flex gap-4 items-center bg-amber-50 border border-amber-200 rounded-2xl p-5 hover:bg-white transition"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F59E0B] text-white flex items-center justify-center">
                  <BsPinAngleFill />
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800">
                    {n.title}
                  </h4>

                  <p className="text-xs text-slate-500">
                    {String(n.createdAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-6 py-3 rounded-xl hover:bg-[#163C91] transition"
          >
            View All Events
            <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* ===================== Blog ===================== */}
      {latestBlogs.length > 0 && (
        <section className="py-20">
          <div className="flex items-center justify-between mb-10">
            <SectionHeading title="Latest Articles" />

            <Link
              href="/blog"
              className="hidden md:flex items-center gap-2 text-[#1E40AF] font-semibold hover:text-[#F59E0B]"
            >
              View All
              <FaArrowRight />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestBlogs.map((b) => (
              <Link
                key={b.id}
                href={`/blog/${b.id}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >
                <div className="h-52 bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#60A5FA] flex items-center justify-center">
                  <span className="text-7xl font-black text-white/15">
                    BLOG
                  </span>
                </div>

                <div className="p-7">
                  <p className="text-xs uppercase tracking-widest text-[#F59E0B] font-bold mb-2">
                    School Blog
                  </p>

                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#1E40AF]">
                    {b.title}
                  </h3>

                  <p className="text-sm text-slate-500 mb-6">
                    By {b.author}
                  </p>

                  <div className="inline-flex items-center gap-2 text-[#1E40AF] font-semibold group-hover:text-[#F59E0B]">
                    Read Article
                    <FaArrowRight className="group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-16">
        <SectionHeading title="Why Choose Our School" />

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-10">
          {[
            {
              icon: FaSchool,
              title: "Modern Campus",
              desc: "Beautiful classrooms and smart learning spaces.",
            },
            {
              icon: FaChalkboardTeacher,
              title: "Expert Teachers",
              desc: "Experienced educators helping students succeed.",
            },
            {
              icon: FaLaptopCode,
              title: "Digital Learning",
              desc: "Interactive technology driven education.",
            },
            {
              icon: FaTrophy,
              title: "Outstanding Results",
              desc: "Excellent academic and extracurricular achievements.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-3xl bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] p-8 text-center text-white shadow-xl hover:scale-105 duration-300"
            >
              <item.icon className="text-6xl mx-auto mb-5 text-[#FFD54F]" />

              <h3 className="text-xl font-bold mb-3">{item.title}</h3>

              <p className="text-blue-100">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="flex justify-between items-center">
          <SectionHeading title="Campus Gallery" />

          <Link
            href="/gallery"
            className="font-semibold text-[#1E3A8A] hover:text-[#d4a017]"
          >
            View All →
          </Link>
        </div>

        {galleryPreview.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {galleryPreview.slice(0,6).map((item) => (
              <Link
                key={item.id}
                href="/gallery"
                className="overflow-hidden rounded-3xl group shadow-xl"
              >
                {item.type === "photo" ? (
                  <img
                    src={item.url}
                    alt=""
                    className="h-72 w-full object-cover group-hover:scale-110 duration-500"
                  />
                ) : (
                  <div className="h-72 bg-[#1E3A8A] flex items-center justify-center">
                    <FaPlay className="text-white text-5xl" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Facilities */}
      <section className="py-16">
        <SectionHeading title="World Class Facilities" />

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {[
            { icon: FaBookOpen, title: "Library" },
            { icon: MdOutlineScience, title: "Science Lab" },
            { icon: FaLaptopCode, title: "Computer Lab" },
            { icon: FaFutbol, title: "Sports Complex" },
            { icon: FaBus, title: "Transport" },
            { icon: FaSchool, title: "Health Centre" },
          ].map((facility) => (
            <div
              key={facility.title}
              className="group bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-3 duration-300"
            >
              <facility.icon className="text-6xl text-[#1E3A8A] mx-auto mb-5 group-hover:text-[#d4a017]" />

              <h3 className="text-xl font-bold text-[#1E3A8A]">
                {facility.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <SectionHeading title="What Parents Say" />

        <div className="mt-10">
          <Testimonials />
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#2563EB] text-white px-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            Building Bright Futures
          </h2>

          <p className="text-blue-100 leading-8">
            We believe education is more than academics. Our mission is to nurture
            confident, responsible and compassionate individuals prepared to excel in
            every stage of life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-14">

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 hover:bg-white/20 duration-300">
            <FaBullseye className="text-5xl text-[#FFD54F] mb-5" />
            <h3 className="text-2xl font-bold mb-3">
              Our Mission
            </h3>
            <p className="text-blue-100">
              Deliver quality education while nurturing discipline, creativity and
              lifelong learning.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 hover:bg-white/20 duration-300">
            <FaEye className="text-5xl text-[#FFD54F] mb-5" />
            <h3 className="text-2xl font-bold mb-3">
              Our Vision
            </h3>
            <p className="text-blue-100">
              Inspire students to become confident global citizens with strong moral
              values and leadership qualities.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 hover:bg-white/20 duration-300">
            <FaLightbulb className="text-5xl text-[#FFD54F] mb-5" />
            <h3 className="text-2xl font-bold mb-3">
              Our Values
            </h3>
            <p className="text-blue-100">
              Excellence, Integrity, Innovation, Respect and Compassion guide
              everything we do.
            </p>
          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="rounded-[40px] overflow-hidden bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#60A5FA] text-white text-center px-8 py-24 shadow-2xl">

          <p className="uppercase tracking-[4px] text-yellow-300 font-semibold mb-3">
            Admissions Open
          </p>

          <h2 className="text-5xl font-bold mb-6">
            Ready to Join Our School?
          </h2>

          <p className="max-w-3xl mx-auto text-blue-100 leading-8 text-lg">
            Give your child an education that inspires excellence, creativity,
            leadership and lifelong success. Join our vibrant school community today.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-10">

            <Link
              href="/contact"
              className="bg-white text-[#1E3A8A] px-10 py-4 rounded-full font-bold hover:scale-105 duration-300 shadow-xl flex items-center gap-3"
            >
              Apply Now
              <FaArrowRight />
            </Link>

            <Link
              href="/about"
              className="border-2 border-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-[#1E3A8A] duration-300 flex items-center gap-3"
            >
              Learn More
              <FaArrowRight />
            </Link>

          </div>

        </div>
      </section>
      </div>
      </div>
    );
   }

  function SectionHeading({ title }: { title: string }) {
    return (
      <div>
        <h2 className="text-4xl font-bold text-slate-900">
          {title}
        </h2>
        <div className="w-20 h-1 bg-[#D4A017] rounded-full mt-3" />
      </div>
    );
  }

  function Empty({ text }: { text: string }) {
    return (
      <p className="text-gray-500">
        {text}
      </p>
    );
  }
