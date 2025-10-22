# Next.js 国际化项目开发规范

<项目背景>
这是一个基于 Next.js 14+ 和 TypeScript 的应用程序，使用 App Router 架构，具有完整的国际化支持，采用现代化的 UI 组件和样式系统。

核心技术栈：
- 框架：Next.js 14+ with App Router
- 语言：TypeScript（严格模式）
- 样式：Tailwind CSS + Shadcn UI 组件
- 国际化：next-intl
- 主题：next-themes（亮色/暗色模式）
- 通知：sonner
- 内容：MDX（用于法律文件和博客内容）

环境配置：
- **NEXT_PUBLIC_URL**: 项目的完整域名地址（如 `https://example.com`），用于生成绝对路径、SEO metadata、sitemap 等功能
</项目背景>

## 项目架构规范

### 文件结构标准
```
app/[locale]/          # 本地化页面
app/(legal)/           # 法律文件页面（MDX，国际化例外）
app/(content)/         # 博客内容（国际化例外）
components/ui/         # Shadcn UI 组件及其包装器
components/widget/     # 自定义可重用组件
components/page/       # 页面特定组件
components/layout/     # 布局组件（header、footer）
components/locale/     # 语言切换相关组件
i18n/messages/         # 翻译文件
```

### 组件开发规范

1. **始终使用函数式组件** 配合 React hooks
2. **组件命名**：使用 camel-model-case 格式
   - 文件夹：kebab-case（`home-page/`、`back-to-top/`）
   - 文件：PascalCase（`back-to-home-button.tsx`）
   - 索引文件：`index.tsx`

3. **TypeScript 接口** 必须为所有组件 props 定义：
```tsx
interface BackToHomeButtonProps {
  variant?: 'default' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

<国际化要求>
关键的国际化规则：
- 绝对不能在组件中硬编码任何用户可见的文本
- 所有文案必须放在 i18n/messages/ 翻译文件中
- 新增翻译 key 时必须同时添加到所有语言文件中
- 添加 key 后必须运行一致性检查：node scripts/validate-i18n-line-order.js
- 客户端组件使用 useTranslations()，服务端组件使用 getTranslations()
</国际化要求>

### 使用模式
```tsx
// 客户端组件
'use client';
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('namespace');
  return <h1>{t('title')}</h1>;
}

// 服务端组件
import { getTranslations } from 'next-intl/server';

export default async function ServerComponent() {
  const t = await getTranslations('namespace');
  return <h1>{t('title')}</h1>;
}
```

### 翻译 Key 组织规范
- **三级结构**：`页面名.区块名.元素名`
- **页面级**：`about`、`pricing`、`contact`
- **区块级**：`hero`、`features`、`cta`、`testimonials`
- **元素级**：`title`、`description`、`button_text`
- **命名约定**：使用小写字母和下划线，如 `button_submit`、`error_message`

### 国际化例外情况（不需要国际化）
- `app/(legal)/` 中的法律文件（MDX 内容）
- `app/(content)/` 中的博客内容
- 技术文档
- 调试信息和日志

<样式规范>
Tailwind CSS 标准：
- 始终使用 app/css/theme.css 中的语义化 Tailwind 类
- 绝不硬编码颜色值（#ffffff、rgb() 等）
- 只能使用 `app/css/compatibility.css` 中实际定义的透明度类
- 常见透明度值：/10、/20、/30、/40、/50、/60、/70、/80、/90（部分颜色支持 /95）
- 支持多种颜色组合：bg-primary/10、text-foreground/50、border-border/30 等
- 禁止使用未定义的透明度值如 /15、/25、/35 等
- 完整支持列表请查看 compatibility.css 文件
- 确保样式在亮色和暗色主题下都能正常工作

推荐的语义化类名：
- 背景色：bg-background、bg-card、bg-muted、bg-primary、bg-secondary、bg-accent、bg-destructive
- 文字色：text-foreground、text-muted-foreground、text-primary、text-secondary、text-accent、text-destructive
- 边框色：border-border、border-input、border-primary、border-destructive
</样式规范>

<编码规范>
TypeScript 要求：
- 禁止使用 any 类型 - 使用适当的类型定义
- 使用 ESM 导入（import/export）而非 require
- 为所有组件 props 和 API 响应定义接口
- 尽可能实现类型守卫而不是类型断言

组件开发：
- 始终使用函数式组件配合 React hooks
- 组件命名：camel-model-case 格式（文件夹：kebab-case，文件：back-to-home-button.tsx）
- 对昂贵组件使用 React.memo
- 适当实现 useCallback 和 useMemo
- 为所有图标添加 flex-shrink-0 防止变形
- 优先使用 lucide-react 图标而非内联 SVG

导入组织：
1. 框架导入（React、Next.js）
2. UI 组件（@/components/ui/*）
3. 工具和服务（@/lib/*、@/services/*）
</编码规范>

<文件管理>
文件操作：
- 删除任何文件前必须获得用户确认
- 优先编辑现有文件而非创建新文件
- 可以根据功能需要创建新文件
- 避免创建不必要的文档文件

代码维护：
- 立即清理未使用的导入
- 移除注释掉的代码
- 修复 linter 错误
- 保持一致的代码格式
</文件管理>

## 开发检查清单

**开发前：**
- 理解需求和设计规范
- 检查现有组件和模式
- 规划组件结构和命名

**开发中：**
- 遵循 TypeScript 最佳实践
- 为所有用户可见文本实现国际化
- 使用语义化 Tailwind 类
- 清理未使用的导入
- 测试主题兼容性

**开发后：**
- 运行 TypeScript 类型检查
- 执行国际化一致性验证
- 测试跨主题功能
- 验证响应式设计

**质量标准：**
- 组件使用函数式语法配合 hooks
- Props 接口定义清晰
- 所有文本都已国际化
- 样式使用语义化 Tailwind 类
- TypeScript 类型定义正确
- 导入组织整洁
- 组件具有响应式和主题兼容性

**记住：** 本项目优先考虑国际化、无障碍访问和可维护的代码架构。

## 环境变量配置

项目需要以下环境变量（在 `.env.local` 文件中配置）：

```bash
# 项目域名（必需）- 用于 SEO、sitemap 等功能
NEXT_PUBLIC_URL=https://your-domain.com

# 开发环境示例
NEXT_PUBLIC_URL=http://localhost:3000
```

**重要说明**:
- `NEXT_PUBLIC_URL`: 项目的完整域名地址（必须包含协议，如 `https://example.com`）
  - 用于生成 sitemap.xml 中的绝对路径
  - SEO metadata 中的 canonical URL
  - Open Graph 和 Twitter Card 的 URL
  - 多语言 hreflang 标签的生成
- URL 格式要求：必须是完整的 URL，包含协议（http:// 或 https://），不能以斜杠结尾
