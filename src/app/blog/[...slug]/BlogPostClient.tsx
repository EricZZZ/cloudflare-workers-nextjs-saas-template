"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Doc } from "@/lib/mdx";

export default function BlogPostClient({
  post,
  locale,
}: {
  post: Doc;
  locale: string;
}) {
  const [backToBlogText, setBackToBlogText] = useState("Back to Blog");

  useEffect(() => {
    // Simple translation fallback
    if (locale === "zh") {
      setBackToBlogText("返回博客");
    } else if (locale === "ja") {
      setBackToBlogText("ブログに戻る");
    }
  }, [locale]);

  // 构建返回博客链接
  const blogLink = locale === "en" ? "/blog" : `/${locale}/blog`;

  return (
    <>
      <Link
        href={blogLink as any} // Type assertion to avoid TypeScript error
        className="inline-block mb-4 text-blue-600 hover:underline"
      >
        ← {backToBlogText}
      </Link>

      <div className="flex flex-col lg:flex-row lg:gap-8">
        <article className="w-full lg:w-[calc(100%-250px)] prose prose-lg max-w-none">
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
        </article>

        {post.headings && post.headings.length > 0 && (
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <TableOfContents headings={post.headings} />
          </aside>
        )}
      </div>
    </>
  );
}

function SafeHtml({ html, className }: { html: string; className?: string }) {
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

function CodeBlockRenderer() {
  // Simplified version without the complex logic
  return null;
}

function TableOfContents({ headings }: { headings: any[] }) {
  if (!headings || headings.length === 0) return null;

  return (
    <nav className="sticky top-24">
      <h3 className="font-semibold mb-2 text-sm uppercase text-gray-500">
        目录
      </h3>
      <ul className="space-y-1">
        {headings
          .filter((heading) => heading.level >= 2)
          .map((heading) => (
            <li
              key={heading.id}
              className={`${
                heading.level === 2 ? "font-medium" : "ml-4"
              } text-sm`}
            >
              <a
                href={`#${heading.id}`}
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                {heading.text}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
