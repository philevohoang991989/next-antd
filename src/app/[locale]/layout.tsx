import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import { ConfigProvider } from "antd";
import theme from "@/themes/themeConfig";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ConfigProvider theme={theme}>
            <AntdRegistry>{children}</AntdRegistry>
          </ConfigProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
