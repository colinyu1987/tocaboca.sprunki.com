"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // 监听滚动事件
  useEffect(() => {
    const toggleVisibility = () => {
      // 当页面滚动超过300px时显示按钮
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        className={cn(
          "fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full transition-all duration-500 ease-out",
          "bg-primary hover:bg-primary/90",
          "text-primary-foreground border-0 cursor-pointer group",
          "shadow-lg hover:shadow-2xl backdrop-blur-sm",
          "opacity-0 translate-y-4 scale-90 pointer-events-none",
          isVisible && "opacity-100 translate-y-0 scale-100 pointer-events-auto"
        )}
        onClick={scrollToTop}
        aria-label="回到顶部"
      >
        {/* 背景光晕效果 */}
        <div className="absolute inset-0 bg-primary/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-150"></div>
        
        {/* 箭头图标 */}
        <ArrowUp className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" />
        
        {/* 内部光泽效果 */}
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-40"></div>
      </Button>

      <style jsx>{`
        @keyframes gentle-bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-4px);
          }
          60% {
            transform: translateY(-2px);
          }
        }
        
        /* 在按钮首次出现时添加轻微的弹跳动画 */
        .animate-gentle-bounce {
          animation: gentle-bounce 1s ease-out;
        }
      `}</style>
    </>
  );
} 