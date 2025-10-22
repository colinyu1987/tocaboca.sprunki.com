'use client'

import { useTranslations } from 'next-intl'
import { Shield, Lock, Wifi, Smartphone, Baby, Info } from 'lucide-react'

export default function Safety() {
  const t = useTranslations('home.safety')

  const safetyPoints = [
    { key: 'safe1', icon: Shield, color: 'toca-cyan' },
    { key: 'safe2', icon: Lock, color: 'toca-orange' },
    { key: 'safe3', icon: Wifi, color: 'toca-yellow' },
    { key: 'safe4', icon: Smartphone, color: 'toca-purple' },
    { key: 'safe5', icon: Baby, color: 'toca-cyan' },
    { key: 'safe6', icon: Info, color: 'toca-blue' },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14 lg:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--toca-cyan)' }}>
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto" style={{ color: 'var(--foreground)' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* Safety Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {safetyPoints.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="bg-card border border-border/50 p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:-translate-y-2"
                style={{
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                {/* Icon */}
                <div className="mb-4 sm:mb-5 lg:mb-6">
                  <div
                    className="inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      width: '2.75rem',
                      height: '2.75rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: `var(--${item.color})`
                    }}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3" style={{ color: 'var(--foreground)' }}>
                  {t(`${item.key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
                  {t(`${item.key}.description`)}
                </p>
              </div>
            )
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-10 sm:mt-12 text-center">
          <div className="inline-block bg-card/80 backdrop-blur-sm border border-border/50 px-4 sm:px-6 py-3 sm:py-4 max-w-3xl" style={{ borderRadius: 'var(--radius-xl)' }}>
            <p className="text-sm sm:text-base" style={{ color: 'var(--foreground)' }}>
              <strong>{t('importantLabel')}</strong> {t('bottomNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
