import type { ReactNode } from "react";

export default function BlogLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className="min-h-screen flex flex-col">{children}</div>;
}