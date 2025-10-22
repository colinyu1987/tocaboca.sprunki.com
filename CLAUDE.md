# Next.js 国际化项目 - Claude Code 开发规范

## 项目概览

这是一个基于 Next.js 14+ 和 TypeScript 的现代化 Web 应用程序，采用 App Router 架构，具有完整的国际化支持。项目优先考虑多语言用户体验、类型安全和可维护性。

### 核心技术栈
- **框架**: Next.js 14+ with App Router
- **语言**: TypeScript (严格模式)
- **样式**: Tailwind CSS + Shadcn UI
- **国际化**: next-intl
- **主题**: next-themes (亮色/暗色模式)
- **通知**: sonner
- **内容管理**: MDX
- **包管理**: pnpm

### 环境配置
- **NEXT_PUBLIC_URL**: 项目的完整域名地址（如 `https://example.com`），用于生成绝对路径、SEO metadata、sitemap 等功能

### 项目结构
```
├── app/
│   ├── [locale]/           # 本地化页面
│   ├── (legal)/           # 法律文件 (MDX, i18n例外)
│   ├── (content)/         # 博客内容 (i18n例外)
│   └── css/               # 全局样式文件
├── components/
│   ├── ui/                # Shadcn UI 组件
│   ├── widget/            # 自定义可重用组件
│   ├── page/              # 页面特定组件
│   ├── layout/            # 布局组件
│   └── locale/            # 语言切换组件
├── i18n/
│   ├── messages/          # 翻译文件 (en.json, zh.json)
│   └── pages/landing/     # 页面特定翻译
├── types/                 # TypeScript 类型定义
├── lib/                   # 工具函数
└── services/              # 业务逻辑层
```

## 🚨 关键开发规范

### 国际化 (i18n) - 最高优先级规则

**绝对禁止硬编码任何用户可见文本！**

```typescript
// ❌ 绝对禁止
<h1>Welcome to our app</h1>
<button>Submit</button>
const message = "Hello World";

// ✅ 正确做法
const t = useTranslations('common');
<h1>{t('welcome_message')}</h1>
<button>{t('button_submit')}</button>
```

#### 国际化工作流程
1. 所有文案必须放在 `i18n/messages/` 中
2. 新增 key 时必须同时更新所有语言文件 (en.json, zh.json)
3. 运行一致性检查: `node scripts/validate-i18n-line-order.js`
4. 客户端组件使用 `useTranslations()`，服务端组件使用 `getTranslations()`

#### 国际化例外
- `app/(legal)/` - 法律文件
- `app/(content)/` - 博客内容
- 技术文档和调试信息

### TypeScript 规范

#### 核心原则
- **确保类型安全** - 避免使用 `any` 类型
- **使用 ESM 导入** - 优先使用 `import/export` 而不是 `require`
- **明确类型定义** - 为组件、函数、变量提供明确的类型
- **遵循命名约定** - 使用 camelCase 和 PascalCase

```typescript
// ✅ 推荐：明确的接口定义
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'zh';
  notifications: {
    email: boolean;
    push: boolean;
  };
}

// ❌ 避免：过度使用 any
interface BadProfile {
  id: any;
  data: any;
  config: any;
}

// ✅ 高级类型使用
type LoadingState = 'idle' | 'loading' | 'success' | 'error';
type UserBasicInfo = Pick<UserProfile, 'id' | 'name' | 'email'>;
type CreateUserData = Omit<UserProfile, 'id' | 'createdAt'>;

// ✅ 类型守卫
function isUserProfile(obj: any): obj is UserProfile {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.email === 'string'
  );
}
```

### 样式规范 - Tailwind CSS

## 核心原则
**样式优先使用 `app/css/theme.css` 中定义的 CSS 变量，避免硬编码颜色值**

## 样式优先级
1. **Tailwind CSS 类名** - 首选方案
2. **CSS 变量** - 主题兼容的颜色系统
3. **内联样式** - 仅在实在没办法时使用

