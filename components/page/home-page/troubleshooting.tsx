'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Troubleshooting() {
  const t = useTranslations('home.troubleshooting')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const issues = Array.from({ length: 6 }, (_, i) => ({
    problem: t(`issue${i + 1}.problem`),
    solution: t(`issue${i + 1}.solution`),
  }))

  const toggleIssue = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14 lg:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--toca-purple)' }}>
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto text-foreground">
            {t('subtitle')}
          </p>
        </div>

        {/* Issues List */}
        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          {issues.map((issue, index) => (
            <div
              key={index}
              className="bg-card overflow-hidden border border-border/50"
              style={{
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              {/* Problem (Clickable Header) */}
              <button
                className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between hover:bg-muted/30 transition-colors"
                onClick={() => toggleIssue(index)}
                aria-expanded={openIndex === index}
                aria-controls={`solution-${index}`}
                id={`problem-${index}`}
              >
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold pr-3 sm:pr-4 text-card-foreground">
                  {issue.problem}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
                )}
              </button>

              {/* Solution (Expandable Content) */}
              {openIndex === index && (
                <div
                  id={`solution-${index}`}
                  className="px-4 sm:px-6 pb-4 sm:pb-5 border-t border-border"
                  aria-labelledby={`problem-${index}`}
                >
                  <div className="pt-3 sm:pt-4">
                    <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line text-muted-foreground">
                      {issue.solution}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Help */}
        <div className="mt-10 sm:mt-12 text-center">
          <div className="inline-block bg-card/80 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 max-w-3xl border border-border/50" style={{ borderRadius: 'var(--radius-xl)' }}>
            <p className="text-sm sm:text-base text-card-foreground">
              {t('bottomNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
