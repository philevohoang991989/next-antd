import axiosClient from "@/api-client/axios-client";
import { EmptyLayout } from "@/components/layout";
import { CacheProvider } from "@emotion/react";
import { AppPropsWithLayout } from "@/models";
import "@/styles/globals.css";
import "antd/dist/reset.css";
import { SWRConfig } from "swr";
import { createEmotionCache } from "@/utils";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <CacheProvider value={emotionCache}>
      <SWRConfig
        value={{
          fetcher: (url) => axiosClient.get(url),
          shouldRetryOnError: false,
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </CacheProvider>
  );
}
