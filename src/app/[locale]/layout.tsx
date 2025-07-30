import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import "server-only";
import "./../globals.css";

import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/providers";
import { AgenticDevStudioStickyBanner } from "@/components/startup-studio-sticky-banner";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/constants";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: [
    "SaaS",
    "Next.js",
    "React",
    "TypeScript",
    "Cloudflare Workers",
    "Edge Computing",
  ],
  authors: [{ name: "EricZZZ" }],
  creator: "EricZZZ",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // 先 await params，然后解构 locale
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider>
          <NextTopLoader
            initialPosition={0.15}
            shadow="0 0 10px #000, 0 0 5px #000"
            height={4}
          />
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <TooltipProvider delayDuration={100} skipDelayDuration={50}>
              {children}
            </TooltipProvider>
          </ThemeProvider>
          <Toaster
            richColors
            closeButton
            position="top-right"
            expand
            duration={7000}
          />
          <AgenticDevStudioStickyBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
