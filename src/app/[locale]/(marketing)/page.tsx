import type { Metadata } from "next";
import { FAQ } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <FAQ />
    </main>
  );
}
