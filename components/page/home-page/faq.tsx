"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useTranslations } from 'next-intl'

export default function FAQ() {
  const t = useTranslations('home.faq')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Generate faqs array from translations
  const faqs = Array.from({ length: 10 }, (_, i) => ({
    question: t(`q${i + 1}.question`),
    answer: t(`q${i + 1}.answer`),
  }))

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      className="py-20 bg-muted/50"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-14 lg:mb-16">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-primary">
              {t('title')}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-foreground">
              {t('subtitle')}
            </p>
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <article
                key={index}
                className="mb-3 sm:mb-4 bg-card overflow-hidden border border-border/50"
                style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)' }}
                itemScope
                itemType="https://schema.org/Question"
                itemProp="mainEntity"
              >
                <button
                  className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 text-left flex items-center justify-between transition-colors duration-200 hover:bg-muted/30"
                  style={{ backgroundColor: openIndex === index ? 'var(--muted)' : 'transparent' }}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <h3
                    className="text-sm sm:text-base lg:text-lg font-semibold pr-3 sm:pr-4 text-card-foreground"
                    itemProp="name"
                  >
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-primary" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-primary" aria-hidden="true" />
                  )}
                </button>

                {/* SEO Improvement: Always render content but hide visually when collapsed */}
                <div
                  id={`faq-answer-${index}`}
                  className={openIndex === index ? 'px-4 sm:px-6 lg:px-8 pb-4 sm:pb-5 lg:pb-6' : 'absolute -left-[10000px] opacity-0 pointer-events-none'}
                  aria-labelledby={`faq-question-${index}`}
                  itemScope
                  itemType="https://schema.org/Answer"
                  itemProp="acceptedAnswer"
                >
                  <div itemProp="text">
                    <p className="text-base sm:text-lg lg:text-xl leading-relaxed whitespace-pre-line text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
  )
}
