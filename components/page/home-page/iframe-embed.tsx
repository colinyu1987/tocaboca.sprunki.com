'use client'

import { useTranslations } from 'next-intl'
import { Maximize, RefreshCw, Share2 } from 'lucide-react'
import { useState } from 'react'

export default function IframeEmbed() {
  const t = useTranslations('home.iframeEmbed')
  const [iframeKey, setIframeKey] = useState(0)

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1)
  }

  const handleFullscreen = () => {
    const iframe = document.querySelector('iframe')
    if (iframe?.requestFullscreen) {
      iframe.requestFullscreen()
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sprunki Rejoyed',
          text: 'Play Sprunki Rejoyed online free!',
          url: window.location.href
        })
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <section id="play-game" className="w-full pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            <span className="text-primary">Sprunki Rejoyed</span>
            <span className="text-foreground">{t('title_suffix')}</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <iframe
              key={iframeKey}
              src="https://iframegame.com/embed/sprunki-rejoyed/index.html"
              title="Sprunki Rejoyed Game"
              className="w-full border-0 rounded-lg sm:rounded-xl shadow-2xl bg-card"
              style={{
                height: "700px",
                minHeight: "500px",
                aspectRatio: "16/9"
              }}
              loading="eager"
              allowFullScreen
              allow="autoplay; fullscreen; gamepad; microphone"
            />
            <div className="absolute inset-0 rounded-lg sm:rounded-xl ring-1 ring-border pointer-events-none"></div>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <button
              onClick={handleFullscreen}
              className="flex items-center gap-2 px-4 py-2 bg-card/50 hover:bg-card border border-border/50 hover:border-primary/30 rounded-lg transition-all duration-200"
              aria-label="Fullscreen"
            >
              <Maximize className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{t('buttons.fullscreen')}</span>
            </button>

            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-card/50 hover:bg-card border border-border/50 hover:border-primary/30 rounded-lg transition-all duration-200"
              aria-label="Refresh game"
            >
              <RefreshCw className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{t('buttons.refresh')}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-card/50 hover:bg-card border border-border/50 hover:border-primary/30 rounded-lg transition-all duration-200"
              aria-label="Share game"
            >
              <Share2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{t('buttons.share')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}