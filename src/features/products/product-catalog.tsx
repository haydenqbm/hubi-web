"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { DepthCarousel } from "@/components/ui/react-bits/depth-carousel"
import { categories, categoryCards, type BrandSection, type CatalogProduct, type Category, type CategoryCardData } from "@/features/products/catalog-data"

function ProductCard({ product }: { product: CatalogProduct }) {
  return <article className="group h-full min-w-0"><Link href={product.href} className="flex h-full flex-col bg-hubi-card p-3 text-hubi-deep-teal shadow-[0_12px_30px_rgb(var(--hubi-deep-teal-rgb)/.06)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgb(var(--hubi-deep-teal-rgb)/.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hubi-teal sm:p-4"><div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-md bg-hubi-tan/35"><Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 75vw, 360px" className="object-contain transition-transform duration-700 group-hover:scale-[1.04]" /></div><div className="mt-5"><h5 className="font-serif text-2xl font-medium leading-tight tracking-[-.02em] sm:text-3xl">{product.name}</h5><p className="mt-3 text-sm font-medium uppercase tracking-[.1em] text-hubi-price sm:text-base">{product.price}</p></div></Link></article>
}

function BrandSection({ section }: { section: BrandSection }) {
  return <ScrollReveal className="border-t border-hubi-deep-teal/15 pt-4 lg:pt-5"><div className="mb-4 flex items-center justify-between gap-3"><h4 className="font-serif text-3xl font-medium tracking-[-.03em] sm:text-4xl">{section.brand}</h4><span className="text-[0.65rem] uppercase tracking-[.14em] text-hubi-muted-teal">{section.products.length} sản phẩm</span></div><DepthCarousel items={section.products.map((product) => ({ alt: product.name, content: <ProductCard product={product} /> }))} cardWidth={360} cardHeight={470} depth={160} spread={52} blur={0} /></ScrollReveal>
}

function CategorySection({ category }: { category: Category }) {
  return <section aria-label={category.label} className="grid gap-10 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">{category.brands.map((brand) => <BrandSection key={`${category.label}-${brand.brand}`} section={brand} />)}</section>
}

function CategoryCard({ card, active, onSelect }: { card: CategoryCardData; active: boolean; onSelect: () => void }) {
  const imagePosition = card.label === "PHỤ KIỆN" ? "object-center scale-[1.12] group-hover:scale-[1.16]" : "object-[center_bottom] group-hover:scale-[1.04]"
  return <button type="button" aria-pressed={active} onClick={onSelect} className={`group relative aspect-[2/1] overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hubi-teal md:aspect-[4/3] ${active ? "ring-2 ring-hubi-teal ring-offset-2 ring-offset-hubi-cream" : ""}`}><Image src={card.image} alt="" fill sizes="(max-width: 767px) 100vw, 33vw" className={`object-cover transition-transform duration-700 ${imagePosition}`} /><div className="absolute inset-0 bg-gradient-to-t from-hubi-ink/85 via-hubi-ink/10 to-transparent" /><div className="absolute inset-x-5 bottom-4 text-hubi-cream md:bottom-5"><h3 className="font-serif text-2xl font-medium md:text-3xl">{card.title}</h3><p className="mt-1 max-w-[15rem] text-sm leading-5 text-hubi-cream/80">{card.description}</p></div></button>
}

export function ProductCatalog() {
  const [active, setActive] = useState("SUP")
  return <section id="bo-suu-tap" className="relative z-10 bg-hubi-cream pb-16 pt-8 text-hubi-deep-teal shadow-[0_-18px_40px_rgb(var(--hubi-ink-rgb)/.12)] sm:pb-20 sm:pt-6 lg:pb-24 lg:pt-8"><div className="mx-auto max-w-[1600px] px-5 sm:px-8 2xl:px-12"><ScrollReveal><h2 className="max-w-2xl font-serif text-3xl font-medium leading-[1.04] tracking-[-.035em] sm:text-4xl lg:text-5xl">Chọn điều đưa bạn đến gần mặt nước hơn.</h2></ScrollReveal><ScrollReveal delay={0.1} distance={16}><div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-5" aria-label="Danh mục sản phẩm">{categoryCards.map((card) => <CategoryCard key={card.label} card={card} active={active === card.label} onSelect={() => setActive(card.label)} />)}</div></ScrollReveal><div className="mt-12 lg:mt-16">{categories.map((category) => <div key={category.label} hidden={category.label !== active} aria-hidden={category.label !== active}><CategorySection category={category} /></div>)}</div></div></section>
}
