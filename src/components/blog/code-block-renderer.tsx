"use client";

import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { CodeBlock } from "@/components/blog/code-block";

export function CodeBlockRenderer() {
  useEffect(() => {
    const processCodeBlocks = () => {
      // 查找所有代码块包装器
      const codeBlockWrappers = document.querySelectorAll(
        ".code-block-wrapper"
      );

      codeBlockWrappers.forEach((wrapper) => {
        // 检查是否已经被处理过
        if (wrapper.parentNode?.querySelector(".code-block-container")) {
          return;
        }

        const code = wrapper.getAttribute("data-code");
        const language = wrapper.getAttribute("data-language");

        if (code) {
          try {
            // 解码代码内容
            const decodedCode = decodeURIComponent(code);

            // 创建新的div来容纳React组件
            const container = document.createElement("div");
            container.className = "code-block-container";
            wrapper.parentNode?.replaceChild(container, wrapper);

            // 渲染CodeBlock组件
            const root = createRoot(container);
            root.render(
              <CodeBlock code={decodedCode} language={language || undefined} />
            );
          } catch (error) {
            console.error(
              "CodeBlockRenderer - Failed to render code block:",
              error
            );
          }
        }
      });
    };

    // 立即处理
    processCodeBlocks();

    // 使用MutationObserver监听DOM变化
    const observer = new MutationObserver(processCodeBlocks);
    observer.observe(document.body, { childList: true, subtree: true });

    // 清理函数
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
