"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import type { Heading } from "@/lib/mdx";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  headings: Heading[];
  className?: string;
}

export function TableOfContents({ headings, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const t = useTranslations("Blog");

  // 过滤掉一级标题，只显示二级及以上的标题
  const filteredHeadings = headings.filter((heading) => heading.level >= 2);

  // 获取当前视口中最近的标题ID
  const getActiveId = useCallback(() => {
    if (typeof window === "undefined" || filteredHeadings.length === 0) return "";

    // 过滤掉没有ID的标题
    const validHeadings = filteredHeadings.filter((heading) => heading.id);

    // 获取所有标题元素
    const headingElements = validHeadings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);

    if (headingElements.length === 0) return "";

    // 找到最接近视口顶部的标题
    const closestHeading = headingElements.reduce((closest, element) => {
      const closestRect = closest.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      // 计算距离视口顶部的距离（考虑一定偏移量）
      const closestDistance = Math.abs(closestRect.top - 100);
      const elementDistance = Math.abs(elementRect.top - 100);

      return elementDistance < closestDistance ? element : closest;
    });

    return closestHeading.id;
  }, [filteredHeadings]);

  useEffect(() => {
    // 过滤掉没有ID的标题
    const validHeadings = filteredHeadings.filter((heading) => heading.id);

    if (validHeadings.length === 0) return;

    // 设置初始活动ID
    const initialId = getActiveId();
    if (initialId) {
      setActiveId(initialId);
    }

    // 使用 setTimeout 确保 DOM 已完全加载
    const timer = setTimeout(() => {
      const newActiveId = getActiveId();
      if (newActiveId && newActiveId !== activeId) {
        setActiveId(newActiveId);
      }
    }, 100);

    const handleScroll = () => {
      const newActiveId = getActiveId();
      if (newActiveId && newActiveId !== activeId) {
        setActiveId(newActiveId);
      }
    };

    // 添加滚动监听器
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 也监听窗口大小变化
    window.addEventListener("resize", handleScroll, { passive: true });

    // 监听 hash 变化（支持浏览器前进/后退按钮）
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && hash !== activeId) {
        setActiveId(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [filteredHeadings, activeId, getActiveId]);

  const handleClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // 添加偏移量以考虑固定头部
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      // 更新活动ID
      setActiveId(id);

      // 更新URL hash
      window.history.pushState(null, "", `#${id}`);

      // 手动触发hashchange事件以确保状态同步
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  };

  // 过滤掉没有ID的标题
  const validHeadings = filteredHeadings.filter((heading) => heading.id);

  // 如果没有标题，则不渲染
  if (validHeadings.length === 0) {
    return null;
  }

  return (
    <nav className={cn("sticky top-24", className)}>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-gray-100 mb-4">
        {t("TableOfContents")}
      </h3>
      <ul className="space-y-2 border-l border-gray-200 dark:border-gray-800">
        {validHeadings.map((heading) => (
          <li key={heading.id} className="relative">
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(heading.id, e)}
              className={cn(
                "block py-1 pl-4 text-sm transition-colors hover:text-primary",
                heading.level === 2 && "font-medium ml-2",
                heading.level === 3 && "ml-4",
                heading.level === 4 && "ml-6",
                heading.level === 5 && "ml-8",
                heading.level === 6 && "ml-10",
                activeId === heading.id
                  ? "text-primary font-medium"
                  : "text-gray-500 dark:text-gray-400"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}