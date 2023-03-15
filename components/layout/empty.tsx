import { LayoutProps } from '@/models'
import Link from 'next/link'
import React from 'react'
import BgPage from '@/images/auth-background.png'

export function EmptyLayout({ children }: LayoutProps) {
  return (
    <div
    >
      {children}
    </div>
  )
}