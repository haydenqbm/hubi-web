import type { Metadata } from "next"
import Image from "next/image"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FoldText } from "@/components/ui/react-bits/fold-text"
import { ProductCatalog } from "@/features/products/product-catalog"
import { absoluteUrl, defaultOgImage, jsonLd } from "@/lib/seo"

export const metadata: Metadata = { title: "Sản phẩm", description: "Khám phá thuyền, SUP và phụ kiện Hubi Việt Nam.", alternates: { canonical: "/san-pham" }, openGraph: { title: "Sản phẩm | Hubi Việt Nam", description: "Khám phá thuyền, SUP và phụ kiện Hubi Việt Nam.", url: absoluteUrl("/san-pham"), images: [{ url: defaultOgImage, alt: "Trải nghiệm thể thao dưới nước cùng Hubi Việt Nam" }] } }

export default function ProductsPage() {
  const collectionJsonLd = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Sản phẩm Hubi Việt Nam", url: absoluteUrl("/san-pham"), isPartOf: { "@type": "WebSite", name: "Hubi Việt Nam", url: absoluteUrl("/") } }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(collectionJsonLd) }} />
    <section data-hero className="sticky top-0 z-0 relative isolate min-h-screen overflow-hidden bg-hubi-deep-water text-hubi-cream">
      <Image src="/images/hero/products-desktop.png" alt="Trải nghiệm thể thao dưới nước cùng Hubi Việt Nam" fill priority sizes="100vw" className="hidden object-cover object-bottom md:block" />
      <Image src="/images/hero/products-mobile.png" alt="Mặt nước lúc hoàng hôn" fill priority sizes="100vw" className="object-cover object-center -translate-y-[3%] scale-[1.06] md:hidden" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(var(--hubi-overlay-rgb)/.65)_0%,rgb(var(--hubi-overlay-rgb)/.2)_28%,transparent_62%)] md:hidden" />
      <div className="relative mx-auto flex min-h-screen max-w-[1600px] items-start px-[9%] pb-16 pt-36 md:items-center md:px-8 md:pb-0 md:pt-16 lg:px-12"><div className="max-w-xl"><h1 className="font-serif font-medium leading-[.94] md:max-w-2xl"><FoldText text="Để một ngày trôi khác đi." splitBy="word" hinge="top" duration={0.65} stagger={0.045} perspective={700} creaseShading={0.45} fontSize="clamp(3.25rem, 8.5vw, 4.75rem)" fontWeight={500} color="var(--hubi-cream)" /></h1><ScrollReveal delay={0.32}><p className="mt-5 max-w-lg text-base leading-7 text-hubi-cream/80 sm:text-lg md:mt-6 md:text-lg lg:text-xl">Thuyền, SUP và phụ kiện cho những ngày muốn đi xa hơn trên mặt nước.</p></ScrollReveal></div></div>
    </section>
    <ProductCatalog />
  </>
}
