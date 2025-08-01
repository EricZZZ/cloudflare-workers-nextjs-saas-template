import Link from "next/link";
import { notFound } from "next/navigation";
import { BackToTop } from "@/components/blog/back-to-top";
import { SafeHtml } from "@/components/blog/safe-html";
import { TableOfContents } from "@/components/blog/table-of-contents";
import type { Doc } from "@/lib/mdx";
import { getAllDocs } from "@/lib/mdx";

// 在构建时生成静态参数
export async function generateStaticParams() {
  let posts: Doc[] = [];
  
  try {
    // 只在构建时加载文档
    if (typeof window === 'undefined' && 
        (!process.env.NEXT_RUNTIME || process.env.NEXT_RUNTIME === 'nodejs')) {
      posts = await getAllDocs();
    }
  } catch (error) {
    // 在边缘环境中可能会出错，但这不会影响静态生成
    console.warn("Could not load docs at build time:", error);
  }

  // 从所有文章中提取参数
  return posts
    .filter((doc) => doc.type === "blog")
    .map((post) => {
      // 格式: blog/en/my-first-post
      const parts = post.slug.split("/");
      const locale = parts[1];
      const slug = parts.slice(2);
      
      return {
        locale,
        slug,
      };
    });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string[]; locale: string }>;
}) {
  // Await the params as required by Next.js App Router
  const { slug: slugArray, locale } = await params;
  const slug = slugArray.join("/");

  // 在构建时预加载所有文档，运行时直接使用
  let allDocs: Doc[] = [];
  
  try {
    // 只在服务端且非边缘环境中加载文档
    if (typeof window === 'undefined' && 
        (!process.env.NEXT_RUNTIME || process.env.NEXT_RUNTIME === 'nodejs')) {
      allDocs = await getAllDocs();
    }
  } catch (error) {
    // 在 Cloudflare Workers 环境中会出错，但我们依赖静态生成
    console.warn("Could not load docs at runtime:", error);
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
    </>
  );
}