import { EmptyLayout } from "@/components/layout";
import { AppPropsWithLayout } from "@/models";
import "@/styles/globals.css";
import "antd/dist/reset.css";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
