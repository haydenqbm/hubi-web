import type { Metadata } from "next"
import Image from "next/image"
import { ArrowUpRight, Facebook, Phone, QrCode } from "lucide-react"
import { PageContainer } from "@/components/shared/page-container"
import { HubiLogo } from "@/components/shared/hubi-logo"
import { absoluteUrl, defaultOgImage } from "@/lib/seo"

export const metadata: Metadata = { title: "Liên hệ", description: "Kết nối với Hubi Việt Nam qua Facebook, điện thoại hoặc Zalo.", alternates: { canonical: "/lien-he" }, openGraph: { title: "Liên hệ | Hubi Việt Nam", description: "Kết nối với Hubi Việt Nam qua Facebook, điện thoại hoặc Zalo.", url: absoluteUrl("/lien-he"), images: [{ url: defaultOgImage, alt: "Trải nghiệm thể thao dưới nước cùng Hubi Việt Nam" }] } }

export default function ContactPage() {
  return <article className="bg-hubi-cream text-hubi-charcoal">
    <section data-hero className="relative min-h-svh overflow-hidden bg-hubi-ink">
      <Image src="/images/contact/halong-contact-bg-v2.png" alt="Vịnh Hạ Long trong sương sớm" fill priority sizes="100vw" className="hidden object-cover md:block" />
      <Image src="/images/contact/halong-contact-mobile-bg-v2.png" alt="Vịnh Hạ Long trong sương sớm" fill priority sizes="100vw" className="object-cover object-center md:hidden" />
      <PageContainer className="relative flex min-h-svh items-center justify-center md:justify-start md:py-16">
        <div className="w-full max-w-md bg-hubi-cream/95 px-4 py-5 shadow-[0_18px_60px_rgb(var(--hubi-shadow-rgb)/.24)] backdrop-blur-[2px] sm:px-8 sm:py-10 md:px-10 md:py-12">
          <div className="mb-4 md:hidden"><HubiLogo /></div>
          <h1 className="font-serif text-4xl leading-none text-hubi-deep-teal sm:text-5xl">Liên hệ Hubi Việt Nam</h1>
          <a href="https://www.facebook.com/HUBIVIETNAM" target="_blank" rel="noreferrer" className="group mt-5 flex items-center justify-between border-y border-hubi-deep-teal/20 py-4 text-hubi-deep-teal transition-colors hover:border-hubi-teal hover:text-hubi-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hubi-teal sm:mt-8 sm:py-5"><span className="flex items-center gap-3 sm:gap-4"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-hubi-deep-teal text-hubi-cream sm:h-10 sm:w-10"><Facebook className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" strokeWidth={1.5} /></span><span><span className="block text-[0.65rem] uppercase tracking-[.14em] text-hubi-muted-teal sm:text-xs sm:tracking-[.16em]">Hỗ trợ &amp; bán hàng</span><span className="mt-0.5 block font-serif text-xl sm:mt-1 sm:text-2xl">Nhắn Facebook</span></span></span><ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} /></a>
          <a href="tel:0889311322" className="group flex items-center gap-3 border-b border-hubi-deep-teal/15 py-4 text-hubi-deep-teal transition-colors hover:text-hubi-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hubi-teal sm:gap-4 sm:py-5"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-hubi-deep-teal text-hubi-cream sm:h-10 sm:w-10"><Phone className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} /></span><span><span className="block text-[0.65rem] uppercase tracking-[.14em] text-hubi-muted-teal sm:text-xs sm:tracking-[.16em]">Điện thoại</span><span className="mt-0.5 block font-serif text-xl sm:mt-1 sm:text-2xl">0889 311 322</span></span></a>
          <div className="mt-5 flex items-center gap-3 border-t border-hubi-deep-teal/15 pt-4 sm:mt-8 sm:gap-5 sm:pt-6"><div className="relative h-20 w-20 shrink-0 overflow-hidden bg-white p-1 sm:h-28 sm:w-28"><Image src="/images/contact/zalo-qr.png" alt="Mã QR Zalo của Hubi Việt Nam" fill sizes="112px" className="object-contain p-1" /></div><div><QrCode className="h-4 w-4 text-hubi-teal sm:h-5 sm:w-5" strokeWidth={1.5} /><p className="mt-1 font-serif text-lg text-hubi-deep-teal sm:mt-2 sm:text-xl">Quét để mở Zalo</p><p className="mt-0.5 text-xs leading-4 text-hubi-muted-teal sm:mt-1 sm:text-sm sm:leading-5">Tư vấn nhanh từ đội ngũ Hubi.</p></div></div>
        </div>
      </PageContainer>
    </section>
  </article>
}
