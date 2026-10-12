import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "精选好用工具分享",
  description: "发现、收集并分享那些解决实际痛点的高效工具。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased bg-gray-50 text-gray-900 selection:bg-blue-100">{children}</body>
    </html>
  );
}