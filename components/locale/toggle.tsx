"use client";

import React from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { localeInfos } from "@/i18n/locale";

export default function ({ 
  isIcon = false, 
  dropdownDirection = "down" 
}: { 
  isIcon?: boolean;
  dropdownDirection?: "up" | "down";
}) {
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const currentLocale = localeInfos[locale];

  const handleSwitchLanguage = (value: string) => {
    if (value !== locale) {
      // 立即更新 HTML lang 属性
      if (typeof document !== "undefined") {
        document.documentElement.lang = value;
      }

      let newPathName = pathname.replace(`/${locale}`, `/${value}`);
      if (!newPathName.startsWith(`/${value}`)) {
        newPathName = `/${value}${newPathName}`;
      }

      // 保留查询参数
      const queryString = searchParams.toString();
      const fullUrl = queryString ? `${newPathName}?${queryString}` : newPathName;

      router.push(fullUrl);
      setIsOpen(false);
    }
  };

  // 点击外部关闭下拉菜单
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  if (!currentLocale) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 触发按钮 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-10 px-3 rounded-xl border border-border/50 bg-card/60 backdrop-blur-md hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-150 focus:ring-0 focus:outline-none shadow-sm hover:shadow-md"
        aria-label={`Switch language, current language is ${currentLocale?.name}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {!isIcon && currentLocale && (
          <>
            <span className="text-base leading-none">{currentLocale.flag}</span>
            <span className="hidden sm:inline font-medium">{currentLocale.name}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
        {isIcon && currentLocale && (
          <span className="text-base leading-none">{currentLocale.flag}</span>
        )}
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div 
          className={`absolute ${dropdownDirection === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'} right-0 z-[9999] min-w-[150px] bg-card/95 backdrop-blur-md border border-border/50 rounded-xl shadow-lg overflow-hidden animate-in fade-in ${dropdownDirection === 'up' ? 'slide-in-from-bottom-1' : 'slide-in-from-top-1'} duration-200`}
          role="menu"
        >
          {Object.entries(localeInfos).map(([code, info]) => {
            const isActive = locale === code;
            return (
              <button
                key={code}
                type="button"
                role="menuitem"
                onClick={() => handleSwitchLanguage(code)}
                className={`
                  w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium
                  cursor-pointer transition-colors duration-150
                  ${isActive 
                    ? 'bg-accent/60 text-accent-foreground font-semibold' 
                    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                  }
                `}
                aria-current={isActive ? "true" : "false"}
              >
                <span className="text-base leading-none">{info.flag}</span>
                <span>{info.name}</span>
                {isActive && (
                  <svg className="ml-auto w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
