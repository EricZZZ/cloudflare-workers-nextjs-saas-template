import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GITHUB_REPO_URL } from "@/constants";
import { getTranslations } from "next-intl/server";

async function getFAQs(t: any) {
  return [
    {
      question: t("Question1"),
      answer: (
        <>
          {t("Answer1")}{" "}
          <a href={GITHUB_REPO_URL} target="_blank">
            open source
          </a>
          !
        </>
      ),
    },
    {
      question: t("Question2"),
      answer: (
        <>
          {t("Answer2")}
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>{t("Features.Authentication")}</li>
            <li>{t("Features.Database")}</li>
            <li>{t("Features.Email")}</li>
            <li>{t("Features.UI")}</li>
            <li>{t("Features.Forms")}</li>
            <li>{t("Features.DarkMode")}</li>
            <li>{t("Features.Responsive")}</li>
            <li>{t("Features.TypeScript")}</li>
            <li>{t("Features.Deployment")}</li>
            <li>{t("Features.Captcha")}</li>
            <li>{t("Features.SEO")}</li>
            <li>{t("Features.More")}</li>
          </ul>
        </>
      ),
    },
    {
      question: t("Question3"),
      answer: (
        <>
          <p>{t("Answer3")}</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>{t("TechStack.NextJS")}</li>
            <li>{t("TechStack.TypeScript")}</li>
            <li>{t("TechStack.Styling")}</li>
            <li>{t("TechStack.Database")}</li>
            <li>{t("TechStack.Auth")}</li>
            <li>{t("TechStack.Workers")}</li>
            <li>{t("TechStack.KV")}</li>
            <li>{t("TechStack.Email")}</li>
          </ul>
        </>
      ),
    },
    {
      question: t("Question4"),
      answer: (
        <>
          <p>{t("Answer4")}</p>
          <ol className="list-decimal pl-6 mt-2 space-y-1">
            <li>{t("DeploymentSteps.Step1")}</li>
            <li>{t("DeploymentSteps.Step2")}</li>
            <li>{t("DeploymentSteps.Step3")}</li>
            <li>{t("DeploymentSteps.Step4")}</li>
            <li>{t("DeploymentSteps.Step5")}</li>
          </ol>
          <p className="mt-2">
            {t("DeploymentNote")}{" "}
            <a href={`${GITHUB_REPO_URL}/blob/main/README.md`} target="_blank">
              GitHub repository
            </a>
            .
          </p>
        </>
      ),
    },
    {
      question: t("Question5"),
      answer: (
        <>
          <p>{t("Answer5")}</p>
          <p>
            {t("Answer5Note")}{" "}
            <a href={`${GITHUB_REPO_URL}/blob/main/README.md`} target="_blank">
              documentation
            </a>
            .
          </p>
        </>
      ),
    },
    {
      question: t("Question6"),
      answer: (
        <>
          <p>{t("Answer6")}</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>{t("UpcomingFeatures.I18n")}</li>
            <li>{t("UpcomingFeatures.Billing")}</li>
            <li>{t("UpcomingFeatures.Admin")}</li>
            <li>{t("UpcomingFeatures.EmailVerification")}</li>
            <li>{t("UpcomingFeatures.Notifications")}</li>
            <li>{t("UpcomingFeatures.Webhooks")}</li>
            <li>{t("UpcomingFeatures.Team")}</li>
            <li>{t("UpcomingFeatures.Realtime")}</li>
            <li>{t("UpcomingFeatures.Analytics")}</li>
          </ul>
        </>
      ),
    },
    {
      question: t("Question7"),
      answer: (
        <>
          {t("Answer7").split("pnpm email:dev")[0]}
          <code>pnpm email:dev</code>
          {t("Answer7").split("http://localhost:3001")[0].split("pnpm email:dev")[1]}
          <a href="http://localhost:3001" target="_blank" rel="noopener">
            http://localhost:3001
          </a>
          {t("Answer7").split("http://localhost:3001")[1]}
        </>
      ),
    },
    {
      question: t("Question8"),
      answer: (
        <>
          <p>{t("Answer8")}</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              {t("CustomizationSteps.Constants").split("src/constants.ts")[0]}
              <code>src/constants.ts</code>
              {t("CustomizationSteps.Constants").split("src/constants.ts")[1]}
            </li>
            <li>
              {t("CustomizationSteps.Docs").split("./cursor-docs")[0]}
              <code>./cursor-docs</code>
              {t("CustomizationSteps.Docs").split("./cursor-docs")[1]}
            </li>
            <li>
              {t("CustomizationSteps.Footer").split("src/components/footer.tsx")[0]}
              <code>src/components/footer.tsx</code>
              {t("CustomizationSteps.Footer").split("src/components/footer.tsx")[1]}
            </li>
            <li>
              {t("CustomizationSteps.Colors").split("src/app/globals.css")[0]}
              <code>src/app/globals.css</code>
              {t("CustomizationSteps.Colors").split("src/app/globals.css")[1]}
            </li>
          </ul>
        </>
      ),
    },
    {
      question: t("Question9"),
      answer: (
        <>
          {t("Answer9").split("GitHub")[0]}
          <a href={GITHUB_REPO_URL} target="_blank">
            GitHub
          </a>
          {t("Answer9").split("GitHub")[1]}
        </>
      ),
    },
  ];
}

export async function FAQ() {
  const t = await getTranslations("FAQ");
  const faqs = await getFAQs(t);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10 dark:divide-gray-100/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight">
            {t("SectionTitle")}
          </h2>
          <Accordion type="single" collapsible className="w-full mt-10">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose dark:prose-invert w-full max-w-none">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
