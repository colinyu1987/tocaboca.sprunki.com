'use client'

import { useTranslations } from 'next-intl'
import { Download, Check, Shield, Unlock, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import SocialShare from '@/components/widget/social-share'
import { useButtonTextColor } from '@/hooks/use-button-text-color'

export default function Hero() {
  const t = useTranslations('home.hero')
  const buttonTextColor = useButtonTextColor()

  const DOWNLOAD_URL = 'https://download.gosuperfunny.com/toca.apk'

  return (
    <section id="download" className="relative py-20 overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      {/* 装饰元素 */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full blur-3xl opacity-20" style={{ backgroundColor: 'var(--toca-cyan)' }}></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ backgroundColor: 'var(--toca-yellow)' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32">
              <Image
                src="/tocalifelogo.jpg"
                alt="Toca Life World Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* 主标题 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-primary">
            {t('title')}
          </h1>

          <p className="text-base sm:text-xl lg:text-2xl mb-4 sm:mb-6" style={{ color: 'var(--foreground)' }}>
            {t('subtitle')}
          </p>

          {/* 版本信息 */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/50">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                {t('version')}
              </span>
            </div>
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/50">
              <span className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--toca-cyan)' }}>
                {t('latestVersion')}
              </span>
            </div>
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/50">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                {t('updated')}
              </span>
            </div>
          </div>

          {/* 核心特性 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-3 sm:p-4 bg-card/60 backdrop-blur-sm border border-border/50" style={{ borderRadius: 'var(--radius-xl)' }}>
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2"
                style={{
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--primary)'
                }}
              >
                <Unlock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-center" style={{ color: 'var(--foreground)' }}>
                {t('features.unlocked')}
              </span>
            </div>

            <div className="flex flex-col items-center p-3 sm:p-4 bg-card/60 backdrop-blur-sm border border-border/50" style={{ borderRadius: 'var(--radius-xl)' }}>
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2"
                style={{
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--toca-yellow)'
                }}
              >
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-center" style={{ color: 'var(--foreground)' }}>
                {t('features.money')}
              </span>
            </div>

            <div className="flex flex-col items-center p-3 sm:p-4 bg-card/60 backdrop-blur-sm border border-border/50" style={{ borderRadius: 'var(--radius-xl)' }}>
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2"
                style={{
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--toca-cyan)'
                }}
              >
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-center" style={{ color: 'var(--foreground)' }}>
                {t('features.ads')}
              </span>
            </div>

            <div className="flex flex-col items-center p-3 sm:p-4 bg-card/60 backdrop-blur-sm border border-border/50" style={{ borderRadius: 'var(--radius-xl)' }}>
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2"
                style={{
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--toca-purple)'
                }}
              >
                <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-center" style={{ color: 'var(--foreground)' }}>
                {t('features.free')}
              </span>
            </div>
          </div>

          {/* 大下载按钮 */}
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <a href={DOWNLOAD_URL} rel="nofollow" download>
              <Button
                size="lg"
                className="text-base sm:text-lg lg:text-xl px-8 sm:px-12 py-6 sm:py-8 font-bold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl"
                style={{
                  backgroundColor: 'var(--toca-cyan)',
                  color: buttonTextColor,
                  borderRadius: 'var(--radius-full)'
                }}
              >
                <Download className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 mr-2 sm:mr-3 flex-shrink-0" />
                {t('downloadButton')}
              </Button>
            </a>

            <p className="text-xs sm:text-sm" style={{ color: 'var(--foreground-muted)' }}>
              {t('downloadCount')}
            </p>

            {/* 社交分享按钮 */}
            <div className="mt-6">
              <SocialShare
                variant="default"
                showLabel={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
