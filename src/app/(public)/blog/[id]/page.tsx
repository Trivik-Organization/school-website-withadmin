import { db } from "@/db/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blogId = Number(id);

  const [blog] = await db.select().from(blogs).where(eq(blogs.id, blogId));

  if (!blog) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-400 mb-8">By {blog.author} • {blog.createdAt}</p>
      <div className="prose max-w-none text-gray-700 whitespace-pre-line">{blog.content}</div>
    </article>
  );
}
