'use client'

import { useTranslations } from 'next-intl'
import { Facebook, Twitter, Linkedin, MessageCircle, Link2, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useState, useEffect } from 'react'

interface SocialShareProps {
  url?: string
  title?: string
  description?: string
  hashtags?: string[]
  variant?: 'default' | 'floating' | 'inline'
  showLabel?: boolean
}

export default function SocialShare({
  url,
  title,
  description,
  hashtags = ['TocaBoca', 'TocaBocaMod', 'TocaLifeWorld'],
  variant = 'default',
  showLabel = true
}: SocialShareProps) {
  const t = useTranslations('common.social')
  const [isSharing, setIsSharing] = useState(false)
  const [canShare, setCanShare] = useState(false)

  // 检测是否支持 Web Share API (仅在客户端)
  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && !!navigator.share)
  }, [])

  // 使用当前页面URL或传入的URL
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareTitle = title || t('defaultTitle')
  const shareDescription = description || t('defaultDescription')
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(shareTitle)
  const encodedDescription = encodeURIComponent(shareDescription)
  const hashtagString = hashtags.join(',')

  // 分享链接配置
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${hashtagString}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  }

  // 打开分享窗口
  const openShareWindow = (url: string, platform: string) => {
    const width = 600
    const height = 400
    const left = (window.innerWidth - width) / 2
    const top = (window.innerHeight - height) / 2

    // 添加 noopener 和 noreferrer 提高安全性和隐私保护
    const shareWindow = window.open(
      url,
      `share-${platform}`,
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,noopener,noreferrer`
    )

    // 手动设置 opener 为 null（额外的安全措施）
    if (shareWindow) {
      shareWindow.opener = null
    }

    // 使用简单的字符串拼接而不是插值
    toast.success(`${t('shareLabel')} ${platform}!`)
  }

  // 复制链接
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success(t('linkCopied'))
    } catch (err) {
      toast.error(t('copyFailed'))
    }
  }

  // Web Share API (原生分享)
  const nativeShare = async () => {
    if (navigator.share) {
      setIsSharing(true)
      try {
        await navigator.share({
          title: shareTitle,
          text: shareDescription,
          url: shareUrl,
        })
        toast.success(t('share') + '!')
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          toast.error(t('shareFailed'))
        }
      } finally {
        setIsSharing(false)
      }
    }
  }

  // 样式配置
  const containerStyles = {
    default: 'flex items-center justify-center gap-2 sm:gap-3 py-6 overflow-x-auto',
    floating: 'fixed right-6 bottom-24 z-40 flex flex-col gap-3 bg-background/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-border',
    inline: 'flex items-center gap-2 overflow-x-auto'
  }

  const buttonStyles = {
    default: 'h-12 w-12',
    floating: 'h-11 w-11',
    inline: 'h-9 w-9'
  }

  const iconStyles = {
    default: 'h-5 w-5',
    floating: 'h-4.5 w-4.5',
    inline: 'h-4 w-4'
  }

  return (
    <div className={variant === 'floating' ? containerStyles[variant] : 'py-6'}>
      {showLabel && variant !== 'floating' && (
        <div className="text-center mb-4">
          <span className="text-sm font-medium text-muted-foreground">
            {t('shareLabel')}
          </span>
        </div>
      )}

      <div className={variant === 'floating' ? '' : 'flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto'}>
      {/* Facebook */}
      <Button
        variant="outline"
        size="icon"
        className={buttonStyles[variant]}
        onClick={() => openShareWindow(shareLinks.facebook, 'Facebook')}
        aria-label={`${t('shareLabel')} Facebook`}
        title={`${t('shareLabel')} Facebook`}
      >
        <Facebook className={iconStyles[variant]} style={{ color: '#1877F2' }} />
      </Button>

      {/* Twitter/X */}
      <Button
        variant="outline"
        size="icon"
        className={buttonStyles[variant]}
        onClick={() => openShareWindow(shareLinks.twitter, 'Twitter')}
        aria-label={`${t('shareLabel')} Twitter`}
        title={`${t('shareLabel')} Twitter`}
      >
        <Twitter className={iconStyles[variant]} style={{ color: '#1DA1F2' }} />
      </Button>

      {/* LinkedIn */}
      <Button
        variant="outline"
        size="icon"
        className={buttonStyles[variant]}
        onClick={() => openShareWindow(shareLinks.linkedin, 'LinkedIn')}
        aria-label={`${t('shareLabel')} LinkedIn`}
        title={`${t('shareLabel')} LinkedIn`}
      >
        <Linkedin className={iconStyles[variant]} style={{ color: '#0A66C2' }} />
      </Button>

      {/* WhatsApp */}
      <Button
        variant="outline"
        size="icon"
        className={buttonStyles[variant]}
        onClick={() => openShareWindow(shareLinks.whatsapp, 'WhatsApp')}
        aria-label={`${t('shareLabel')} WhatsApp`}
        title={`${t('shareLabel')} WhatsApp`}
      >
        <MessageCircle className={iconStyles[variant]} style={{ color: '#25D366' }} />
      </Button>

      {/* 复制链接 */}
      <Button
        variant="outline"
        size="icon"
        className={buttonStyles[variant]}
        onClick={copyLink}
        aria-label={t('copyLink')}
        title={t('copyLink')}
      >
        <Link2 className={iconStyles[variant]} />
      </Button>

      {/* 原生分享 (仅移动端) */}
      {canShare && (
        <Button
          variant="outline"
          size="icon"
          className={buttonStyles[variant]}
          onClick={nativeShare}
          disabled={isSharing}
          aria-label={t('share')}
          title={t('share')}
        >
          <Share2 className={iconStyles[variant]} />
        </Button>
      )}
      </div>
    </div>
  )
}
