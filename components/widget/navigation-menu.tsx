"use client"

import * as React from "react"
import { Link } from "@/i18n/routing"
import { LucideIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

// Types
export interface NavLink {
  title: string
  href: string
  description?: string
  icon?: LucideIcon
  target?: string
}

export interface NavGroup {
  title: string
  trigger?: boolean
  items: NavLink[]
  featured?: NavLink // 特色链接，会在左侧大块显示
}

export interface NavigationMenuWidgetProps {
  groups: NavGroup[]
  className?: string
}

// ListItem Component
const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & {
    title: string
    icon?: LucideIcon
  }
>(({ className, title, children, icon: Icon, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href as any}
          className={cn(
            "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

// FeaturedItem Component
const FeaturedItem: React.FC<{ item: NavLink }> = ({ item }) => {
  return (
    <li className="row-span-3">
      <NavigationMenuLink asChild>
        <Link
          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-muted p-6 no-underline outline-none focus:shadow-md"
          href={item.href as any}
          target={item.target}
        >
          {item.icon && React.createElement(item.icon, { className: "h-6 w-6" })}
          <div className="mb-2 mt-4 text-lg font-medium">
            {item.title}
          </div>
          {item.description && (
            <p className="text-sm leading-tight text-muted-foreground">
              {item.description}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

// SimpleMenuItem Component - 简单的菜单项，只有标题
const SimpleMenuItem: React.FC<{ item: NavLink }> = ({ item }) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={item.href as any}
        target={item.target}
        className="block w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
      >
        <div className="flex items-center gap-2">
          {item.icon && React.createElement(item.icon, { className: "h-4 w-4" })}
          {item.title}
        </div>
      </Link>
    </NavigationMenuLink>
  )
}

// Main Navigation Widget Component
export function NavigationMenuWidget({
  groups,
  className
}: NavigationMenuWidgetProps) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {groups.map((group, index) => {
          // 如果没有trigger，则作为单独的链接项
          if (!group.trigger && group.items.length === 1) {
            const item = group.items[0]
            return (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href as any}
                    target={item.target}
                    className={navigationMenuTriggerStyle()}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon && React.createElement(item.icon, { className: "h-4 w-4" })}
                      {item.title}
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          }

          // 有trigger的下拉菜单
          return (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger>{group.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className={cn(
                  "grid gap-1 p-2",
                  // 如果有featured item，使用特殊布局
                  group.featured
                    ? "md:w-[320px] lg:w-[420px] lg:grid-cols-[.75fr_1fr]"
                    : group.items.every(item => !item.description)
                      // 如果所有items都没有description，使用简单布局 - 增加宽度避免换行
                      ? "w-[220px]"
                      // 如果items有description，根据数量决定列数
                      : group.items.length > 3
                        ? "w-[320px] md:w-[420px] md:grid-cols-2 lg:w-[520px]"
                        : "w-[320px]"
                )}>
                  {/* Featured Item */}
                  {group.featured && <FeaturedItem item={group.featured} />}

                  {/* Regular Items */}
                  {group.items.map((item, itemIndex) => {
                    // 如果item没有description，使用简单样式
                    if (!item.description) {
                      return (
                        <li key={itemIndex}>
                          <SimpleMenuItem item={item} />
                        </li>
                      )
                    }

                    // 有description的完整样式
                    return (
                      <ListItem
                        key={itemIndex}
                        title={item.title}
                        href={item.href as any}
                        target={item.target}
                        icon={item.icon}
                      >
                        {item.description}
                      </ListItem>
                    )
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
