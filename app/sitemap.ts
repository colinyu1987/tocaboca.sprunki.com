import { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/i18n/locale';

// 页面配置类型
interface PageConfig {
  path: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Sitemap URL 类型
interface SitemapUrl {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const pageConfig: Record<string, PageConfig> = {
  home: {
    path: '',
    lastModified: '2025-10-09',
    changeFrequency: 'weekly',
    priority: 1.0,
  },
};

// 法律页面（不需要多语言）
const legalPages: PageConfig[] = [
  {
    path: '/privacy-policy',
    lastModified: '2025-10-02',
    changeFrequency: 'monthly',
    priority: 0.3,
  },
  {
    path: '/terms-of-service',
    lastModified: '2025-10-02',
    changeFrequency: 'monthly',
    priority: 0.3,
  },
  {
    path: '/dmca',
    lastModified: '2025-10-02',
    changeFrequency: 'monthly',
    priority: 0.3,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // 使用环境变量，如果未定义则使用默认域名
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://tocaboca.sprunki.com';

  const sitemapUrls: SitemapUrl[] = [];

  // 添加多语言首页
  Object.values(pageConfig).forEach(page => {
    locales.forEach(locale => {
      const localePath = locale === defaultLocale ? '' : `/${locale}`;
      const fullUrl = `${baseUrl}${localePath}${page.path}`;

      sitemapUrls.push({
        url: fullUrl,
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    });
  });

  // 添加法律页面（仅英文，无多语言）
  legalPages.forEach(page => {
    sitemapUrls.push({
      url: `${baseUrl}${page.path}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  });

  return sitemapUrls;
}
