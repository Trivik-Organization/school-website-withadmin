import { db } from "@/db/db";
import { notices, events, blogs } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export const revalidate = 0;

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

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1e3a5f] text-white text-center rounded-lg p-12 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Welcome to Our School
        </h1>
        <p className="text-gray-200 max-w-xl mx-auto">
          Providing quality education, fostering innovation, and building
          leaders of tomorrow.
        </p>
      </section>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Latest Notices" viewAllHref="/notices">
          {latestNotices.length === 0 ? (
            <Empty text="No active notices." />
          ) : (
            latestNotices.map((n) => (
              <Item
                key={n.id}
                title={`${n.title} ${n.isPinned ? "📌" : ""}`}
                sub={n.createdAt}
              />
            ))
          )}
        </Card>

        <Card title="Upcoming Events" viewAllHref="/events">
          {latestEvents.length === 0 ? (
            <Empty text="No upcoming events scheduled." />
          ) : (
            latestEvents.map((e) => (
              <Item
                key={e.id}
                title={e.title}
                sub={`📅 ${e.date} | 📍 ${e.location}`}
              />
            ))
          )}
        </Card>

        <Card title="Recent Blog Posts" viewAllHref="/blog">
          {latestBlogs.length === 0 ? (
            <Empty text="No blog posts published yet." />
          ) : (
            latestBlogs.map((b) => (
              <li key={b.id} className="mb-3">
                <Link
                  href={`/blog/${b.id}`}
                  className="font-semibold text-[#1e3a5f] hover:text-[#d4a017]"
                >
                  {b.title}
                </Link>
                <p className="text-xs text-gray-500">By {b.author}</p>
              </li>
            ))
          )}
        </Card>
      </div>
    </div>
  );
}

function Card({
  title,
  viewAllHref,
  children,
}: {
  title: string;
  viewAllHref: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <h2 className="text-lg font-bold text-[#1e3a5f] mb-3 border-b border-[#d4a017] pb-2">
        {title}
      </h2>
      <ul>{children}</ul>
      <Link
        href={viewAllHref}
        className="inline-block mt-3 text-sm font-medium text-[#d4a017] hover:underline"
      >
        View All →
      </Link>
    </section>
  );
}

function Item({ title, sub }: { title: string; sub: string }) {
  return (
    <li className="mb-3">
      <strong className="text-gray-800">{title}</strong>
      <p className="text-xs text-gray-500">{sub}</p>
    </li>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="text-gray-500 text-sm">{text}</p>;
}
