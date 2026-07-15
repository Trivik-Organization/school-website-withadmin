import { db } from "@/db/db";
import { events } from "@/db/schema";
import PageBanner from "@/components/PageBanner";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

export const revalidate = 0;

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return { month: "—", day: "—", full: dateStr };
  return {
    month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    day: String(d.getDate()),
    full: d.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }),
  };
}

export default async function EventsPage() {
  const allEvents = await db.select().from(events);
  const today = new Date().toISOString().split("T")[0];

  const upcoming = allEvents
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  const past = allEvents
    .filter((e) => e.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="bg-slate-50">

      <PageBanner
        eyebrow="Campus Life"
        title="School Events"
        subtitle="Explore upcoming celebrations, competitions, workshops and memorable moments from our school community."
        image="/hero.jpg"
      />

      {/* ── UPCOMING ── */}
      <section className="py-20">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16">

          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Upcoming Events</h2>
            <div className="w-20 h-1 bg-[#D4A017] rounded-full mt-4" />
          </div>

          {upcoming.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-lg py-20 text-center">
              <FaCalendarAlt className="text-6xl text-slate-200 mx-auto mb-5" />
              <h3 className="text-2xl font-bold text-slate-900">No Upcoming Events</h3>
              <p className="text-slate-500 mt-2">Check back soon for exciting activities.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {upcoming.map((event) => {
                const { month, day, full } = formatDate(event.date);
                return (
                  <div
                    key={event.id}
                    className="group bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex"
                  >
                    {/* Date sidebar */}
                    <div className="w-24 shrink-0 bg-gradient-to-b from-[#1E3A8A] to-[#2563EB] text-white flex flex-col items-center justify-center py-6 gap-1">
                      <span className="text-[10px] font-bold text-[#FFD54F] uppercase tracking-widest">{month}</span>
                      <span className="text-4xl font-black leading-none">{day}</span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 p-7">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-[#1E3A8A] text-xs font-bold mb-4">
                        Upcoming
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#1E3A8A] transition-colors mb-3">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 leading-7 text-sm mb-5 line-clamp-2">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-[#D4A017]" /> {event.location}</span>
                        <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-[#D4A017]" /> {full}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* ── PAST EVENTS ── */}
      {past.length > 0 && (
        <section className="py-20 bg-white">
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16">

            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Past Events</h2>
              <div className="w-20 h-1 bg-[#D4A017] rounded-full mt-4" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event) => {
                const { month, day } = formatDate(event.date);
                return (
                  <div
                    key={event.id}
                    className="bg-slate-50 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                  >
                    <div className="h-1.5 bg-slate-300" />
                    <div className="p-7">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-600 flex flex-col items-center justify-center text-center">
                          <span className="text-[9px] font-bold uppercase leading-none">{month}</span>
                          <span className="text-lg font-black leading-none mt-0.5">{day}</span>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-bold">
                          Completed
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-700 mb-2">{event.title}</h3>
                      <p className="text-gray-500 text-sm leading-6 mb-4 line-clamp-2">{event.description}</p>
                      <span className="flex items-center gap-1.5 text-sm text-slate-400">
                        <FaMapMarkerAlt className="shrink-0" /> {event.location}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

    </div>
  );
}
