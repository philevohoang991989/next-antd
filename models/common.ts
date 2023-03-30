import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { EmotionCache } from '@emotion/react'

export interface LayoutProps {
  children: ReactNode
}
export interface ItemMenu {
  label: string
  path: string
}
export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  emotionCache: EmotionCache
}
export type MenuListType = {
  key: string
  href: string
  linkText: string
  icon: JSX.Element
  isShow?: boolean
}
