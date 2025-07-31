"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // 如果没有语言指定，尝试从代码内容推断
  const displayLanguage = language || (code.includes("mdx") ? "mdx" : "text");

  return (
    <div className={cn("relative group", className)}>
      <pre className="rounded-lg bg-muted p-4 overflow-x-auto text-sm dark:bg-slate-800 dark:border-slate-700 border">
        <code className={`language-${displayLanguage} font-mono`}>{code}</code>
      </pre>
      <Button
        size="sm"
        variant="secondary"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
        onClick={copyToClipboard}
      >
        {copied ? "Copied!" : "Copy"}
      </Button>
      <div className="absolute top-2 left-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded dark:bg-slate-800/80 dark:text-slate-300">
        {displayLanguage}
      </div>
    </div>
  );
}
