'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function Gallery() {
  const t = useTranslations('home.screenshots')

  const screenshots = t.raw('images') as Array<{title: string; description: string; image: string}>

  return (
    <section id="screenshots" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-14 lg:mb-16">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--toca-orange)' }}>
              {t('title')}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto" style={{ color: 'var(--foreground)' }}>
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Screenshots */}
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="group bg-card border border-border/50 overflow-hidden transition-all duration-300 hover:-translate-y-2"
                style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)' }}
              >
                <div className="relative aspect-video bg-muted/30">
                  <Image
                    src={screenshot.image}
                    alt={screenshot.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4 sm:p-5 lg:p-6">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1.5 sm:mb-2" style={{ color: 'var(--foreground)' }}>
                    {screenshot.title}
                  </h3>
                  <p className="text-base sm:text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
                    {screenshot.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
