import Link from "next/link";
import { notFound } from "next/navigation";
import { BackToTop } from "@/components/blog/back-to-top";
import { CodeBlockRenderer } from "@/components/blog/code-block-renderer";
import { SafeHtml } from "@/components/blog/safe-html";
import { TableOfContents } from "@/components/blog/table-of-contents";
import type { Doc } from "@/lib/mdx";
import { getAllDocs } from "@/lib/mdx";

// Client component for the back link
function BackLink({
  locale,
  backToBlogText,
}: {
  locale: string;
  backToBlogText: string;
}) {
  return (
    <Link
      href={`/${locale}/blog`}
      className="inline-block mb-4 text-blue-600 hover:underline"
    >
      ← {backToBlogText}
    </Link>
  );
}

// Client component for the article content
function ArticleContent({ post }: { post: Doc }) {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {(post.createdAt || post.author) && (
          <div className="flex items-center gap-4 text-gray-600">
            {post.createdAt && (
              <time>
                {new Date(post.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}

            {post.author && <span>by {post.author}</span>}
          </div>
        )}

        {post.description && (
          <p className="text-xl text-gray-700 mt-4">{post.description}</p>
        )}
      </header>

      <SafeHtml html={post.content} className="prose prose-lg max-w-none" />
      <CodeBlockRenderer />
    </>
  );
}

// 添加generateStaticParams函数以确保部署时正确生成静态页面
export async function generateStaticParams() {
  // Load docs
  let allDocs: Doc[] | undefined;
  try {
    allDocs = await getAllDocs();
  } catch (error) {
    console.error("Failed to load docs:", error);
    // Return empty array if there's an error
    return [];
  }

  // Extract locale and slug from each post
  const paths = allDocs
    .filter((doc) => doc.type === "blog")
    .map((post) => {
      // Format: blog/en/my-first-post
      const parts = post.slug.split("/");
      const locale = parts[1];
      const slug = parts.slice(2);
      
      return {
        locale,
        slug,
      };
    });
    
  console.log("Generated static paths for blog posts:", paths);
  return paths;
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string[]; locale: string }>;
}) {
  // Await the params as required by Next.js App Router
  const { slug: slugArray, locale } = await params;
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

  // Find the post with matching slug and locale
  const post = allDocs.find(
    (doc) => doc.type === "blog" && doc.slug === `blog/${locale}/${slug}`
  );

  if (!post) {
    notFound();
  }

  // Simple translation fallback
  const backToBlogText = locale === "zh" ? "返回博客" : "Back to Blog";

  return (
    <div className="container mx-auto px-4 py-8">
      <BackLink locale={locale} backToBlogText={backToBlogText} />

      <div className="flex flex-col lg:flex-row lg:gap-8">
        <article className="w-full lg:w-[calc(100%-250px)] prose prose-lg max-w-none">
          <ArticleContent post={post} />
        </article>

        {post.headings && post.headings.length > 0 && (
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <TableOfContents headings={post.headings} />
          </aside>
        )}
      </div>

      <BackToTop />
    </div>
  );
}