```tsx
// ✅ 推荐
<div className="bg-background text-foreground border-border">
  <h1 className="text-primary">Title</h1>
  <p className="text-muted-foreground">Description</p>
</div>

// ❌ 禁止
<div className="bg-white text-black border-gray-200">
<div style={{ backgroundColor: '#ffffff' }}>
```

#### 透明度限制
**只能使用 `app/css/compatibility.css` 中实际定义的透明度类**

支持的透明度值：
- **基本透明度**: `/10`, `/20`, `/30`, `/40`, `/50`, `/60`, `/70`, `/80`, `/90`
- **特殊透明度**: `/95` (仅部分颜色支持)

支持的颜色组合示例：
- **语义化颜色**: `bg-primary/10`, `text-foreground/50`, `border-border/30` 等
- **具体颜色**: `bg-black/20`, `bg-white/80`, `text-muted-foreground/60` 等  
- **伪类状态**: `hover:bg-primary/90`, `group-hover:bg-accent/20` 等

**注意**: 以上仅为部分示例，完整支持列表请查看 `app/css/compatibility.css` 文件

❌ **禁止使用未定义的透明度**: `/15`, `/25`, `/35` 等

#### 语义化类名参考
- 背景: `bg-background`, `bg-card`, `bg-muted`, `bg-primary`, `bg-secondary`, `bg-accent`, `bg-destructive`
- 文字: `text-foreground`, `text-muted-foreground`, `text-primary`, `text-secondary`, `text-accent`, `text-destructive`
- 边框: `border-border`, `border-input`, `border-primary`, `border-destructive`

### 组件开发规范

```typescript
// ✅ 函数式组件模板
'use client';

import { useTranslations } from 'next-intl';

interface BackToHomeButtonProps {
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
}

export default function FeatureCard({ titleKey, descriptionKey, icon }: BackToHomeButtonProps) {
  const t = useTranslations('features');
  
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-card-foreground">
          {t(titleKey)}
        </h3>
      </div>
      <p className="text-muted-foreground">
        {t(descriptionKey)}
      </p>
    </div>
  );
}
```

#### 组件命名约定
- **组件名称使用 camel-model-case 格式**
- 文件夹: kebab-case (`home-page/`, `back-to-top/`)
- 文件名: PascalCase (`back-to-home-button.tsx`)
- 索引文件: `index.tsx`

#### 导入组织顺序
1. React 和 Next.js 框架导入
2. UI 组件 (`@/components/ui/*`)
3. 自定义组件和工具 (`@/lib/*`, `@/services/*`)

### 性能优化

```typescript
// ✅ 适当使用性能优化
import { memo, useCallback, useMemo } from 'react';

const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  const processedData = useMemo(() => {
    return data.filter(item => item.isActive);
  }, [data]);
  
  const handleClick = useCallback((id: string) => {
    // 处理点击
  }, []);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {processedData.map(item => (
        <ItemCard key={item.id} item={item} onClick={handleClick} />
      ))}
    </div>
  );
});
```

## 文件操作规范

### 文件管理
- **删除文件前必须获得用户确认**
- 优先编辑现有文件而非创建新文件
- 可以根据功能需要创建新文件
- 避免创建不必要的文档文件

### 代码维护
- 立即清理未使用的导入
- 移除注释掉的代码
- 修复 linter 错误
- 保持一致的代码格式

## 开发工作流程

### 开发前检查清单
- [ ] 理解需求和设计规范
- [ ] 检查现有组件和模式
- [ ] 规划组件结构和命名

### 开发中检查清单
- [ ] 遵循 TypeScript 最佳实践
- [ ] 为所有用户可见文本实现国际化
- [ ] 使用语义化 Tailwind 类
- [ ] 清理未使用的导入
- [ ] 测试主题兼容性

