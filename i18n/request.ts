import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  if (["zh-CN"].includes(locale)) {
    locale = "zh";
  }

  if (!routing.locales.includes(locale as any)) {
    locale = "en";
  }

  try {
    const messages = (await import(`./messages/${locale.toLowerCase()}.json`))
      .default;
    const landingMessages = (await import(`./pages/landing/${locale.toLowerCase()}.json`))
      .default;

    return {
      locale: locale,
      messages: {
        ...messages,
        ...landingMessages,
      },
    };
  } catch (e) {
    const messages = (await import(`./messages/en.json`)).default;
    const landingMessages = (await import(`./pages/landing/en.json`)).default;

    return {
      locale: "en",
      messages: {
        ...messages,
        ...landingMessages,
      },
    };
  }
});

