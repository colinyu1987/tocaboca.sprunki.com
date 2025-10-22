# Sprunki Rejoyed 開發文檔

## 專案概述

**專案名稱**: Sprunki Rejoyed
**域名**: play.sprunkirejoyed.com
**類型**: H5 音樂創作遊戲網站
**技術棧**: Next.js 15.2.3 + TypeScript + Tailwind CSS + next-intl
**語言**: 英文 (en) / 繁體中文 (zh)

## 專案起源

本專案從 ViMate AI（影片 AI 工具）Next.js 模板轉換而來，改造為 Sprunki Rejoyed 遊戲網站。

## 核心開發原則

### 1. 內容原則 - 最高優先級

**禁止營銷語言**
- ❌ 絕對禁止：Amazing, Incredible, Revolutionary 等誇張詞彙
- ❌ 禁止虛假內容：不編造角色名稱、假評論、未確認的更新
- ✅ 只使用事實陳述：描述實際存在的功能
- ✅ 面向玩家：「這是一個面向玩家的網站」

**內容真實性**
- 所有內容必須基於可驗證的事實
- 不確定的內容寧可不寫
- 發現虛假內容立即刪除

**參考**: 用戶分享的 Hacker News 討論強調避免營銷語言的重要性

### 2. 國際化 (i18n) 規範

**絕對禁止硬編碼文本**
```typescript
// ❌ 絕對禁止
<h1>Welcome to our app</h1>

// ✅ 正確做法
const t = useTranslations('home');
<h1>{t('title')}</h1>
```

**翻譯檔案結構**
- 位置: `i18n/messages/en.json`, `i18n/messages/zh.json`
- 結構: 三級組織 `頁面.區塊.元素`
- 所有語言文件必須保持相同的 key 結構
- 運行檢查: `pnpm i18n:check` 或 `node scripts/validate-i18n-line-order.js`

**語言配置**
- 繁體中文使用 🇹🇼 旗幟（不是 🇨🇳）
- 語言選擇器顯示「繁體中文」（不是簡體中文）

### 3. SEO 優化要求

**關鍵詞策略**
- 核心詞：Sprunki Rejoyed
- 密度要求：3%+
- 長尾詞：Phase 3, Phase 4, for Girls, online, free, play
- LSI 關鍵詞：Incredibox Sprunki, music creation game, browser game

**內容要求**
- 標題: Sprunki Rejoyed: Play Online Free
- 注重自然融入關鍵詞
- 避免關鍵詞堆砌

### 4. 樣式規範

**Tailwind CSS 優先級**
```typescript
// ✅ 推薦：使用語義化類名
<div className="bg-background text-foreground border-border">

// ❌ 禁止：硬編碼顏色
<div className="bg-white text-black">
<div style={{ backgroundColor: '#ffffff' }}>
```

**透明度限制**
- 只能使用 `app/css/compatibility.css` 中定義的透明度
- 支援: `/10, /20, /30, /40, /50, /60, /70, /80, /90`
- 部分支援: `/95`
- 禁止: `/15, /25, /35` 等未定義值

**標題字號標準**
- H1: `text-2xl sm:text-3xl lg:text-4xl`
- H2: `text-2xl sm:text-3xl`
- H3: `text-lg`
- 副標題/段落: `text-lg`

### 5. 組件開發規範

**命名約定**
- 組件文件夾: kebab-case (`home-page/`, `back-to-top/`)
- 組件檔案: PascalCase (`iframe-embed.tsx`)
- 索引檔案: `index.tsx`

**組件模板**
```typescript
'use client'

import { useTranslations } from 'next-intl'

interface ComponentProps {
  titleKey: string
  descriptionKey: string
}

export default function MyComponent({ titleKey, descriptionKey }: ComponentProps) {
  const t = useTranslations('section')

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          {t(titleKey)}
        </h2>
        <p className="text-lg text-muted-foreground">
          {t(descriptionKey)}
        </p>
      </div>
    </section>
  )
}
```

## 專案結構

### 首頁內容區塊（按順序）

1. **IframeEmbed** - 遊戲嵌入區
   - 遊戲 iframe 源: `https://iframegame.com/embed/sprunki-rejoyed/index.html`
   - 功能按鈕: 全螢幕、重新整理、分享
   - 位置: `components/page/home-page/iframe-embed.tsx`

2. **Variants** - 遊戲版本展示
   - 4個版本: 主版本, Phase 3, Phase 4, for Girls 2
   - 截圖位置: `public/games/`
   - 2x2 網格佈局

3. **Introduction** - 遊戲介紹
   - 說明什麼是 Sprunki Rejoyed
   - 核心玩法介紹
   - 平台兼容性

