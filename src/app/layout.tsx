import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { absoluteUrl, defaultOgImage, jsonLd, siteDescription, siteUrl } from "@/lib/seo"

const notoSans = localFont({ src: [{ path: "../../public/fonts/noto-sans-regular.ttf", weight: "400 600" }], variable: "--font-noto-sans", display: "swap" })
const notoSerif = localFont({ src: [{ path: "../../public/fonts/noto-serif-regular.ttf", weight: "500" }, { path: "../../public/fonts/noto-serif-bold.ttf", weight: "600" }], variable: "--font-noto-serif", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Hubi Việt Nam", template: "%s | Hubi Việt Nam" },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: { title: "Hubi Việt Nam", description: siteDescription, type: "website", locale: "vi_VN", url: siteUrl, images: [{ url: defaultOgImage, alt: "Trải nghiệm thể thao dưới nước cùng Hubi Việt Nam" }] },
  icons: { icon: "/favicon.ico" },
  robots: { index: true, follow: true },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hubi Việt Nam",
  url: siteUrl,
  logo: absoluteUrl("/images/brand/logo-mark.png"),
  sameAs: ["https://www.facebook.com/HUBIVIETNAM"],
}

const websiteJsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: "Hubi Việt Nam", url: siteUrl, inLanguage: "vi-VN" }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi" data-scroll-behavior="smooth"><body className={`${notoSans.variable} ${notoSerif.variable} font-[family-name:var(--font-noto-sans)]`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationJsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(websiteJsonLd) }} /><SiteHeader /><main>{children}</main><SiteFooter /><Analytics /><SpeedInsights /></body></html>
}
