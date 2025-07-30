import NavFooterLayout from "@/layouts/NavFooterLayout";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NavFooterLayout>{children}</NavFooterLayout>;
}
