"use client";

import { useEffect, useState } from "react";

interface SafeHtmlProps {
  html: string;
  className?: string;
}

export function SafeHtml({ html, className }: SafeHtmlProps) {
  const [processedHtml, setProcessedHtml] = useState<string>(html);

  useEffect(() => {
    async function sanitizeHtml() {
      // 动态导入 DOMPurify 以确保只在客户端使用
      const DOMPurify = (await import("dompurify")).default;

      if (typeof window !== "undefined" && DOMPurify) {
        // 配置 DOMPurify 以允许特定的标签和属性
        let sanitized = DOMPurify.sanitize(html, {
          // 允许的标签 - 保留常见的格式化标签
          ALLOWED_TAGS: [
            "b",
            "i",
            "em",
            "strong",
            "a",
            "p",
            "br",
            "ul",
            "ol",
            "li",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "blockquote",
            "code",
            "pre",
            "hr",
            "span",
            "div",
            "table",
            "thead",
            "tbody",
            "tr",
            "td",
            "th",
            "button", // 添加button标签支持
          ],
          // 允许的属性
          ALLOWED_ATTR: [
            "href",
            "src",
            "alt",
            "class",
            "className",
            "style",
            "target",
            "rel",
            "colspan",
            "rowspan",
            "id", // 确保允许 id 属性，这对目录功能至关重要
            "data-language", // 允许 data-language 属性用于代码块语言标识
            "data-code", // 允许 data-code 属性
          ],
          // 对于链接，添加安全的 rel 属性
          ADD_ATTR: ["target", "id", "data-language", "data-code"],
          FORBID_ATTR: ["onclick", "onerror", "onload"],
        });

        // 处理代码块，添加复制按钮功能
        // 修复正则表达式以匹配marked生成的代码块格式
        const codeBlockRegex =
          /<pre><code(?:\s*class=["']language-([^"']*)["'])?>([\s\S]*?)<\/code><\/pre>/g;
        const matches = [...html.matchAll(codeBlockRegex)];

        if (matches.length > 0) {
          let modifiedHtml = html; // 使用原始HTML而不是已净化的HTML
          matches.forEach((match) => {
            const [fullMatch, language, codeContent] = match;
            
            // 解码HTML实体
            const decodedCode = codeContent
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&amp;/g, "&")
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'");

            // 为代码块添加特殊标记，以便在客户端进行进一步处理
            const wrapperHtml = `<div class="code-block-wrapper" data-code="${encodeURIComponent(decodedCode)}" data-language="${language || ""}"><pre><code${language ? ` class="language-${language}"` : ""}>${codeContent}</code></pre></div>`;

            modifiedHtml = modifiedHtml.replace(fullMatch, wrapperHtml);
          });
          
          // 重新净化修改后的HTML
          sanitized = DOMPurify.sanitize(modifiedHtml, {
            ALLOWED_TAGS: [
              "b",
              "i",
              "em",
              "strong",
              "a",
              "p",
              "br",
              "ul",
              "ol",
              "li",
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "blockquote",
              "code",
              "pre",
              "hr",
              "span",
              "div",
              "table",
              "thead",
              "tbody",
              "tr",
              "td",
              "th",
              "button",
            ],
            ALLOWED_ATTR: [
              "href",
              "src",
              "alt",
              "class",
              "className",
              "style",
              "target",
              "rel",
              "colspan",
              "rowspan",
              "id",
              "data-language",
              "data-code",
            ],
            ADD_ATTR: ["target", "id", "data-language", "data-code"],
            FORBID_ATTR: ["onclick", "onerror", "onload"],
          });
        }
        setProcessedHtml(sanitized);
      }
    }

    sanitizeHtml();
  }, [html]);

  // biome-ignore lint/security/noDangerouslySetInnerHtml: 这是安全的，因为内容已经通过 DOMPurify 净化
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
}