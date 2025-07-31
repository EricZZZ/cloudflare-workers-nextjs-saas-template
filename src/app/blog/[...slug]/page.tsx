import { notFound } from "next/navigation";
import BlogPostClient from "@/app/blog/[...slug]/BlogPostClient";
import type { Doc } from "@/lib/mdx";
import { getAllDocs } from "@/lib/mdx";
import { generateStaticParams } from "./generateStaticParams";

// Export the generateStaticParams function
export { generateStaticParams };

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  // Await the params as required by Next.js App Router
  const { slug: slugArray } = await params;
  const slug = slugArray.join("/");

  // Load docs
  let allDocs: Doc[] | undefined;
  try {
    allDocs = await getAllDocs();
  } catch (error) {
    console.error("Failed to load docs:", error);
    notFound();
  }

  // Check if allDocs is available
  if (!allDocs) {
    notFound();
  }

  // Find the post with matching slug for default locale (en)
  const post = allDocs.find(
    (doc) => doc.type === "blog" && doc.slug === `blog/en/${slug}`
  );

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogPostClient post={post} locale="en" />
    </div>
  );
}
