import "@/app/globals.css";
// import '@/app/fonts/inter/inter.css';
import { getMessages, getTranslations } from "next-intl/server";
import { locales } from "@/i18n/locale";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import BackToTop from "@/components/widget/back-to-top";
import { Toaster } from "@/components/ui/sonner";
import { BProgress } from "@/components/bprogress";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  const webUrl = process.env.NEXT_PUBLIC_URL;
  const baseUrl = new URL(webUrl);

  const alternateLanguages: Record<string, string> = {};
  locales.forEach((loc) => {
    alternateLanguages[loc] = webUrl + (loc === "en" ? "" : `/${loc}`);
  });
  alternateLanguages["x-default"] = webUrl;

  return {
    title: {
      template: `%s`,
      default: t("metadata.title") || "",
    },
    description: t("metadata.description") || "",
    keywords: t("metadata.keywords") || "",
    icons: {
      icon: [
        { url: "/favicons/favicon.ico", sizes: "any" },
        { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/favicons/apple-touch-icon.png", sizes: "180x180" },
        { url: "/favicons/apple-touch-icon.png", sizes: "167x167" },
        { url: "/favicons/apple-touch-icon.png", sizes: "152x152" },
        { url: "/favicons/apple-touch-icon.png", sizes: "120x120" },
      ],
      other: [
        { rel: "apple-touch-icon-precomposed", url: "/favicons/apple-touch-icon.png" },
        { rel: "manifest", url: "/favicons/manifest.json" },
      ],
    },
    metadataBase: baseUrl,
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: "UO5xAYyrcSFxGaR0fSJYUGmDmV7DUpfgrEIvRuU9a3M",
    },
    openGraph: {
      title: t("metadata.title") || "",
      description: t("metadata.description") || "",
      url: webUrl,
      siteName: t("metadata.title") || "",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadata.title") || "",
      description: t("metadata.description") || "",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();
  const tWebsite = await getTranslations('schema.website');
  const tOrg = await getTranslations('schema.organization');

  const webUrl = process.env.NEXT_PUBLIC_URL;

  // Generate JSON-LD structured data for SEO
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": tWebsite('name'),
    "description": tWebsite('description'),
    "url": webUrl,
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": tOrg('name'),
    "description": tOrg('description'),
    "url": webUrl,
    "logo": `${webUrl}/logo.png`,
  };

  return (
    <BProgress>
      {/* SEO: JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />

      <NextIntlClientProvider messages={messages} locale={locale}>
        <Toaster position="top-center" richColors />
        <BackToTop />
        {children}
      </NextIntlClientProvider>
    </BProgress>
  );
}
