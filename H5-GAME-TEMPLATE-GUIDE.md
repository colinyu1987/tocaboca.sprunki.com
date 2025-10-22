# H5 遊戲網站開發模板指南

> 基於 Sprunki Rejoyed 專案的通用 H5 遊戲網站開發範本

## 適用場景

本模板適合以下類型的 H5 遊戲網站：
- 🎮 瀏覽器內嵌遊戲（iframe 嵌入）
- 🎵 音樂/節奏類遊戲
- 🎨 創意互動遊戲
- 🧩 休閒益智遊戲
- 🎯 任何需要雙語（英文/中文）支援的遊戲網站

## 快速開始檢查清單

### 第一步：專案信息確認

在開始開發前，務必確認以下資訊：

```markdown
## 遊戲基本資訊
- [ ] 遊戲名稱（英文/中文）
- [ ] 遊戲類型（音樂/益智/動作等）
- [ ] 目標域名
- [ ] 遊戲 iframe URL（如果是嵌入式）
- [ ] 核心關鍵詞（3-5個）
- [ ] 長尾關鍵詞列表

## 遊戲內容資訊
- [ ] 遊戲玩法說明（3-5步）
- [ ] 遊戲特色（3-5個）
- [ ] 目標玩家群體
- [ ] 是否有多個版本/模式
- [ ] 是否有角色系統

## 素材準備
- [ ] Logo（建議 512x512px）
- [ ] Favicon
- [ ] 遊戲截圖（至少 4 張，建議 1920x1080）
- [ ] 宣傳影片（YouTube/其他平台）
- [ ] 版本/變體截圖（如果有）

## SEO 資訊
- [ ] Meta Title 模板
- [ ] Meta Description
- [ ] 關鍵詞密度目標（建議 3%+）
- [ ] Open Graph 圖片
```

## 核心開發原則（必須遵守）

### 1. 內容真實性原則 ⭐⭐⭐⭐⭐

**最高優先級**：絕對禁止編造內容

```markdown
❌ 絕對禁止：
- 編造角色名稱和屬性
- 虛假玩家評論
- 未確認的功能更新
- 誇張的營銷語言（Amazing, Revolutionary, Best Ever）
- 虛構的下載量/用戶數

✅ 必須做到：
- 只描述實際存在的功能
- 使用事實陳述
- 不確定的內容寧可不寫
- 所有數據必須可驗證
```

**範例對比**：

```markdown
❌ 錯誤寫法：
"Our amazing game has been downloaded over 10 million times!
Players love our revolutionary music system!"

✅ 正確寫法：
"A browser-based music creation game. Combine character sounds
to create layered musical compositions."
```

### 2. 面向用戶原則

**核心理念**：「這是一個面向玩家的網站」

```markdown
網站目的優先級：
1. 讓玩家快速開始遊戲 ⭐⭐⭐⭐⭐
2. 提供實用的遊玩指南 ⭐⭐⭐⭐
3. 回答常見問題 ⭐⭐⭐
4. SEO 優化 ⭐⭐
5. 品牌宣傳 ⭐

內容組織：
- 遊戲區放在最上方（首屏）
- 說明文字簡潔明瞭
- 避免冗長的介紹
- 專注於「怎麼玩」而非「多厲害」
```

### 3. 國際化必須項

```typescript
// ❌ 絕對禁止
export default function GameSection() {
  return <h1>Play Now</h1>
}

// ✅ 正確做法
export default function GameSection() {
  const t = useTranslations('game')
  return <h1>{t('play_now')}</h1>
}
```

**檢查要點**：
- [ ] 所有用戶可見文本都在翻譯檔案中
- [ ] 英文/中文翻譯檔案 key 結構完全一致
- [ ] 運行 `pnpm i18n:check` 通過
- [ ] 按鈕文字、錯誤提示都已國際化

## 標準頁面結構範本

### 推薦的區塊順序

```typescript
// app/[locale]/(default)/page.tsx
export default function GamePage() {
  return (
    <>
      {/* 1. 遊戲主體 - 最重要 */}
      <GameEmbed />

      {/* 2. 版本/變體展示（如果有多個版本） */}
      <GameVariants />

      {/* 3. 遊戲介紹 - What is [Game Name]? */}
      <Introduction />

      {/* 4. 遊玩指南 - How to Play */}
      <HowToPlay />

      {/* 5. 遊玩技巧（可選） */}
      <Tips />

      {/* 6. 版本對比（如果是改版/模組） */}
      <VersionComparison />

      {/* 7. 媒體展示 - 影片 + 截圖 */}
      <Gallery />

      {/* 8. 更新內容（可選） */}
      <Updates />

      {/* 9. 遊戲特性 */}
      <Features />

      {/* 10. 玩家類型/使用場景 */}
      <UseCases />

      {/* 11. 常見問題 */}
      <FAQ />

      {/* 12. CTA - 行動呼籲 */}
      <CTA />
    </>
  )
}
```