### 开发后检查清单
- [ ] 运行 TypeScript 类型检查
- [ ] 执行国际化一致性验证: `pnpm i18n:check`
- [ ] 测试亮色/暗色主题切换
- [ ] 验证响应式设计
- [ ] 确保组件可重用性

## 常用命令

```bash
# 开发服务器
pnpm dev

# 类型检查
pnpm type-check

# 国际化一致性检查
pnpm i18n:check
# 或
node scripts/validate-i18n-line-order.js

# 构建
pnpm build

# Linting
pnpm lint
```

## 环境变量配置

项目需要以下环境变量（在 `.env.local` 文件中配置）：

```bash
# 项目域名（必需）- 用于 SEO、sitemap 等功能
NEXT_PUBLIC_URL=https://your-domain.com

# 开发环境示例
NEXT_PUBLIC_URL=http://localhost:3000
```

**重要提示**: `NEXT_PUBLIC_URL` 必须是完整的 URL，包含协议（http:// 或 https://），不能以斜杠结尾。

## 错误处理和调试

### Linter 错误处理
- 优先修复 TypeScript 类型错误

### 常见问题解决
1. **国际化键缺失**: 检查所有语言文件是否同步
2. **样式不工作**: 确认使用语义化类名而非硬编码颜色
3. **类型错误**: 避免使用 `any`，定义具体接口

## 项目优先级

1. **国际化完整性** - 绝对不能有硬编码文本
2. **类型安全** - 严格的 TypeScript 类型检查
3. **主题兼容性** - 支持亮色/暗色模式
4. **响应式设计** - 移动端优先
5. **性能优化** - 合理使用 React 优化技术
6. **代码可维护性** - 清晰的组件结构和命名

## 模块化开发指导

### 📁 `components/` 目录规范

#### UI 组件 (`components/ui/`)
- **用途**: Shadcn UI 组件及其包装器
- **规范**: 
  - 保持与 Shadcn UI 原始 API 一致
  - 可以添加项目特定的默认值和样式
  - 必须支持主题切换
  - 所有 props 必须有 TypeScript 接口定义

```typescript
// 示例: components/ui/button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
```

#### 自定义组件 (`components/widget/`)
- **用途**: 项目特定的可重用组件
- **规范**:
  - 必须实现国际化支持
  - 使用语义化 Tailwind 类名
  - 支持响应式设计
  - 提供清晰的 Props 接口

```typescript
// 示例: components/widget/feature-card.tsx
interface FeatureCardProps {
  titleKey: string;        // i18n key
  descriptionKey: string;  // i18n key
  icon: React.ReactNode;
  className?: string;
}
```

#### 页面组件 (`components/page/`)
- **用途**: 特定页面的组件模块
- **规范**:
  - 按页面分组织织 (`home-page/`, `about-page/`)
  - 每个组件都要国际化
  - 使用 `index.tsx` 作为主导出文件

#### 布局组件 (`components/layout/`)
- **用途**: Header、Footer、导航等布局组件
- **规范**:
  - 必须支持多语言切换
  - 响应式设计优先
  - 主题切换兼容

#### 语言组件 (`components/locale/`)
- **用途**: 语言切换相关功能
- **规范**:
  - 使用 next-intl 的路由系统
  - 保持 URL 结构一致性
  - 提供良好的用户体验

### 📁 `app/` 目录规范

#### 本地化页面 (`app/[locale]/`)
- **服务端组件优先**: 使用 `getTranslations()` 获取翻译
- **SEO 优化**: 每个页面都要有合适的 metadata
- **布局一致性**: 使用统一的布局组件

```typescript
// 示例: app/[locale]/page.tsx
import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations('home');
  
  return (
    <main className="min-h-screen bg-background">
      <h1 className="text-foreground">{t('page_title')}</h1>
    </main>
  );
}
```

#### 法律文件 (`app/(legal)/`)
- **MDX 内容**: 使用 MDX 编写法律文档
- **国际化例外**: 这些文件不需要 next-intl 处理
- **样式一致**: 使用统一的 MDX 样式

