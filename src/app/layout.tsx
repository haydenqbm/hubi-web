import type { Metadata } from "next"
import { Be_Vietnam_Pro } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

const beVietnamPro = Be_Vietnam_Pro({ subsets: ["vietnamese"], weight: ["400", "500", "600", "700"], variable: "--font-be-vietnam-pro", display: "swap" })

export const metadata: Metadata = { title: "Hubi Việt Nam", description: "Khám phá trải nghiệm thể thao dưới nước cùng Hubi Việt Nam." }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body className={`${beVietnamPro.variable} font-[family-name:var(--font-be-vietnam-pro)]`}><SiteHeader /><main>{children}</main><SiteFooter /></body></html>
}
