import { db } from "@/db/db";
import { blogs } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { FaArrowRight } from "react-icons/fa";

export const revalidate = 0;

export default async function BlogPage() {
  const allBlogs = await db.select().from(blogs).orderBy(desc(blogs.createdAt));

  return (
    <div className="bg-slate-50">

      <PageBanner
        eyebrow="Our Stories"
        title="School Blog"
        subtitle="Stay informed with the latest news, achievements, academic updates and inspiring stories from our campus."
        image="/hero.jpg"
      />

      <section className="py-20">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-16">

          {allBlogs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-lg py-24 text-center">
              <div className="text-6xl mb-5">📰</div>
              <h3 className="text-2xl font-bold text-slate-900">No Posts Yet</h3>
              <p className="text-slate-500 mt-2">Check back later for the latest articles.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.id}`}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
                >
                  {/* Decorative banner */}
                  <div className="h-48 bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#60A5FA] flex items-center justify-center">
                    <span className="text-7xl font-black text-white/10 select-none tracking-tighter">BLOG</span>
                  </div>

                  {/* Content */}
                  <div className="p-7 flex-1 flex flex-col">
                    <span className="inline-block bg-blue-50 text-[#1E3A8A] text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">
                      School Blog
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#1E40AF] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-500 leading-7 text-sm line-clamp-3 flex-1">
                      {blog.content}
                    </p>
                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
                      <div>
                        <p className="text-sm font-bold text-slate-800">{blog.author}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                            year: "numeric", month: "short", day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-[#1E3A8A] group-hover:bg-[#D4A017] group-hover:text-white transition-all duration-300">
                        <FaArrowRight className="text-sm" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
