'use client'

import { useTranslations } from 'next-intl'
import { Unlock, Ban, Coins } from 'lucide-react'

export default function Introduction() {
  const t = useTranslations('home.whatIsMod')

  const features = [
    {
      icon: Unlock,
      title: t('features.0.title'),
      text: t('features.0.description'),
      color: 'toca-cyan'
    },
    {
      icon: Ban,
      title: t('features.1.title'),
      text: t('features.1.description'),
      color: 'toca-cyan'
    },
    {
      icon: Coins,
      title: t('features.2.title'),
      text: t('features.2.description'),
      color: 'toca-yellow'
    }
  ]

  return (
    <section id="what-is-mod" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
              style={{ color: 'var(--toca-orange)' }}
            >
              {t('title')}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--foreground)' }}>
              {t('intro')}
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-3 mb-8 sm:mb-10">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-card border border-border/50 p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:-translate-y-2"
                  style={{
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center mb-3 sm:mb-4"
                    style={{
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: `var(--${feature.color})`
                    }}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3" style={{ color: 'var(--foreground)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-base sm:text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
                    {feature.text}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="bg-card/80 backdrop-blur-sm border border-border/50 p-4 sm:p-6 lg:p-8 text-center" style={{ borderRadius: 'var(--radius-xl)' }}>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--foreground)' }}>
              {t('difference')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
