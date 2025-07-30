import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { CREDITS_EXPIRATION_YEARS } from "@/constants";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Legal.Terms");

  return {
    title: t("Title"),
    description: t("Description"),
  };
}

export default async function TermsPage() {
  const t = await getTranslations("Legal.Terms");

  return (
    <>
      <h1 className="text-4xl font-bold text-foreground mb-8">{t("Title")}</h1>

      <p className="text-muted-foreground mb-6">
        {t("LastUpdated")} {new Date().toLocaleDateString()}
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          {t("Section1Title")}
        </h2>
        <p className="text-muted-foreground">{t("Section1Content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          {t("Section2Title")}
        </h2>
        <p className="text-muted-foreground">{t("Section2Content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          {t("Section3Title")}
        </h2>
        <p className="text-muted-foreground">{t("Section3Content")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          {t("Section4Title")}
        </h2>
        <p className="text-muted-foreground mb-4">
          {t("Section4Content1", { years: CREDITS_EXPIRATION_YEARS })}
        </p>
        <p className="text-muted-foreground mb-4">{t("Section4Content2")}</p>
        <p className="text-muted-foreground">{t("Section4Content3")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          {t("Section5Title")}
        </h2>
        <p className="text-muted-foreground">{t("Section5Content")}</p>
      </section>

      <div className="mt-12 text-center">
        <Button asChild>
          <Link href="/">{t("ReturnHome")}</Link>
        </Button>
      </div>
    </>
  );
}
