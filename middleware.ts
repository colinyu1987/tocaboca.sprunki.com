import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales } from './i18n/locale';
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // 优先跳过所有 /api 路由，保证 API 不被中间件处理
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // 先处理国际化
  const response = await intlMiddleware(request);
  
  // 从路径中提取当前语言
  const pathname = request.nextUrl.pathname;
  const locale = pathname.split('/')[1] || 'en';
  const currentLocale = locales.includes(locale) ? locale : 'en';
  
  // 添加语言信息到响应头
  if (response) {
    response.headers.set('x-locale', currentLocale);
  }

  return response;
}

export const config = {
  matcher: [
    '/',
    // 排除法律文件、API 路由等不需要国际化的路径
    '/((?!privacy-policy|terms-of-service|dmca|api/|_next|_vercel|.*\\..*).*)',
  ],
};
