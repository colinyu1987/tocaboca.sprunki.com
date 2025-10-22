'use client'

import { useTranslations } from 'next-intl'
import { Check } from 'lucide-react'
import { useButtonTextColor } from '@/hooks/use-button-text-color'

export default function Comparison() {
  const t = useTranslations('home.comparison')
  const buttonTextColor = useButtonTextColor()

  const features = Array.from({ length: 8 }, (_, i) => ({
    feature: t(`features.${i}.feature`),
    mod: t(`features.${i}.mod`),
    original: t(`features.${i}.original`),
  }))

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--toca-cyan)' }}>
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto" style={{ color: 'var(--foreground)' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto">
          {/* Mobile: Scroll indicator */}
          <div className="md:hidden text-center mb-4">
            <p className="text-sm text-muted-foreground">
              {t('swipeHint')}
            </p>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="min-w-[600px]">
              {/* Table Header */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
                <div className="text-center font-semibold text-sm sm:text-lg text-muted-foreground">
                  {t('featureLabel')}
                </div>
                <div className="text-center">
                  <div className="inline-block px-3 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-lg shadow-lg" style={{ backgroundColor: 'var(--toca-cyan)', color: buttonTextColor }}>
                    {t('modVersion')}
                  </div>
                </div>
                <div className="text-center">
                  <div className="inline-block px-3 sm:px-6 py-2 sm:py-3 bg-muted text-muted-foreground rounded-full font-bold text-sm sm:text-lg">
                    {t('original')}
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="space-y-3">
                {features.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-2 sm:gap-4 items-center bg-card border border-border rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
                  >
                    {/* Feature Name */}
                    <div className="font-medium text-xs sm:text-base text-card-foreground">
                      {item.feature}
                    </div>

                    {/* Mod Version */}
                    <div className="text-center">
                      <span className="inline-flex items-center justify-center px-2 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm" style={{ backgroundColor: 'rgba(6, 214, 160, 0.1)', color: 'var(--toca-cyan)' }}>
                        {item.mod.includes('Yes') || item.mod.includes('100%') || item.mod.includes('All') || item.mod.includes('No Ads') ? (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0" />
                        ) : null}
                        <span className="break-words">{item.mod}</span>
                      </span>
                    </div>

                    {/* Original Version */}
                    <div className="text-center">
                      <span className="inline-block px-2 sm:px-4 py-1 sm:py-2 bg-muted text-muted-foreground rounded-lg font-medium text-xs sm:text-sm break-words">
                        {item.original}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 sm:mt-12">
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-3 sm:mb-4">
            {t('bottomNote')}
          </p>
          <a
            href="https://download.gosuperfunny.com/toca.apk"
            rel="nofollow"
            download
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base lg:text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            style={{ backgroundColor: 'var(--toca-cyan)', color: buttonTextColor }}
          >
            {t('downloadButton')}
          </a>
        </div>
      </div>
    </section>
  )
}
