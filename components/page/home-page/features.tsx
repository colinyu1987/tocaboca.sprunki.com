'use client'

import { MapPin, Users, Sparkles, Shield } from "lucide-react"
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const featureIcons = [MapPin, Users, Sparkles, Shield]
const featureColors = ['toca-cyan', 'toca-orange', 'toca-cyan', 'toca-yellow'] as const
const featureImages = [
  '/images/home/tocaboca-unblocked-all-locations.webp',
  '/images/home/tocaboca-unbloced-all-charaters.jpg',
  '/images/home/tocaboca-free-furnitures.jpg',
  '/images/home/tocaboca-unblocked-all-elements.jpg'
]

export default function Features() {
  const t = useTranslations('home.gameFeatures')

  const features = ['feature1', 'feature2', 'feature3', 'feature4'].map((key, index) => ({
    icon: featureIcons[index],
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    keywords: t(`${key}.keywords`),
    color: featureColors[index],
    image: featureImages[index],
  }))

  return (
    <section id="game-features" className="py-20 bg-muted/30" aria-labelledby="features-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with proper heading hierarchy */}
        <header className="text-center mb-12 sm:mb-14 lg:mb-16">
          <h2 id="features-heading" className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-primary">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto" style={{ color: 'var(--foreground)' }}>
            {t('subtitle')}
          </p>
        </header>

        {/* Features Grid with structured data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" itemScope itemType="https://schema.org/ItemList">
          {features.map((feature, index) => (
            <article
              key={index}
              className="group bg-card border border-border/50 overflow-hidden transition-all duration-300 hover:-translate-y-2"
              style={{
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-md)'
              }}
              itemScope
              itemType="https://schema.org/SoftwareFeature"
              itemProp="itemListElement"
            >
              {/* Feature Image */}
              <div className="relative w-full aspect-video bg-muted">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  title={feature.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="p-4 sm:p-6 lg:p-8">
                {/* Feature Icon */}
                <div className="mb-4 sm:mb-5 lg:mb-6">
                  <div
                    className="inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      width: '2.75rem',
                      height: '2.75rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: `var(--${feature.color})`
                    }}
                  >
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                </div>

                {/* Feature Content with semantic markup */}
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3" style={{ color: 'var(--foreground)' }} itemProp="name">
                    {feature.title}
                  </h3>
                  <p className="text-base sm:text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--foreground-muted)' }} itemProp="description">
                    {feature.description}
                  </p>
                  <meta itemProp="keywords" content={feature.keywords} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}