#### 博客内容 (`app/(content)/`)
- **MDX 支持**: 博客文章使用 MDX 格式
- **国际化例外**: 内容本身不需要国际化
- **SEO 友好**: 合适的 metadata 和结构

### 📁 `i18n/` 目录规范

#### 翻译文件 (`i18n/messages/`)
- **文件命名**: `en.json`, `zh.json`
- **结构一致**: 所有语言文件必须有相同的 key 结构
- **嵌套组织**: 使用嵌套对象组织相关翻译

```json
{
  "common": {
    "button_submit": "Submit",
    "button_cancel": "Cancel",
    "loading": "Loading..."
  },
  "home": {
    "hero": {
      "title": "Welcome to Our App",
      "description": "Build amazing things"
    }
  }
}
```

#### 页面特定翻译 (`i18n/pages/`)
- **按页面组织**: 每个主要页面有自己的翻译命名空间
- **避免重复**: 公共翻译放在 `messages/` 中

### 📁 `types/` 目录规范

#### 全局类型 (`types/global.d.ts`)
- **环境变量类型**: 定义所有环境变量的类型
- **全局扩展**: Window 对象等全局扩展

#### 环境变量说明
```typescript
// types/env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_URL: string; // 项目完整域名，如 https://example.com
      // 其他环境变量...
    }
  }
}
```

**重要环境变量**:
- `NEXT_PUBLIC_URL`: 项目的完整域名地址（必须包含协议，如 `https://example.com`）
  - 用于生成 sitemap.xml 中的绝对路径
  - SEO metadata 中的 canonical URL
  - Open Graph 和 Twitter Card 的 URL
  - 多语言 hreflang 标签的生成

#### 组件类型 (`types/components.ts`)
- **通用接口**: 定义常用的组件 Props 接口
- **类型复用**: 避免重复定义相似类型

#### API 类型 (`types/api.ts`)
- **请求响应类型**: 定义所有 API 的请求和响应类型
- **错误类型**: 统一的错误处理类型

### 📁 `lib/` 目录规范

#### 工具函数 (`lib/utils.ts`)
- **纯函数优先**: 避免副作用
- **类型安全**: 所有函数都有明确的类型定义
- **单一职责**: 每个函数只做一件事

#### 元数据工具 (`lib/metadata.ts`)
- **SEO 优化**: 生成页面 metadata 的工具函数
- **国际化支持**: 支持多语言 SEO

### 📁 `services/` 目录规范

#### API 服务层
- **错误处理**: 统一的错误处理机制
- **类型安全**: 使用 TypeScript 类型
- **可测试性**: 易于单元测试的结构

## 开发最佳实践按模块

### 🎨 样式开发
- 在 `app/css/theme.css` 中定义 CSS 变量
- 组件中只使用语义化 Tailwind 类名
- 确保亮色/暗色主题兼容

### 🌍 国际化开发
- 新增文案时同时更新所有语言文件
- 使用描述性的 key 名称
- **翻译 Key 结构化组织**：采用三级结构 `页面名.区块名.元素名`
  - 页面级：`about`、`pricing`、`contact`
  - 区块级：`hero`、`features`、`cta`、`testimonials`
  - 元素级：`title`、`description`、`button_text`
- 运行 `pnpm i18n:check` 验证一致性

### ⚛️ 组件开发
- 优先使用函数式组件
- 合理使用 React.memo、useCallback、useMemo
- 为所有 props 定义 TypeScript 接口

### 📱 响应式开发
- 移动端优先设计
- 使用 Tailwind 的响应式前缀
- 测试各种屏幕尺寸

---

**记住**: 本项目的核心价值是提供优秀的多语言用户体验，所有开发决策都应该围绕这个目标进行。当遇到技术选择时，优先考虑国际化友好性和长期可维护性。
