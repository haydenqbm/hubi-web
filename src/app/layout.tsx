import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

const notoSans = localFont({ src: [{ path: "../../public/fonts/noto-sans-regular.ttf", weight: "400 600" }], variable: "--font-noto-sans", display: "swap" })
const notoSerif = localFont({ src: [{ path: "../../public/fonts/noto-serif-regular.ttf", weight: "500" }, { path: "../../public/fonts/noto-serif-bold.ttf", weight: "600" }], variable: "--font-noto-serif", display: "swap" })

export const metadata: Metadata = { metadataBase: new URL("https://hubi.vn"), title: { default: "Hubi Việt Nam", template: "%s | Hubi Việt Nam" }, description: "Khám phá trải nghiệm thể thao dưới nước cùng Hubi Việt Nam.", openGraph: { title: "Hubi Việt Nam", description: "Khám phá trải nghiệm thể thao dưới nước cùng Hubi Việt Nam.", type: "website", locale: "vi_VN" }, robots: { index: true, follow: true } }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" data-scroll-behavior="smooth"><body className={`${notoSans.variable} ${notoSerif.variable} font-[family-name:var(--font-noto-sans)]`}><SiteHeader /><main>{children}</main><SiteFooter /></body></html>
}