### 必須區塊（核心）

#### 1. GameEmbed - 遊戲嵌入區

```typescript
// components/page/home-page/game-embed.tsx
'use client'

export default function GameEmbed() {
  const t = useTranslations('game.embed')
  const [iframeKey, setIframeKey] = useState(0)

  return (
    <section id="play-game" className="pt-8 pb-8 sm:pt-12 sm:pb-12 lg:pt-16 lg:pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* H1 標題 - 最重要的 SEO 元素 */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6">
          {t('title')} {/* 例: [Game Name]: Play Online Free */}
        </h1>

        {/* Iframe */}
        <iframe
          key={iframeKey}
          src="YOUR_GAME_URL"
          title={t('iframe_title')}
          className="w-full border-0 rounded-lg shadow-2xl"
          style={{ height: "700px", aspectRatio: "16/9" }}
          allowFullScreen
        />

        {/* 控制按鈕 */}
        <div className="flex gap-3 mt-4 justify-center">
          <button onClick={handleFullscreen}>
            {t('buttons.fullscreen')}
          </button>
          <button onClick={() => setIframeKey(prev => prev + 1)}>
            {t('buttons.refresh')}
          </button>
          <button onClick={handleShare}>
            {t('buttons.share')}
          </button>
        </div>
      </div>
    </section>
  )
}
```

**重要注意事項**：
- H1 標題必須包含遊戲名稱 + 核心關鍵詞
- iframe 必須設置 `title` 屬性（無障礙和 SEO）
- 全螢幕、重新整理、分享是標配功能

#### 2. Introduction - 遊戲介紹

```markdown
必須回答的問題：
1. 這是什麼遊戲？（1-2句話）
2. 核心玩法是什麼？（2-3句話）
3. 在哪裡可以玩？（瀏覽器/平台）
4. 是否免費？是否需要下載？

字數控制：
- 總計 150-250 字（英文）
- 3-4 個段落
- 避免冗長介紹
```

#### 3. HowToPlay - 遊玩指南

```markdown
格式：3-7 步驟

範例結構：
Step 1: [動作動詞] - 簡短說明
Step 2: [動作動詞] - 簡短說明
...

注意事項：
- 每步不超過 20 字
- 使用祈使句（Do this, Click that）
- 按實際遊玩順序排列
```

#### 4. FAQ - 常見問題

```markdown
必須包含的問題類型：
1. What is [Game Name]? (遊戲介紹)
2. How to play? (玩法)
3. Is it free? (價格)
4. Do I need to download? (安裝)
5. What devices are supported? (兼容性)
6. Won't load - troubleshooting (故障排除)

建議問題數量：8-12 個
```

### 可選區塊（根據遊戲特性）

#### GameVariants - 多版本展示

**適用場景**：
- 遊戲有多個版本（Phase 1, 2, 3...）
- 有不同主題變體（for Girls, Halloween, Christmas）
- 有不同難度模式

**不適用場景**：
- 只有單一版本的遊戲
- 版本差異不明顯

#### Tips - 遊玩技巧

**適用場景**：
- 遊戲有一定策略性
- 新手容易犯錯
- 有隱藏機制/彩蛋

**不適用場景**：
- 極簡單的點擊遊戲
- 完全隨機的遊戲

#### VersionComparison - 版本對比

**適用場景**：
- 這是改版/模組/粉絲作品
- 需要說明與原版的區別

**不適用場景**：
- 原創遊戲
- 無明確對比對象

## SEO 優化清單

### Meta 標籤模板

```typescript
// app/[locale]/(default)/page.tsx
export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations()

  return {
    title: t("metadata.home_page.title"),
    // 格式: [Game Name]: Play Online Free - [主要特色]

    description: t("metadata.home_page.description"),
    // 格式: Play [Game Name] online free. [核心玩法簡述].
    //       Browser game. No download required.

    keywords: t("metadata.home_page.keywords"),
    // 格式: game name, play game name, game name online,
    //       game name free, game type, similar games

    openGraph: {
      title: t("metadata.home_page.title"),
      description: t("metadata.home_page.description"),
      url: process.env.NEXT_PUBLIC_URL,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
  }
}
```

### 關鍵詞策略

