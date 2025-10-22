'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { BookOpen, Gamepad2, Download, Globe, HelpCircle, Shield } from 'lucide-react'

const guideIcons = {
  whatIs: BookOpen,
  about: Globe,
  download: Download,
  install: Shield,
  play: Gamepad2,
  troubleshoot: HelpCircle,
}

const guideColors = ['toca-cyan', 'toca-cyan', 'toca-yellow', 'toca-orange', 'toca-purple', 'toca-blue'] as const

export default function Guides() {
  const t = useTranslations('home.guides')

  const guides = [
    { key: 'whatIs', icon: guideIcons.whatIs, url: '/#what-is-mod', color: guideColors[0] },
    { key: 'about', icon: guideIcons.about, url: '/#about-game', color: guideColors[1] },
    { key: 'download', icon: guideIcons.download, url: '/#download-guide', color: guideColors[2] },
    { key: 'install', icon: guideIcons.install, url: '/#install-guide', color: guideColors[3] },
    { key: 'play', icon: guideIcons.play, url: '/#how-to-play', color: guideColors[4] },
    { key: 'troubleshoot', icon: guideIcons.troubleshoot, url: '/#troubleshooting', color: guideColors[5] },
  ]

  return (
    <section className="py-20 bg-background">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {guides.map((guide) => {
              const Icon = guide.icon
              return (
                <Link key={guide.key} href={guide.url as any}>
                  <article className="group bg-card border border-border/50 p-4 sm:p-5 lg:p-6 cursor-pointer h-full transition-all duration-300 hover:-translate-y-2" style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)' }}>
                    <div className="flex flex-col h-full">
                      <div className="mb-3 sm:mb-4">
                        <div
                          className="inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                          style={{
                            width: '2.75rem',
                            height: '2.75rem',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: `var(--${guide.color})`
                          }}
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1.5 sm:mb-2" style={{ color: 'var(--foreground)' }}>
                        {t(`${guide.key}.title`)}
                      </h3>

                      <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-3 sm:mb-4 flex-grow" style={{ color: 'var(--foreground-muted)' }}>
                        {t(`${guide.key}.excerpt`)}
                      </p>

                      <div className="flex items-center text-xs sm:text-sm font-medium group-hover:gap-2 transition-all" style={{ color: `var(--${guide.color})` }}>
                        <span>{t('readMore')}</span>
                        <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
