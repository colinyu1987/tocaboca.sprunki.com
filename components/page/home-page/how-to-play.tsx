'use client'

import { useTranslations } from 'next-intl'

export default function HowToPlay() {
  const t = useTranslations('home.howToDownload')

  const steps = ['steps.0', 'steps.1', 'steps.2', 'steps.3'] as const

  return (
    <section id="download-guide" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-14 lg:mb-16">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--toca-purple)' }}>
              {t('title')}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl" style={{ color: 'var(--foreground)' }}>
              {t('subtitle')}
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {steps.map((step, index) => {
              const stepColors = [
                'toca-cyan',
                'toca-cyan',
                'toca-orange',
                'toca-purple',
                'toca-yellow'
              ]
              const stepColor = stepColors[index]

              return (
                <div
                  key={step}
                  className="flex gap-4 sm:gap-6 items-start p-4 sm:p-6 lg:p-8 bg-card border border-border/50 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  <div
                    className="flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-110"
                    style={{
                      width: '2.75rem',
                      height: '2.75rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: `var(--${stepColor})`
                    }}
                  >
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 pt-0.5 sm:pt-1">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1.5 sm:mb-2" style={{ color: 'var(--foreground)' }}>
                      {t(`${step}.title`)}
                    </h3>
                    <p className="text-base sm:text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
                      {t(`${step}.description`)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
