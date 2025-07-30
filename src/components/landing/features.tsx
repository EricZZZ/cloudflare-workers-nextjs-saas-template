import {
  BoltIcon,
  CloudIcon,
  CommandLineIcon,
  EnvelopeIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SunIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { getTranslations } from "next-intl/server";

const getFeatures = (t: any) => [
  {
    name: t("AuthenticationReady.name"),
    description: t("AuthenticationReady.description"),
    icon: ShieldCheckIcon,
  },
  {
    name: t("DatabaseEmail.name"),
    description: t("DatabaseEmail.description"),
    icon: EnvelopeIcon,
  },
  {
    name: t("ModernStack.name"),
    description: t("ModernStack.description"),
    icon: BoltIcon,
  },
  {
    name: t("BeautifulUI.name"),
    description: t("BeautifulUI.description"),
    icon: SunIcon,
  },
  {
    name: t("EdgeDeployment.name"),
    description: t("EdgeDeployment.description"),
    icon: CloudIcon,
  },
  {
    name: t("DeveloperExperience.name"),
    description: t("DeveloperExperience.description"),
    icon: CommandLineIcon,
  },
  {
    name: t("FormHandling.name"),
    description: t("FormHandling.description"),
    icon: RocketLaunchIcon,
  },
  {
    name: t("TeamReady.name"),
    description: t("TeamReady.description"),
    icon: UserGroupIcon,
  },
];

export async function Features() {
  const t = await getTranslations("Features");
  const features = getFeatures(t);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
            {t("SectionSubtitle")}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("SectionTitle")}
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t("SectionDescription")}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <feature.icon
                    className="h-5 w-5 flex-none text-indigo-600 dark:text-indigo-400"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
