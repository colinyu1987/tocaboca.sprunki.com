import { Pathnames } from "next-intl/routing";

// export const locales = ["en", "de", "nl", "fr", "it", "es", "pt", "ja", "zh"];
export const locales = ["en", "zh", "ja", "pt", "es", "fr", "de", "pl", "ms", "it", "th", "id", "tr", "vi", "ar", "nl"];

export const localeNames: Record<string, string> = {
  en: "English",     // 英语（美国/英国）
  de: "Deutsch",     // 德语（德国）
  pl: "Polski",      // 波兰语（波兰）
  nl: "Nederlands",  // 荷兰语（荷兰）
  fr: "Français",    // 法语（法国）
  it: "Italiano",    // 意大利语（意大利）
  es: "Español",     // 西班牙语（西班牙）
  pt: "Português",   // 葡萄牙语（葡萄牙）
  ja: "日本語",       // 日语（日本）
  zh: "繁體中文",     // 中文（台灣）
  ms: "Bahasa Melayu", // 马来语（马来西亚）
  th: "ภาษาไทย",     // 泰语（泰国）
  id: "Bahasa Indonesia", // 印尼语（印度尼西亚）
  tr: "Türkçe",      // 土耳其语（土耳其）
  vi: "Tiếng Việt",  // 越南语（越南）
  ar: "العربية",     // 阿拉伯语
};

// 国旗 emoji 映射
export const localeFlags: Record<string, string> = {
  en: "🇺🇸",    // English - United States
  de: "🇩🇪",    // Deutsch - Germany
  nl: "🇳🇱",    // Nederlands - Netherlands
  fr: "🇫🇷",    // Français - France
  it: "🇮🇹",    // Italiano - Italy
  es: "🇪🇸",    // Español - Spain
  pt: "🇵🇹",    // Português - Portugal
  ja: "🇯🇵",    // 日本語 - Japan
  zh: "🇨🇳",    // 中文 - China
  ms: "🇲🇾",    // Bahasa Melayu - Malaysia
  pl: "🇵🇱",    // Polski - Poland
  th: "🇹🇭",    // ภาษาไทย - Thailand
  id: "🇮🇩",    // Bahasa Indonesia - Indonesia
  tr: "🇹🇷",    // Türkçe - Turkey
  vi: "🇻🇳",    // Tiếng Việt - Vietnam
  ar: "🇸🇦",    // العربية - Saudi Arabia
};

// 完整的语言配置信息
export interface LocaleInfo {
  code: string;
  name: string;
  flag: string;
  nativeName?: string;
}

export const localeInfos: Record<string, LocaleInfo> = {
  en: { code: "en", name: "English", flag: "🇺🇸", nativeName: "English" },
  de: { code: "de", name: "Deutsch", flag: "🇩🇪", nativeName: "Deutsch" },
  pl: { code: "pl", name: "Polski", flag: "🇵🇱", nativeName: "Polski" },
  nl: { code: "nl", name: "Nederlands", flag: "🇳🇱", nativeName: "Nederlands" },
  fr: { code: "fr", name: "Français", flag: "🇫🇷", nativeName: "Français" },
  it: { code: "it", name: "Italiano", flag: "🇮🇹", nativeName: "Italiano" },
  es: { code: "es", name: "Español", flag: "🇪🇸", nativeName: "Español" },
  pt: { code: "pt", name: "Português", flag: "🇵🇹", nativeName: "Português" },
  ja: { code: "ja", name: "日本語", flag: "🇯🇵", nativeName: "日本語" },
  zh: { code: "zh", name: "繁體中文", flag: "🇹🇼", nativeName: "繁體中文" },
  ms: { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾", nativeName: "Bahasa Melayu" },
  th: { code: "th", name: "ภาษาไทย", flag: "🇹🇭", nativeName: "ภาษาไทย" },
  id: { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩", nativeName: "Bahasa Indonesia" },
  tr: { code: "tr", name: "Türkçe", flag: "🇹🇷", nativeName: "Türkçe" },
  vi: { code: "vi", name: "Tiếng Việt", flag: "🇻🇳", nativeName: "Tiếng Việt" },
  ar: { code: "ar", name: "العربية", flag: "🇸🇦", nativeName: "العربية" },
};

export const defaultLocale = "en";

export const localePrefix = "as-needed";

export const localeDetection = true;

export const pathnames = {
  "/": "/",
  "/privacy-policy": "/privacy-policy",
  "/terms-of-service": "/terms-of-service",
  "/refund-policy": "/refund-policy",
  "/acceptable-use-policy": "/acceptable-use-policy",
  "/dmca": "/dmca"
} satisfies Pathnames<typeof locales>;
