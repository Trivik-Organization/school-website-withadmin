import { db } from "@/db/db";
import { events } from "@/db/schema";
import { asc, desc } from "drizzle-orm";

export const revalidate = 0;

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
    <div className="space-y-12">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] rounded-3xl text-white px-8 py-14 shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">School Events</h1>

        <p className="text-blue-100 max-w-2xl leading-7">
          Explore our upcoming events, celebrations, competitions, workshops,
          and memorable moments that make our school community vibrant.
        </p>
      </section>

      {/* Upcoming Events */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🎉</span>
          <h2 className="text-3xl font-bold text-[#1E3A8A]">Upcoming Events</h2>
        </div>

        {upcoming.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 py-16 text-center">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-2xl font-semibold text-[#1E3A8A]">
              No Upcoming Events
            </h3>
            <p className="text-gray-500 mt-2">
              Stay tuned for exciting activities.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {upcoming.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="h-2 bg-gradient-to-r from-blue-700 to-blue-500" />

                <div className="p-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
                    Upcoming
                  </div>

                  <h3 className="text-2xl font-bold text-[#1E3A8A] mb-3">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 leading-7 mb-6">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>📅 {event.date}</span>
                    <span>📍 {event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Past Events */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">📖</span>
          <h2 className="text-3xl font-bold text-[#1E3A8A]">Past Events</h2>
        </div>

        {past.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 py-16 text-center">
            <div className="text-5xl mb-4">🗂️</div>
            <h3 className="text-2xl font-semibold text-[#1E3A8A]">
              No Past Events
            </h3>
            <p className="text-gray-500 mt-2">
              Completed events will appear here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {past.map((event) => (
              <div
                key={event.id}
                className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="h-2 bg-gray-400" />

                <div className="p-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mb-4">
                    Completed
                  </div>

                  <h3 className="text-2xl font-bold text-gray-700 mb-3">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 leading-7 mb-6">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>📅 {event.date}</span>
                    <span>📍 {event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
