"use client"

import { useState } from "react"
import { Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function DemoGallery() {
  const [activeDemo, setActiveDemo] = useState(0)
  const t = useTranslations('home.demoGallery')
  
  const demos = [
    {
      id: 1,
      title: t('demos.textToCinematic.title'),
      description: t('demos.textToCinematic.description'),
      thumbnail: "/images/home/action-1.jpeg",
      category: t('demos.textToCinematic.category'),
      url: "/text-to-video",
    },
    {
      id: 2,
      title: t('demos.imageAnimation.title'),
      description: t('demos.imageAnimation.description'),
      thumbnail: "/images/home/action-2.jpeg",
      category: t('demos.imageAnimation.category'),
      url: "/video-reframe",
    },
    {
      id: 3,
      title: t('demos.styleTransfer.title'),
      description: t('demos.styleTransfer.description'),
      thumbnail: "/images/home/action-3.jpeg",
      category: t('demos.styleTransfer.category'),
      url: "/wav2lip",
    },
  ]

  return (
    <section id="demos" className="py-20 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t('title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Demo Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {demos.map((demo, index) => (
            <Link href={demo.url as any} key={demo.id}>
              <div
                className={`group cursor-pointer transition-all duration-300 ${
                  activeDemo === index ? "scale-105" : "hover:scale-102"
                }`}
                onClick={() => setActiveDemo(index)}
              >
                <div className="relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30">
                  {/* Thumbnail */}
                  <div className="relative aspect-video">
                    <Image
                      src={demo.thumbnail || "/placeholder.svg"}
                      alt={demo.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Generate Video Button Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        size="lg" 
                        className="bg-primary/90 hover:bg-primary text-primary-foreground font-semibold px-6 py-3 backdrop-blur-sm"
                      >
                        {t('generateVideoButton')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary/80 backdrop-blur-sm rounded-full text-primary-foreground text-sm font-medium">
                      {demo.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{demo.title}</h3>
                    <p className="text-muted-foreground text-sm">{demo.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href={{ pathname: "/", hash: "features" }}>
            <Button
              size="lg"
              className="btn-primary-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              {t('tryInteractiveDemo')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
