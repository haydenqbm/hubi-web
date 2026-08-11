import type { Metadata } from "next"
import { Be_Vietnam_Pro } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

const beVietnamPro = Be_Vietnam_Pro({ subsets: ["vietnamese"], weight: ["400", "500", "600", "700"], variable: "--font-be-vietnam-pro", display: "swap" })

export const metadata: Metadata = { metadataBase: new URL("https://hubi.vn"), title: { default: "Hubi Việt Nam", template: "%s | Hubi Việt Nam" }, description: "Khám phá trải nghiệm thể thao dưới nước cùng Hubi Việt Nam.", openGraph: { title: "Hubi Việt Nam", description: "Khám phá trải nghiệm thể thao dưới nước cùng Hubi Việt Nam.", type: "website", locale: "vi_VN" }, robots: { index: true, follow: true } }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body className={`${beVietnamPro.variable} font-[family-name:var(--font-be-vietnam-pro)]`}><SiteHeader /><main>{children}</main><SiteFooter /></body></html>
}
