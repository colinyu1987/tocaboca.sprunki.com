'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useButtonTextColor } from '@/hooks/use-button-text-color'

export default function Variants() {
  const t = useTranslations('home.modVersions')
  const buttonTextColor = useButtonTextColor()

  const DOWNLOAD_URL = 'https://download.gosuperfunny.com/toca.apk'

  const variants = [
    {
      key: 'lifeWorld',
      image: '/tocabocaworld.jpg',
      color: 'toca-cyan',
      featured: true
    },
    {
      key: 'kitchen',
      image: '/tocagames/tocaboca-kitchen.png',
      color: 'toca-orange'
    },
    {
      key: 'kitchen2',
      image: '/tocagames/tocaboca-kitchen-2.webp',
      color: 'toca-orange'
    },
    {
      key: 'hairSalon',
      image: '/tocagames/tocaboca-hair-salon-4.png',
      color: 'toca-cyan'
    },
    {
      key: 'doctor',
      image: '/tocagames/tocaboca-pet-doctor.png',
      color: 'toca-blue'
    },
    {
      key: 'jr',
      image: '/tocagames/tocaboca-jr-logo.avif',
      color: 'toca-yellow'
    },
    {
      key: 'town',
      image: '/tocagames/tocaboca-town.png',
      color: 'toca-purple'
    },
    {
      key: 'city',
      image: '/tocagames/tocaboca-city.png',
      color: 'toca-cyan'
    },
    {
      key: 'hospital',
      image: '/tocagames/tocaboca-hospital.jpg',
      color: 'toca-blue'
    },
    {
      key: 'office',
      image: '/tocagames/tocaboca-office.png',
      color: 'toca-orange'
    },
    {
      key: 'pets',
      image: '/tocagames/tocaboca-pets.png',
      color: 'toca-purple'
    },
    {
      key: 'nature',
      image: '/tocagames/tocaboca-nature.png',
      color: 'toca-cyan'
    },
    {
      key: 'school',
      image: '/tocagames/tocaboca-chool.png',
      color: 'toca-yellow'
    },
    {
      key: 'boo',
      image: '/tocagames/tocaboca-boo.png',
      color: 'toca-purple'
    },
    {
      key: 'elements',
      image: '/tocagames/tocaboca-elements.jpg',
      color: 'toca-orange'
    },
    {
      key: 'labPlants',
      image: '/tocagames/tocabocalab-plants.png',
      color: 'toca-cyan'
    },
  ]

  return (
    <section id="mod-versions" className="pt-4 pb-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-primary">
              {t('title')}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg max-w-3xl mx-auto text-foreground">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {variants.map((variant) => (
              <div
                key={variant.key}
                className={`group bg-card overflow-hidden transition-all duration-300 hover:-translate-y-2 ${variant.featured ? 'col-span-2 md:col-span-3 lg:col-span-4' : ''}`}
                style={{
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <div className={`relative ${variant.featured ? 'aspect-[21/9]' : 'aspect-square'}`} style={{ backgroundColor: 'var(--muted)' }}>
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 px-2 py-1 md:px-3 md:py-1.5 bg-card/90 backdrop-blur-sm rounded-full z-10 border border-border/50">
                    <span className="font-semibold text-xs md:text-sm" style={{ color: 'var(--toca-cyan)' }}>
                      Latest
                    </span>
                  </div>
                  {variant.featured && (
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 px-3 py-1.5 md:px-4 md:py-2 bg-card/90 backdrop-blur-sm rounded-full z-10 border border-border/50">
                      <span className="font-bold text-sm md:text-base text-primary">
                        {t(`${variant.key}.badge`)}
                      </span>
                    </div>
                  )}
                  <Image
                    src={variant.image}
                    alt={t(`${variant.key}.title`)}
                    title={t(`${variant.key}.title`)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes={variant.featured ? '100vw' : '(max-width: 768px) 50vw, 25vw'}
                  />
                </div>
                <div className="p-3 md:p-4">
                  <h3
                    className="text-lg md:text-xl font-bold leading-tight mb-2"
                    style={{ color: `var(--${variant.color})` }}
                  >
                    {t(`${variant.key}.title`)}
                  </h3>
                  <p className="text-sm md:text-base leading-snug mb-3 text-muted-foreground">
                    {t(`${variant.key}.description`)}
                  </p>
                  <a href={DOWNLOAD_URL} rel="nofollow" download>
                    <Button
                        size="sm"
                        className="font-semibold w-full text-sm md:text-base h-9 md:h-10 transition-all duration-200 hover:scale-105"
                        style={{
                          backgroundColor: `var(--${variant.color})`,
                          color: buttonTextColor,
                          borderRadius: 'var(--radius-full)'
                        }}
                      >
                        <Download className="w-4 h-4 md:w-5 md:h-5 mr-1 flex-shrink-0" />
                        {t('downloadButton')}
                      </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