```markdown
## 核心詞（必須）
- 遊戲完整名稱
- 出現位置：H1, Title, Description, 首段

## 次要詞（高頻）
- play [game name]
- [game name] online
- [game name] free
- [game name] game
- 出現位置：各區塊標題、內文

## 長尾詞（自然融入）
- how to play [game name]
- [game name] tips
- [game name] guide
- [game name] for [平台/設備]
- 出現位置：FAQ、Tips、HowToPlay

## 密度要求
- 核心詞：3-5%
- 次要詞：1-3%
- 長尾詞：0.5-1%

## 檢查方法
1. Ctrl+F 搜尋核心詞
2. 計算總字數
3. 核心詞出現次數 / 總字數 >= 3%
```

### H1/H2/H3 SEO 規範

```markdown
## H1 標籤（全站唯一）
- 位置：遊戲嵌入區標題
- 格式：[Game Name]: Play Online Free
- 必須包含：遊戲名稱 + play + online/free
- 例子：Sprunki Rejoyed: Play Online Free

## H2 標籤（各區塊標題）
- 使用描述性標題
- 自然融入關鍵詞
- 例子：
  ✅ "How to Play [Game Name]"
  ✅ "[Game Name] Tips and Strategies"
  ❌ "Tips" (太簡短)
  ❌ "Amazing Features" (營銷語言)

## H3 標籤（子標題）
- 可以更具體
- 例子：
  ✅ "Step 1: Select Your Character"
  ✅ "What devices support [Game Name]?"
```

## 樣式系統規範

### Tailwind CSS 語義化類名

```typescript
// ✅ 推薦用法
<div className="bg-background text-foreground">
  <h2 className="text-primary">Title</h2>
  <p className="text-muted-foreground">Description</p>
  <div className="border-border bg-card">Card</div>
</div>

// ❌ 禁止用法
<div className="bg-white text-black dark:bg-gray-900 dark:text-white">
<div style={{ backgroundColor: '#ffffff' }}>
```

### 標準化字號

```typescript
// 複製到你的專案中
const TYPOGRAPHY = {
  h1: "text-2xl sm:text-3xl lg:text-4xl font-bold",
  h2: "text-2xl sm:text-3xl font-bold",
  h3: "text-lg font-semibold",
  subtitle: "text-lg text-muted-foreground",
  body: "text-base text-muted-foreground",
  small: "text-sm text-muted-foreground",
}
```

### 間距標準

```typescript
// Section 間距
<section className="py-20 bg-background"> // 標準
<section className="py-16 bg-card/30">    // 緊湊
<section className="py-24 bg-background"> // 寬鬆

// 容器
<div className="container mx-auto px-4 sm:px-6 lg:px-8">

// 標題與內容間距
<h2 className="mb-4">Title</h2>       // H2 後
<h3 className="mb-2">Subtitle</h3>    // H3 後
<p className="mb-6">Paragraph</p>     // 段落後
```

### 卡片樣式標準

```typescript
// 標準卡片
<div className="bg-card/50 rounded-2xl p-8 border border-border/50
               hover:border-primary/30 transition-all duration-300">
  <h3 className="text-lg font-semibold mb-3">Title</h3>
  <p className="text-muted-foreground">Description</p>
</div>

// 圖片卡片
<div className="bg-card/50 rounded-2xl overflow-hidden border border-border/50
               hover:border-primary/30 transition-all duration-300">
  <div className="relative aspect-video">
    <Image src="..." fill className="object-cover" />
  </div>
  <div className="p-6">
    <h3>Title</h3>
    <p>Description</p>
  </div>
</div>
```

## 文件結構模板

```
your-game-project/
├── app/
│   ├── [locale]/(default)/
│   │   └── page.tsx              # 首頁入口
│   └── css/
│       └── theme.css             # 主題變數
├── components/
│   ├── page/home-page/
│   │   ├── game-embed.tsx        # 遊戲嵌入 ⭐
│   │   ├── introduction.tsx      # 遊戲介紹 ⭐
│   │   ├── how-to-play.tsx       # 玩法指南 ⭐
│   │   ├── tips.tsx              # 遊玩技巧
│   │   ├── gallery.tsx           # 媒體展示 ⭐
│   │   ├── features.tsx          # 遊戲特性 ⭐
│   │   ├── faq.tsx               # 常見問題 ⭐
│   │   └── cta.tsx               # 行動呼籲 ⭐
│   └── layout/
│       ├── header/               # 頁眉
│       └── footer/               # 頁腳
├── i18n/
│   ├── messages/
│   │   ├── en.json              # 英文翻譯 ⭐
│   │   └── zh.json              # 中文翻譯 ⭐
│   └── pages/landing/
│       ├── en.json              # 英文導航
│       └── zh.json              # 中文導航
├── public/
│   ├── games/                   # 遊戲截圖
│   ├── images/
│   └── logo.png
├── DEVELOPMENT.md               # 開發文檔 ⭐
└── package.json

⭐ = 必須修改的檔案
```

