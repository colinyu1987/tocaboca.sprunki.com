import Footer from "../footer";
import Header from "../header";
import BackToTop from "@/components/widget/back-to-top";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { getLandingPage } from "@/services/page";

interface DefaultLayoutProps {
  children: ReactNode;
  locale: string;
  showHeader?: boolean;
  showFooter?: boolean;
  mainClassName?: string;
  className?: string;
}

/**
 * 默认Layout组件
 * 提供标准的Header + Main + Footer布局
 * 适用于大部分内容页面
 */
export default async function DefaultLayout({
  children,
  locale,
  showHeader = true,
  showFooter = true,
  mainClassName,
  className,
}: DefaultLayoutProps) {
  const page = await getLandingPage(locale);

  return (
    <div className={className}>
      {showHeader && page.landing.header && <Header header={page.landing.header} />}
      <main className={cn("overflow-x-hidden", mainClassName)}>
        {children}
      </main>
      {showFooter && page.landing.footer && <Footer footer={page.landing.footer} />}
      <BackToTop />
    </div>
  );
}
