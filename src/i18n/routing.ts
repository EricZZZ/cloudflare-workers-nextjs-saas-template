import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "zh", "ja"],

  // Used when no locale matches
  defaultLocale: "en",

  // 禁用自动语言检测，确保默认语言不带路径前缀
  localeDetection: false,
  
  // 为默认语言提供无前缀的替代路由
  alternateLinks: true
});