import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BackToTop } from "@/components/blog/back-to-top";
import type { Doc } from "@/lib/mdx";
import { getAllDocs } from "@/lib/mdx";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // 获取当前语言
  const { locale } = await params;

  let posts: Doc[] = [];

  try {
    // Get all docs
    const allDocs = await getAllDocs();

    // Filter blog posts for the current locale only
    posts = allDocs.filter(
      (doc: any) => doc.type === "blog" && doc.locale === locale
    );
  } catch (error) {
    console.error("Failed to load blog posts:", error);
    // Return empty posts array if there's an error
  }

  const t = await getTranslations("Blog");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t("Title")}</h1>
      {posts.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post: any) => {
            // Extract slug from the post slug
            // Format: blog/en/my-first-post
            const parts = post.slug.split("/");
            const slug = parts.slice(2).join("/");

            return (
              <article
                key={post.slug}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <Link href={`/${locale}/blog/${slug}`} className="block">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  {post.description && (
                    <p className="text-gray-600 mb-4">{post.description}</p>
                  )}
                  {post.createdAt && (
                    <time className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </time>
                  )}
                </Link>
              </article>
            );
          })}
        </div>
      )}

      <BackToTop />
    </div>
  );
}