4. **HowToPlay** - 遊玩指南
   - 5步驟教學
   - 拖放機制說明

5. **Tips** - 遊玩技巧
   - 6個實用技巧
   - 從節奏開始、平衡聲音層等

6. **Versions** - 版本對比
   - Sprunki Rejoyed vs 原版 Sprunki
   - 4個主要差異點

7. **Gallery** - 媒體展示
   - YouTube 影片: `https://www.youtube.com/embed/aUgiu9o7MAw`
   - 4張遊戲截圖（佔位圖）

8. **Updates** - 更新內容
   - 只包含 2 個確認的更新
   - 人性化角色設計、恐怖模式

9. **Features** - 遊戲特性
   - 4個核心特性
   - 無圖片，使用圖標

10. **UseCases** - 玩家類型
    - 6種不同類型玩家
    - 無範例標籤

11. **FAQ** - 常見問題
    - 10個問題與答案
    - 涵蓋玩法、技術、兼容性

12. **CTA** - 行動呼籲
    - 最終引導玩家開始遊戲

### 已刪除的區塊

- ❌ **Hero**: 替換為 IframeEmbed
- ❌ **Characters**: 角色資訊不準確，內容編造
- ❌ **Testimonials**: 虛假玩家評論

## 重要檔案

### 配置檔案
- `package.json` - 專案元資料（name: sprunki-rejoyed）
- `.env.production` - 生產環境變數（NEXT_PUBLIC_URL）
- `i18n/locale.ts` - 語言配置（en, zh-TW）

### 翻譯檔案
- `i18n/messages/en.json` - 英文翻譯（320行）
- `i18n/messages/zh.json` - 繁體中文翻譯（320行）
- `i18n/pages/landing/en.json` - 英文頁眉/頁腳
- `i18n/pages/landing/zh.json` - 繁體中文頁眉/頁腳

### 頁面檔案
- `app/[locale]/(default)/page.tsx` - 首頁入口
- `components/layout/header/index.tsx` - 頁眉（導航居右）
- `components/layout/footer/index.tsx` - 頁腳

## 開發歷程關鍵決策

### 第一階段：專案轉換
1. 從 ViMate AI 改為 Sprunki Rejoyed
2. 更新所有品牌資訊和域名
3. 完整重寫英文和繁體中文翻譯

### 第二階段：內容重構
1. **營銷語言清理**
   - 用戶分享 HN 討論後，全面移除誇張用語
   - 改為事實陳述

2. **遊戲整合**
   - 更新 iframe 源為 Sprunki Rejoyed 遊戲
   - 將遊戲區作為首頁主體（Hero）
   - 添加功能按鈕（全螢幕、重新整理、分享）

3. **SEO 增強**
   - 新增 4 個核心內容區塊
   - Introduction, HowToPlay, Tips, Versions
   - 確保關鍵詞密度達標

### 第三階段：內容清理
1. **用戶質疑準確性**
   - 問題：「還有什麼是你瞎編的？」
   - 發現並刪除：Characters（假角色名）、Testimonials（假評論）
   - 保留：只有 2 個確認的更新內容

2. **UI 優化**
   - 移除 Features 區塊上方的圖片
   - 移除 UseCases 中的紫色範例標籤
   - 刪除遊戲區下方的描述文字

### 第四階段：視覺調整
1. **間距優化**
   - 減少頁面上方間距
   - H1 標題區域從 `pt-12/16/20` 改為 `pt-8/12/16`

2. **字號調整**
   - H1: 從 `3xl/4xl/5xl` 改為 `2xl/3xl/4xl`
   - H2: 從 `3xl/4xl` 改為 `2xl/3xl`
   - H3: 從 `xl` 改為 `lg`

### 第五階段：版本展示
1. **新增 Variants 區塊**
   - 用戶提供 4 張遊戲截圖
   - 展示不同版本：主版本、Phase 3、Phase 4、for Girls 2
   - 覆蓋長尾 SEO 關鍵詞

### 第六階段：導航優化
1. **頁眉調整**
   - Logo 字號從 `text-xl` 改為 `text-lg`
   - 菜單欄移到右側
   - 語言選擇器改為繁體中文 🇹🇼

## 開發要點記錄

### 用戶明確要求

1. **「減少營銷用語、夸張用户。這是一個面向玩家的網站」**
   - 這是核心指導原則
   - 所有內容都要事實陳述

2. **「不要營銷味，不要虛，不要夸張營傳語」**
   - SEO 優化時的明確要求
   - 關鍵詞自然融入，不堆砌

