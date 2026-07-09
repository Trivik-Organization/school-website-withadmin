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
    <div>
      <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8 border-b-4 border-[#d4a017] inline-block pb-2">
        Events
      </h1>

      <h2 className="text-xl font-semibold text-[#1e3a5f] mb-4">Upcoming Events</h2>
      {upcoming.length === 0 ? (
        <p className="text-gray-500 mb-10">No upcoming events scheduled.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 mb-10">
          {upcoming.map((event) => (
            <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-[#1e3a5f]">{event.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
              <p className="text-xs text-gray-500 mt-3">📅 {event.date} | 📍 {event.location}</p>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-xl font-semibold text-[#1e3a5f] mb-4">Past Events</h2>
      {past.length === 0 ? (
        <p className="text-gray-500">No past events yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {past.map((event) => (
            <div key={event.id} className="bg-gray-50 border border-gray-200 rounded-lg p-5 opacity-80">
              <h3 className="text-lg font-semibold text-gray-700">{event.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{event.description}</p>
              <p className="text-xs text-gray-400 mt-3">📅 {event.date} | 📍 {event.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
