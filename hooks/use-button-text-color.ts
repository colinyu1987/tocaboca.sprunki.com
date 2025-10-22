'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function useButtonTextColor() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'
  
  // 返回适合鲜艳背景的文字颜色
  return mounted ? (isDark ? '#000000' : 'white') : 'white'
}

