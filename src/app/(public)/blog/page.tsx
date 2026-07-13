import { db } from "@/db/db";
import { blogs } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export const revalidate = 0;

export default async function BlogPage() {
  const allBlogs = await db.select().from(blogs).orderBy(desc(blogs.createdAt));

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] rounded-3xl text-white px-8 py-14 shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & News</h1>

        <p className="text-blue-100 max-w-2xl leading-7">
          Stay informed with the latest school news, achievements, academic
          updates, events and inspiring stories from our campus.
        </p>
      </section>

      {/* Blog List */}
      {allBlogs.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 py-20 text-center">
          <div className="text-6xl mb-4">📰</div>

          <h2 className="text-2xl font-bold text-[#1E3A8A]">
            No Blog Posts Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Check back later for the latest updates.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Top Banner */}
              <div className="h-2 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB]" />

              <div className="p-6">
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  School News
                </span>

                <h2 className="text-2xl font-bold text-[#1E3A8A] group-hover:text-[#2563EB] transition-colors mb-3">
                  {blog.title}
                </h2>

                <p className="text-gray-600 leading-7 line-clamp-4 mb-6">
                  {blog.content}
                </p>

                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {blog.author}
                    </p>

                    <p className="text-xs text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="text-[#2563EB] font-semibold group-hover:translate-x-1 transition-transform">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
