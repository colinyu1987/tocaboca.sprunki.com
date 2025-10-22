"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavigationMenuWidget, NavGroup } from "@/components/widget/navigation-menu";
import { Link } from "@/i18n/routing";
import LocaleToggle from "@/components/locale/toggle";
import ThemeToggle from "@/components/widget/theme-toggle";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { HeaderType } from "@/types/landing";

export default function Header({ header }: { header: HeaderType }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Convert header nav items to NavigationMenuWidget groups format
  const navigationGroups = useMemo<NavGroup[]>(() => {
    if (!header.nav?.items) return [];
    
    return header.nav.items.map((item) => {
      // If item has children, create a dropdown group
      if (item.children && item.children.length > 0) {
        return {
          title: item.title || '',
          trigger: true,
          items: item.children.map((child: any) => ({
            title: child.title || '',
            href: child.url || '#',
            description: child.description,
            target: child.target,
          })),
        };
      }
      
      // Otherwise, create a single link group
      return {
        title: item.title || '',
        trigger: false,
        items: [{
          title: item.title || '',
          href: item.url || '#',
          target: item.target,
        }],
      };
    });
  }, [header.nav?.items]);

  if (header.disabled) {
    return null;
  }

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  // 监听路径变化来关闭菜单
  useEffect(() => {
    handleMobileMenuClose();
  }, [pathname]);

  useEffect(() => {
    const handleHashChange = () => {
      handleMobileMenuClose();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <section className="sticky top-0 z-50 backdrop-blur-md bg-background/90 border-b border-border/40 py-3">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link
              href={(header.brand?.url as any) || ""}
              className="flex items-center gap-2"
            >
              {header.brand?.logo?.src && (
                <Image
                  src={header.brand.logo.src}
                  alt="logo"
                  width={32}
                  height={32}
                  className="w-8"
                />
              )}
              {header.brand?.title && (
                <span className="text-lg text-primary font-bold">
                  {header.brand?.title || ""}
                </span>
              )}
            </Link>
          </div>
          <div className="shrink-0 flex gap-2 items-center">
            <div className="flex items-center">
              <NavigationMenuWidget groups={navigationGroups} />
            </div>
            <ThemeToggle />
            {header.show_locale && <LocaleToggle />}
          </div>
        </nav>

        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link
              href={(header.brand?.url as any) || ""}
              className="flex items-center gap-2 flex-1"
            >
              {header.brand?.logo?.src && (
                <Image
                  src={header.brand.logo.src}
                  alt="logo"
                  width={32}
                  height={32}
                  className="w-8"
                />
              )}
              {header.brand?.title && (
                <span className="text-lg text-primary font-bold">
                  {header.brand?.title || ""}
                </span>
              )}
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {header.show_locale && <LocaleToggle />}
            </div>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="default" size="icon" aria-label="Open mobile navigation menu">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto flex flex-col z-101">
                <SheetHeader>
                  <SheetTitle>
                    <Link
                      href={(header.brand?.url as any) || ""}
                      className="flex items-center gap-2"
                      onClick={handleMobileMenuClose}
                    >
                      {header.brand?.logo?.src && (
                        <Image
                          src={header.brand.logo.src}
                          alt="logo"
                          width={32}
                          height={32}
                          className="w-8"
                        />
                      )}
                      {header.brand?.title && (
                        <span className="text-lg text-primary font-bold">
                          {header.brand?.title || ""}
                        </span>
                      )}
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 py-4">
                  {header.nav?.items?.map((item, i) => {
                    if (item.children && item.children.length > 0) {
                      return (
                        <div key={i} className="flex flex-col gap-1 py-1">
                          <div className="px-4 pt-2 pb-1 text-xs uppercase tracking-wide text-muted-foreground">
                            {item.title}
                          </div>
                          {item.children.map((iitem, ii) => (
                            <Link
                              key={ii}
                              className={cn(
                                "flex select-none items-center gap-3 rounded-lg pl-8 pr-4 py-3 min-h-11 text-base font-medium leading-none no-underline outline-none transition-colors hover:bg-accent active:bg-accent/70"
                              )}
                              href={iitem.url as any}
                              target={iitem.target}
                              onClick={handleMobileMenuClose}
                            >
                              {iitem.title}
                            </Link>
                          ))}
                          <div className="h-px bg-border my-2 mx-4" />
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={i}
                        href={item.url as any}
                        target={item.target}
                        className="flex items-center gap-3 rounded-lg pl-8 pr-4 py-3 min-h-11 text-base font-medium text-foreground/90 transition-colors hover:bg-accent active:bg-accent/70 relative"
                        onClick={handleMobileMenuClose}
                      >
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
}