## 開發流程

### Phase 1: 需求分析（1-2小時）

```markdown
1. 填寫「快速開始檢查清單」
2. 收集遊戲素材（截圖、Logo、影片）
3. 確認關鍵詞和 SEO 目標
4. 確認目標語言（英文/中文/其他）
```

### Phase 2: 基礎搭建（2-3小時）

```markdown
1. 克隆本專案作為模板
2. 更新 package.json（專案名稱、描述）
3. 更新 .env.production（域名）
4. 替換 Logo 和 Favicon
5. 清空翻譯檔案，準備重寫
```

### Phase 3: 內容開發（4-6小時）

```markdown
1. 撰寫遊戲介紹（英文 + 中文）
2. 編寫玩法指南
3. 準備 FAQ（至少 8 個問題）
4. 撰寫遊戲特性
5. 收集遊戲截圖並上傳
6. 更新翻譯檔案
```

### Phase 4: 整合測試（2-3小時）

```markdown
1. 測試遊戲 iframe 嵌入
2. 測試響應式設計（手機/平板/桌面）
3. 測試語言切換
4. 測試亮色/暗色主題
5. 運行 `pnpm i18n:check`
6. SEO 檢查（關鍵詞密度、Meta 標籤）
```

### Phase 5: 優化上線（2-3小時）

```markdown
1. 壓縮圖片
2. 測試載入速度
3. 檢查所有連結
4. 運行 `pnpm build` 確保無錯誤
5. 部署到 Vercel/Netlify
6. Google Search Console 提交
```

**總計時間**: 11-17 小時（取決於內容複雜度）

## 常見錯誤與解決

### 錯誤 1: 內容過度營銷

```markdown
❌ 症狀：
- 使用 "amazing", "revolutionary", "best" 等詞
- 誇大用戶數量
- 虛構評論

✅ 解決：
- 回顧「內容真實性原則」
- 使用事實陳述
- 刪除所有主觀評價
```

### 錯誤 2: 硬編碼文本

```typescript
// ❌ 錯誤
<button>Play Now</button>

// ✅ 正確
const t = useTranslations('game')
<button>{t('play_now')}</button>
```

### 錯誤 3: 忘記 SEO 基礎

```markdown
常見遺漏：
- [ ] H1 標籤缺失或重複
- [ ] Meta Description 太短/太長
- [ ] 圖片缺少 alt 屬性
- [ ] 關鍵詞密度不足
- [ ] 內部連結缺失

快速檢查：
1. 每頁只能有一個 H1
2. H1 必須包含遊戲名稱
3. Meta Description 50-160 字元
4. 所有圖片都有描述性 alt
5. 核心詞出現 15-30 次（假設 1000 字內容）
```

### 錯誤 4: 響應式設計不完整

```markdown
必測場景：
- [ ] iPhone SE (375px)
- [ ] iPad (768px)
- [ ] Desktop (1920px)

常見問題：
- 遊戲 iframe 在手機上太小
- 按鈕在手機上難以點擊
- 圖片在大螢幕上變形
- 文字在小螢幕上換行不當

解決方案：
- 使用 Tailwind 響應式前綴 (sm:, md:, lg:)
- 測試所有斷點
- 使用相對單位 (%, rem)
```

### 錯誤 5: 翻譯不一致

```markdown
症狀：
- 英文有的內容中文沒有
- Key 結構不同
- 運行 pnpm i18n:check 報錯

解決：
1. 確保兩個語言檔案同時編輯
2. 使用相同的 JSON 結構
3. 定期運行驗證腳本
```

## 品質檢查清單

### 上線前必檢項目

```markdown
## 內容品質
- [ ] 無營銷語言/誇張宣傳
- [ ] 無編造內容（角色/評論/數據）
- [ ] 所有描述基於實際功能
- [ ] 截圖與實際遊戲一致
- [ ] FAQ 回答準確

## 國際化
- [ ] 無硬編碼文本
- [ ] 英文/中文翻譯完整
- [ ] 運行 pnpm i18n:check 通過
- [ ] 語言切換器正常工作
- [ ] 兩種語言內容對等

## SEO
- [ ] 每頁只有一個 H1
- [ ] H1 包含遊戲名稱和關鍵詞
- [ ] Meta Title 50-60 字元
- [ ] Meta Description 50-160 字元
- [ ] 關鍵詞密度 3%+
- [ ] 所有圖片有 alt 屬性
- [ ] sitemap.xml 正確生成

## 技術
- [ ] 遊戲 iframe 正常載入
- [ ] 全螢幕按鈕功能正常
- [ ] 分享功能正常
- [ ] 響應式設計完整（手機/平板/桌面）
- [ ] 亮色/暗色主題正常
- [ ] 無 TypeScript 錯誤
- [ ] pnpm build 成功
- [ ] 載入速度 < 3 秒

## 用戶體驗
- [ ] 遊戲區在首屏可見
- [ ] 導航清晰易懂
- [ ] 按鈕易於點擊
- [ ] 文字易讀（字號、行距）
- [ ] 無死連結
- [ ] 404 頁面友好
```