3. **「還有什麼是你瞎編的？」**
   - 用戶對內容真實性的高度關注
   - 導致刪除 Characters 和 Testimonials

4. **「按你意思」**
   - 用戶多次使用此回應
   - 表示信任 AI 的專業判斷

### 技術注意事項

1. **Git 初始化問題**
   - Windows 系統下存在 `nul` 檔案（保留名稱）
   - 需要刪除才能正常 commit

2. **行尾符號警告**
   - Windows 系統 LF → CRLF 轉換警告
   - 屬正常現象，不影響功能

3. **國際化一致性**
   - 使用 subagent 進行簡體→繁體轉換
   - 運行驗證腳本確保一致性

4. **響應式設計**
   - 使用 Tailwind 斷點：sm, md, lg
   - 移動端優先設計

## Git 記錄

### 初始提交
**Commit**: `9cbd4a6`
**訊息**: feat: 完成 Sprunki Rejoyed 網站基本開發
**日期**: 2025-10-01
**統計**: 146 files, 22,674 insertions

### 標籤
**Tag**: `基本完成`
**說明**: Sprunki Rejoyed 網站基本功能完成

**完成項目**:
- ✅ 遊戲嵌入與控制按鈕
- ✅ 11個內容區塊（無營銷語言）
- ✅ 英文/繁體中文國際化
- ✅ 4個遊戲版本展示
- ✅ SEO優化（關鍵詞密度3%+）
- ✅ 響應式設計
- ✅ 亮色/暗色主題

## 常用命令

```bash
# 開發伺服器
pnpm dev

# 類型檢查
pnpm type-check

# i18n 一致性檢查
pnpm i18n:check
node scripts/validate-i18n-line-order.js

# 構建
pnpm build

# Git 操作
git status
git log --oneline
git tag -l -n9
```

## 環境變數

```bash
# .env.production
NEXT_PUBLIC_URL=https://play.sprunkirejoyed.com
```

**重要提示**:
- 必須是完整 URL，包含協議（https://）
- 不能以斜杠結尾
- 用於 SEO、sitemap、metadata 生成

## 未來改進方向

### 可能需要補充的內容

1. **系統需求說明**（2-3句話）
   - 支援的瀏覽器
   - 網速建議
   - 觸控支援

2. **真實角色資訊**（需要準確資料）
   - 等獲得真實角色名稱和聲音類型再添加

3. **社群連結**（如果有）
   - Discord
   - YouTube 頻道
   - 社交媒體

4. **相關遊戲推薦**（如果有）
   - 其他 Sprunki 變體
   - 相關音樂遊戲

### 技術優化

1. **圖片優化**
   - 目前使用佔位圖的截圖需要替換為真實截圖
   - 壓縮圖片大小提升載入速度

2. **效能優化**
   - 使用 React.memo、useCallback、useMemo
   - 圖片懶載入

3. **SEO 進階**
   - Schema.org 結構化資料
   - Open Graph 優化
   - Twitter Card 優化

## 維護指南

### 新增內容區塊

1. 在 `components/page/home-page/` 創建新組件
2. 在 `i18n/messages/en.json` 和 `zh.json` 添加翻譯
3. 運行 `pnpm i18n:check` 驗證
4. 在 `app/[locale]/(default)/page.tsx` 中引入
5. 測試響應式設計和主題兼容性

### 修改現有內容

1. ⚠️ **禁止**直接修改組件中的文本
2. ✅ **正確**：在翻譯檔案中修改對應 key
3. 確保英文和繁體中文同步修改
4. 運行一致性檢查

### 翻譯檔案維護

```json
// 正確的翻譯結構示例
{
  "home": {
    "sectionName": {
      "title": "Section Title",
      "subtitle": "Section Subtitle",
      "item1": {
        "title": "Item 1 Title",
        "description": "Item 1 Description"
      }
    }
  }
}
```

## 開發者備註

- **專案定位**: 面向玩家的遊戲網站，非商業推廣網站
- **內容原則**: 真實、客觀、實用，絕不誇張
- **SEO 策略**: 自然融入關鍵詞，重視長尾詞和 LSI
- **用戶體驗**: 簡潔專業，玩家進來主要是玩遊戲，不是讀文章
- **技術選型**: 充分利用 Next.js 15 特性，保持代碼簡潔

## 聯絡資訊

- **專案**: Sprunki Rejoyed
- **網站**: https://play.sprunkirejoyed.com
- **Email**: support@sprunki.com
- **Git**: dev@sprunkirejoyed.com

---

**最後更新**: 2025-10-01
**版本**: 基本完成
**維護者**: Sprunki Rejoyed Dev Team
