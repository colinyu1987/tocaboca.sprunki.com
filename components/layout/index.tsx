// Layout组件导出
export { default as DefaultLayout } from "./default-layout";

// 类型定义
export interface DefaultLayoutProps {
  children: React.ReactNode;
  locale: string;
  showHeader?: boolean;
  showFooter?: boolean;
  mainClassName?: string;
  className?: string;
}
