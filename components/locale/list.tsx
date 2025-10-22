"use client";
import React from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { localeInfos } from "@/i18n/locale";

const LanguageSelector: React.FC = () => {
  const params = useParams();
  const siteLocale = params.locale as string;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSwitchLanguage = (value: string) => {
    if (value !== siteLocale) {
      // 立即更新 HTML lang 属性
      if (typeof document !== "undefined") {
        document.documentElement.lang = value;
      }

      let newPathName = pathname.replace(`/${siteLocale}`, `/${value}`);
      if (!newPathName.startsWith(`/${value}`)) {
        newPathName = `/${value}${newPathName}`;
      }

      // 保留查询参数
      const queryString = searchParams.toString();
      const fullUrl = queryString ? `${newPathName}?${queryString}` : newPathName;

      router.push(fullUrl);
    }
  };
  
  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {Object.entries(localeInfos).map(([code, info]) => {
          const isActive = siteLocale === code;
          return (
            <button
              key={code}
              onClick={() => handleSwitchLanguage(code)}
              className={`
                inline-flex items-center gap-2 h-11 px-4 rounded-lg border font-medium
                transition-all duration-200 transform
                ${isActive
                  ? "border-border bg-accent/60 text-accent-foreground shadow-lg font-semibold"
                  : "border-border/50 bg-card/60 backdrop-blur-md text-muted-foreground hover:text-foreground hover:bg-muted/80 hover:border-border hover:shadow-md hover:-translate-y-0.5"}
              `}
              aria-label={`Switch to ${info.name}`}
              aria-current={isActive ? "true" : "false"}
            >
              <span className="text-base leading-none">{info.flag}</span>
              <span className="text-sm font-medium">{info.name}</span>
              {isActive && (
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageSelector;