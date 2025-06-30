"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";
import "./globals.css";
import Providers from "./providers";
// import Providers from "./providers";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body>
        <AntdRegistry>
            <Providers>
              {children}
              {modal}
            </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
