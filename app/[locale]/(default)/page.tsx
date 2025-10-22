import { getTranslations } from "next-intl/server";
import { generateHrefLangAlternates } from "@/lib/metadata";
import Hero from '@/components/page/home-page/hero';
import CTA from '@/components/page/home-page/cta';
import Variants from "@/components/page/home-page/variants"
import Introduction from "@/components/page/home-page/introduction"
import HowToPlay from "@/components/page/home-page/how-to-play"
import Gallery from "@/components/page/home-page/gallery"
import Guides from "@/components/page/home-page/guides"
import Features from "@/components/page/home-page/features"
import UseCases from "@/components/page/home-page/use-cases"
import FAQ from "@/components/page/home-page/faq"
import Comparison from "@/components/page/home-page/comparison"
import Safety from "@/components/page/home-page/safety"
import Troubleshooting from "@/components/page/home-page/troubleshooting"

async function generatePageSchema(locale: string) {
  const tSchema = await getTranslations('schema.mobileApplication');
  const tFaq = await getTranslations('home.faq');

  // Generate FAQ items
  const faqs = Array.from({ length: 10 }, (_, i) => ({
    question: tFaq(`q${i + 1}.question`),
    answer: tFaq(`q${i + 1}.answer`),
  }));

  // Consolidated schema with @graph for multiple types
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MobileApplication",
        "name": tSchema('name'),
        "operatingSystem": tSchema('operatingSystem'),
        "applicationCategory": tSchema('applicationCategory'),
        "fileSize": tSchema('fileSize'),
        "softwareVersion": tSchema('softwareVersion'),
        "datePublished": tSchema('datePublished'),
        "contentRating": tSchema('contentRating'),
        "description": tSchema('description'),
        "offers": {
          "@type": "Offer",
          "price": tSchema('price'),
          "priceCurrency": tSchema('priceCurrency')
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": tSchema('ratingValue'),
          "reviewCount": tSchema('reviewCount')
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  const pathname = "";
  const hrefLangAlternates = generateHrefLangAlternates(pathname);

  const canonicalUrl = hrefLangAlternates.languages[locale] || hrefLangAlternates.languages['x-default'];

  return {
    title: {
      default: t("metadata.home_page.title"),
      template: "%s | Toca Boca Mod APK",
    },
    description: t("metadata.home_page.description"),
    keywords: t("metadata.home_page.keywords"),
    alternates: {
      canonical: canonicalUrl,
      languages: hrefLangAlternates.languages,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      title: t("metadata.home_page.title"),
      description: t("metadata.home_page.description"),
      url: canonicalUrl,
      siteName: t("metadata.site_name"),
      images: [
        {
          url: "/logo.png",
          width: 512,
          height: 512,
          alt: "Toca Boca Mod APK Download",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadata.home_page.title"),
      description: t("metadata.home_page.description"),
      images: ["/logo.png"],
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const pageSchema = await generatePageSchema(locale);

  return (
    <>
      {/* Consolidated SEO: JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema)
        }}
      />

      <div>
        <Hero />
        <Variants />
        <Introduction />
        <Comparison />
        <Features />
        <HowToPlay />
        <Gallery />
        <Safety />
        <Guides />
        <UseCases />
        <Troubleshooting />
        <FAQ />
        <CTA />
      </div>
    </>
  );
}
