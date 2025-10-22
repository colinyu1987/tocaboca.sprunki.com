'use client'

import { Button } from "@/components/ui/button"
import { Video, Users, Briefcase, Camera, Play, GraduationCap } from "lucide-react"
import { useTranslations } from 'next-intl'
import { Link } from "@/i18n/routing"
import { useButtonTextColor } from '@/hooks/use-button-text-color'

const useCaseIcons = {
  socialMedia: Video,
  business: Briefcase,
  creators: Camera,
  teams: Users,
  personal: Play,
  education: GraduationCap,
}

const useCaseColors = ['toca-cyan', 'toca-cyan', 'toca-orange', 'toca-yellow', 'toca-purple', 'toca-blue'] as const

export default function UseCases() {
  const t = useTranslations('home.useCases')
  const buttonTextColor = useButtonTextColor()

  const useCases = ['socialMedia', 'business', 'creators', 'teams', 'personal', 'education'].map((key, index) => ({
    icon: useCaseIcons[key as keyof typeof useCaseIcons],
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    keywords: t(`${key}.keywords`),
    color: useCaseColors[index],
  }))

  return (
    <section id="use-cases" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - SEO Optimized */}
        <div className="text-center mb-12 sm:mb-14 lg:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--toca-purple)' }}>
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto" style={{ color: 'var(--foreground)' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {useCases.slice(0, 6).map((useCase, index) => (
            <div
              key={index}
              className="group bg-card border border-border/50 p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:-translate-y-2"
              style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)' }}
            >
              {/* Icon */}
              <div className="mb-4 sm:mb-5 lg:mb-6">
                <div
                  className="inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: `var(--${useCase.color})`
                  }}
                >
                  <useCase.icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" style={{ color: buttonTextColor }} />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3" style={{ color: 'var(--foreground)' }}>{useCase.title}</h3>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>{useCase.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 sm:mt-12">
          <p className="text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 text-muted-foreground">{t('ctaDescription')}</p>
          <Link href={{ pathname: "/", hash: "download" }}>
            <Button
              className="font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm sm:text-base lg:text-lg px-8 sm:px-10 py-5 sm:py-6 shadow-lg"
              style={{
                backgroundColor: 'var(--toca-cyan)',
                color: buttonTextColor,
                borderRadius: 'var(--radius-full)'
              }}
            >
              {t('ctaButton')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}