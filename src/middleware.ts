import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export async function middleware(request: NextRequest) {
  const intlMiddleware = createMiddleware(routing);

  const response = intlMiddleware(request);

  return response;
}

export const config = {
  // 在匹配器中添加博客路由
  matcher: ["/((?!api|_next|_vercel|.*\\..*__).*)"],
};
