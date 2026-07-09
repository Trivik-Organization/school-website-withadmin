import { db } from "@/db/db";
import { blogs } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export const revalidate = 0;

export default async function BlogPage() {
  const allBlogs = await db.select().from(blogs).orderBy(desc(blogs.createdAt));

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8 border-b-4 border-[#d4a017] inline-block pb-2">
        Blog & News
      </h1>

      {allBlogs.length === 0 ? (
        <p className="text-gray-500">No blog posts yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {allBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="block bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold text-[#1e3a5f]">{blog.title}</h2>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">{blog.content}</p>
              <p className="text-xs text-gray-400 mt-3">By {blog.author} • {blog.createdAt}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
