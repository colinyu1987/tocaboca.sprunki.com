import { LandingPage } from "@/types/landing";

export async function getLandingPage(locale: string): Promise<LandingPage > {
  return (await getPageByName("landing", locale)) as LandingPage;
}

export async function getPageByName(
  name: string,
  locale: string
): Promise<any> {
  try {
    return await import(`@/i18n/pages/${name}/${locale}.json`).then(
      (module) => module.default
    );
  } catch (error) {
    return await import(`@/i18n/pages/${name}.json`).then(
      (module) => module.default
    );
  }
}
