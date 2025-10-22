'use client'

import { useTranslations } from 'next-intl'
import { Link } from "@/i18n/routing"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useButtonTextColor } from '@/hooks/use-button-text-color'

export default function CTA() {
  const t = useTranslations('home.cta')
  const buttonTextColor = useButtonTextColor()

  return (
    <section id="cta" className="relative py-20 overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Content Card */}
          <div
            className="relative bg-card border border-border/50 p-6 sm:p-10 lg:p-12"
            style={{ borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-lg)' }}
          >
            {/* Logo */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
                <Image
                  src="/tocalifelogo.jpg"
                  alt="Toca Boca Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-center leading-tight" style={{ color: 'var(--toca-cyan)' }}>
              {t('title')}
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 text-center max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
              {t('description')}
            </p>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link href={{ pathname: "/", hash: "download" }}>
                <Button
                  size="lg"
                  className="font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm sm:text-base lg:text-lg px-8 sm:px-10 py-5 sm:py-6 shadow-lg"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: buttonTextColor,
                    borderRadius: 'var(--radius-full)'
                  }}
                  aria-label="Download Toca Boca Mod APK now"
                >
                  {t('primaryButton')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
