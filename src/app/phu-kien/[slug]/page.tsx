import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageContainer } from "@/components/shared/page-container"
import { ProductImageCarousel } from "@/features/products/product-image-carousel"
import { getAccessories, getAccessoryBySlug } from "@/lib/content"
import { absoluteUrl, breadcrumbJsonLd, jsonLd } from "@/lib/seo"

export function generateStaticParams() {
  return getAccessories().map((accessory) => ({ slug: accessory.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const accessory = getAccessoryBySlug((await params).slug)
  return accessory ? { title: accessory.name, description: accessory.description, alternates: { canonical: `/phu-kien/${accessory.slug}` }, openGraph: { title: `${accessory.name} | Hubi Việt Nam`, description: accessory.description, url: absoluteUrl(`/phu-kien/${accessory.slug}`), images: accessory.images.map((image) => ({ url: image.src, alt: image.alt })) } } : {}
}

export default async function AccessoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const accessory = getAccessoryBySlug((await params).slug)
  if (!accessory) notFound()
  const breadcrumb = breadcrumbJsonLd([{ name: "Trang chủ", path: "/" }, { name: "Phụ kiện", path: "/phu-kien" }, { name: accessory.name, path: `/phu-kien/${accessory.slug}` }])

  return (
    <main className="bg-hubi-cream text-hubi-deep-teal"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />
      <PageContainer className="py-8 md:py-16">
        <div className="relative mx-auto max-w-6xl overflow-hidden bg-hubi-sand shadow-[0_20px_60px_rgb(var(--hubi-deep-teal-rgb)/.16)]">
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border border-hubi-deep-teal/15" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full border border-hubi-deep-teal/10" />
          <div className="relative grid items-center gap-8 p-4 sm:p-6 md:grid-cols-[1.1fr_.9fr] md:gap-14 md:p-10 lg:p-14">
            <div className="relative overflow-hidden bg-hubi-tan p-3 sm:p-5">
              <ProductImageCarousel images={accessory.images} productName={accessory.name} />
              <div className="flex items-center justify-between pt-3 font-sans text-[0.6rem] uppercase tracking-[.2em] text-hubi-muted-teal sm:pt-4 sm:text-xs">
                <span>Hubi Việt Nam</span>
                <span>{accessory.category}</span>
              </div>
            </div>
            <div className="px-2 py-6 text-hubi-deep-teal md:px-0 md:py-10">
              <div className="mb-7 h-px w-16 bg-hubi-teal md:mb-10 md:w-24" />
              <p className="font-sans text-[0.65rem] uppercase tracking-[.18em] text-hubi-muted-teal">{accessory.category}</p>
              <h1 className="mt-3 max-w-lg font-serif text-5xl font-medium leading-[.98] tracking-[-.04em] sm:text-6xl md:text-7xl">{accessory.name}</h1>
              <p className="mt-5 max-w-md font-sans text-sm leading-6 text-hubi-sage">{accessory.description}</p>
              <div className="mt-10 border-t border-hubi-blue-grey/30 pt-5 md:mt-14 md:pt-7">
                <p className="font-sans text-[0.65rem] uppercase tracking-[.18em] text-hubi-muted-teal">Giá tham khảo</p>
                <p className="mt-2 font-serif text-3xl text-hubi-danger sm:text-4xl">{accessory.price}</p>
                <Link href={`/lien-he?san-pham=${encodeURIComponent(accessory.name)}`} className="mt-8 inline-flex items-center justify-center bg-hubi-teal px-5 py-3 text-sm font-medium text-hubi-cream transition-colors hover:bg-hubi-deep-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hubi-teal">Liên hệ tư vấn</Link>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </main>
  )
}
