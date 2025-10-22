import { locales } from "@/i18n/locale";

export function generateHrefLangAlternates(pathname: string) {
  const webUrl = process.env.NEXT_PUBLIC_URL;
  const languages: Record<string, string> = {};

  locales.forEach((locale) => {
    const langPrefix = locale === "en" ? "" : `/${locale}`;
    languages[locale] = webUrl + langPrefix + pathname;
  });

  // 添加 x-default，通常指向英文版本（默认语言）
  languages["x-default"] = webUrl + pathname;

  return {
    languages,
    canonical: webUrl + pathname,
  };
}