import { db } from "@/db/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogId = Number(id);

  const [blogs] = await db.select().from(blogs).where(eq(blogs.id, blogsId));

  if (!blogs) {
    notFound();
  }

  return (
    <article className="space-y-10">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] rounded-3xl text-white px-8 py-14 shadow-xl">
        <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-5">
          📰 School News
        </span>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          {blogs.title}
        </h1>

        <div className="flex flex-wrap gap-6 text-blue-100 text-sm">
          <span>👤 {blogs.author}</span>
          <span>📅 {new Date(blogs.createdAt).toLocaleDateString()}</span>
        </div>
      </section>

      {/* Article */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 md:p-12">
          <div className="prose prose-lg max-w-none prose-headings:text-[#1E3A8A] prose-p:text-gray-700 prose-p:leading-8 whitespace-pre-line">
            {blogs.content}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#F8FAFC] rounded-3xl border border-gray-200 p-10 text-center">
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-4">
          Stay Connected
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-7">
          Follow our latest news, achievements and school activities to stay
          updated with everything happening on campus.
        </p>

        <Link
          href="/blog"
          className="inline-flex items-center bg-[#1E3A8A] hover:bg-[#163172] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
        >
          ← Back to Blog
        </Link>
      </section>
    </article>
  );
}
