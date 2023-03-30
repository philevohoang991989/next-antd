import axiosClient from '@/api-client/axios-client'
import { ConfigProvider } from 'antd'
import { EmptyLayout } from '@/components/layout'
import { AppPropsWithLayout } from '@/models'
import '@/styles/globals.css'
import { createEmotionCache } from '@/utils'
import { CacheProvider } from '@emotion/react'
import { Spin } from 'antd'
import 'antd/dist/reset.css'
import React, { useEffect, useState } from 'react'
import { SWRConfig } from 'swr'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout
  const [showChild, setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }
  if (typeof window === 'undefined') {
    return <Spin />
  } else {
    return (
      <CacheProvider value={emotionCache}>
        <SWRConfig
          value={{
            fetcher: (url) => axiosClient.get(url),
            shouldRetryOnError: false
          }}
        >
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#009fff'
              }
            }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ConfigProvider>
        </SWRConfig>
      </CacheProvider>
    )
  }
}