## 效能優化建議

```markdown
## 圖片優化
- 使用 WebP 格式
- 截圖壓縮到 < 200KB
- Logo/Icon 使用 SVG
- 使用 Next.js Image 組件

## 程式碼優化
- 使用動態導入 (dynamic import)
- 適當使用 React.memo
- 避免不必要的 re-render
- 使用 loading 屬性

## 載入優化
- 遊戲 iframe 使用 loading="eager"
- 其他圖片使用 loading="lazy"
- 預載入關鍵資源
- 最小化 CSS/JS

## 監控
- Google Analytics
- PageSpeed Insights
- Lighthouse 分數 > 90
```

## 維護與更新

### 定期維護任務

```markdown
## 每週
- [ ] 檢查遊戲 iframe 是否正常
- [ ] 檢查無效連結
- [ ] 回覆玩家問題（如果有反饋機制）

## 每月
- [ ] 更新遊戲截圖（如果遊戲有更新）
- [ ] 檢查 SEO 排名
- [ ] 分析用戶行為（Google Analytics）
- [ ] 更新 FAQ（根據玩家反饋）

## 每季度
- [ ] 更新 Next.js 和依賴套件
- [ ] 安全性檢查
- [ ] 效能測試
- [ ] 競品分析
```

### 內容更新流程

```markdown
1. 確認更新需求（遊戲新版本/新功能）
2. 準備新素材（截圖/影片）
3. 更新翻譯檔案（英文 + 中文）
4. 運行 pnpm i18n:check
5. 本地測試
6. 部署到生產環境
7. 提交 sitemap 到 Google
```

## 參考案例

### 好的範例（本專案）
- ✅ Sprunki Rejoyed (play.sprunkirejoyed.com)
  - 內容真實無誇張
  - 完整雙語支援
  - SEO 優化到位
  - 用戶體驗流暢

### 要避免的反模式

```markdown
❌ 反模式 1: 內容農場式 SEO
- 關鍵詞堆砌
- 低質量內容
- 誤導性標題

❌ 反模式 2: 過度設計
- 複雜動畫影響載入
- 花俏特效分散注意力
- 導航結構混亂

❌ 反模式 3: 忽視行動端
- 桌面優先設計
- 按鈕太小
- 文字不可讀

❌ 反模式 4: 虛假內容
- 編造評論
- 虛構數據
- 誇大功能
```

## 快速參考

### 最重要的 5 個原則

1. **內容真實** - 絕不編造
2. **面向玩家** - 快速開始遊戲
3. **完整國際化** - 無硬編碼
4. **SEO 友好** - 關鍵詞自然融入
5. **響應式設計** - 所有設備可用

### 最常用的命令

```bash
# 開發
pnpm dev

# 檢查
pnpm i18n:check
pnpm type-check

# 構建
pnpm build

# Git
git add .
git commit -m "feat: 描述"
git tag -a "v1.0.0" -m "說明"
```

### 最關鍵的檔案

```
必改：
- i18n/messages/en.json
- i18n/messages/zh.json
- components/page/home-page/game-embed.tsx
- app/[locale]/(default)/page.tsx

建議改：
- public/logo.png
- public/favicon.ico
- .env.production
- package.json
```

## 獲取幫助

### 遇到問題時

1. 查看 `DEVELOPMENT.md`（詳細開發文檔）
2. 查看 `CLAUDE.md`（專案規範）
3. 運行相關檢查命令
4. 查看錯誤訊息並搜尋解決方案
5. 查閱 Next.js 官方文檔

### 有用的資源

- Next.js 官方文檔: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- next-intl: https://next-intl-docs.vercel.app
- SEO 檢查工具: https://pagespeed.web.dev

---

**記住**: 這是一個為玩家服務的網站，不是營銷工具。
保持內容真實、簡潔、實用，玩家會用行動支持你。

**最後更新**: 2025-10-01
**模板版本**: 1.0.0
**基於專案**: Sprunki Rejoyed
