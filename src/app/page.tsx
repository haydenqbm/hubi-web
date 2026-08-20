import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { absoluteUrl, defaultOgImage, siteDescription } from "@/lib/seo"

export const metadata: Metadata = { title: "Hubi Việt Nam", description: siteDescription, alternates: { canonical: "/" }, openGraph: { title: "Hubi Việt Nam", description: siteDescription, url: absoluteUrl("/"), images: [{ url: defaultOgImage, alt: "Trải nghiệm thể thao dưới nước cùng Hubi Việt Nam" }] } }

export default function HomePage() {
  return <main className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-hubi-deep-water text-hubi-cream"><Image src="/images/hero/products-desktop.png" alt="Trải nghiệm thể thao dưới nước cùng Hubi Việt Nam" fill priority sizes="100vw" className="object-cover object-bottom" /><div className="absolute inset-0 bg-black/45" /><div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-end px-6 pb-16 md:px-10 md:pb-24"><div className="max-w-2xl"><p className="text-xs uppercase tracking-[.2em] text-hubi-blue-grey">Hubi Việt Nam</p><h1 className="mt-4 max-w-xl font-serif text-5xl font-medium leading-[.94] tracking-[-.04em] sm:text-6xl md:text-8xl">Ra khơi theo cách của bạn.</h1><p className="mt-6 max-w-lg text-base leading-7 text-hubi-cream/80 md:text-lg">{siteDescription}</p><Link href="/san-pham" className="mt-8 inline-flex min-h-11 items-center bg-hubi-tan px-5 py-3 text-sm font-medium text-hubi-charcoal transition-colors hover:bg-hubi-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hubi-cream">Khám phá sản phẩm</Link></div></div></main>
}
