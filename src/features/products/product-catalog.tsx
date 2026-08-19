"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { products } from "@/data/products"
import type { Product } from "@/types/product"

type CatalogProduct = Product & { meta: string }
type BrandSection = { brand: string; products: CatalogProduct[] }
type Category = { label: string; intro: string; brands: BrandSection[] }

const categoryOrder = ["SUP", "THUYỀN CÂU"]
const brandOrder = ["HB Board", "GQ Board", "Tidetrek", "Picboard", "Hãng khác"]
const categoryIntros: Record<string, string> = {
  SUP: "Những thiết kế cân bằng cho những ngày muốn đi xa hơn trên mặt nước.",
  "THUYỀN CÂU": "Không gian ổn định cho những buổi đi xa và những khoảnh khắc thật yên.",
}

function productMeta(product: Product) {
  const size = product.specs?.["Kích thước"]
  const capacity = product.specs?.["Tải trọng"]
  return [size, capacity].filter(Boolean).join(" · ") || product.category || "Sản phẩm Hubi"
}

function buildCategories(): Category[] {
  return categoryOrder.map((label) => {
    const grouped = new Map<string, CatalogProduct[]>()
    products.filter((product) => product.category === label).forEach((product) => {
      const brand = product.brand ?? "Hãng khác"
      const list = grouped.get(brand) ?? []
      list.push({ ...product, meta: productMeta(product) })
      grouped.set(brand, list)
    })
    const brands = [...grouped.entries()]
      .sort(([a], [b]) => {
        const aIndex = brandOrder.indexOf(a)
        const bIndex = brandOrder.indexOf(b)
        return (aIndex < 0 ? brandOrder.length : aIndex) - (bIndex < 0 ? brandOrder.length : bIndex)
      })
      .map(([brand, items]) => ({ brand, products: items }))
    return { label, intro: categoryIntros[label], brands }
  })
}

const categoryCards = [
  { label: "SUP", title: "SUP", description: "Cân bằng, linh hoạt và sẵn sàng lên đường.", image: "/images/products/category-sup-v2.png" },
  { label: "THUYỀN CÂU", title: "Thuyền câu", description: "Không gian ổn định cho những buổi đi xa.", image: "/images/products/category-thuyen-cau-v2.png" },
] as const

function ProductCard({ product }: { product: CatalogProduct }) {
  const image = product.images[0]
  return <article className="group min-w-0 pb-4 lg:pb-6"><Link href={`/san-pham/${product.slug}`} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#07676E]"><div className="relative aspect-square overflow-hidden bg-[#E0CCB3]/35"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw" className="object-contain p-3 transition-transform duration-700 group-hover:scale-[1.04] sm:p-5 lg:p-8" /></div><div className="pt-3 sm:pt-5"><p className="truncate text-[0.6rem] uppercase tracking-[.14em] text-[#698E93] sm:text-xs">{product.category}</p><h5 className="mt-1 font-serif text-base font-medium leading-tight sm:text-2xl">{product.name}</h5><p className="mt-3 text-[0.6rem] uppercase tracking-[.12em] text-[#698E93] sm:text-xs">{product.meta}</p></div></Link></article>
}

function BrandSection({ section }: { section: BrandSection }) {
  const [currentPage, setCurrentPage] = useState(0)
  const pageSize = 4
  const pageCount = Math.ceil(section.products.length / pageSize)
  const pageProducts = section.products.slice(currentPage * pageSize, (currentPage + 1) * pageSize)

  return <div className="border-t border-[#1A585F]/15 pt-4 lg:pt-5"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h4 className="font-serif text-3xl font-medium tracking-[-.03em] sm:text-4xl">{section.brand}</h4><div className="flex items-center gap-3"><span className="text-[0.65rem] uppercase tracking-[.14em] text-[#698E93]">{section.products.length} sản phẩm</span><button type="button" aria-label="Trang trước" disabled={currentPage === 0} onClick={() => setCurrentPage((page) => page - 1)} className="text-[#1A585F] transition-opacity disabled:cursor-not-allowed disabled:opacity-25"><ChevronLeft className="h-5 w-5" strokeWidth={1.5} /></button><div className="flex items-center gap-1.5" aria-label={`Trang sản phẩm ${section.brand}`}>{Array.from({ length: pageCount }, (_, index) => <button key={`${section.brand}-page-${index}`} type="button" aria-label={`Xem trang ${index + 1}`} aria-current={currentPage === index ? "page" : undefined} onClick={() => setCurrentPage(index)} className={`h-1 w-7 transition-colors ${currentPage === index ? "bg-[#07676E]" : "bg-[#B5C7CA]"}`} />)}</div><span className="min-w-[2.5rem] text-right text-[0.65rem] tabular-nums tracking-[.12em] text-[#698E93]">{String(currentPage + 1).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}</span><button type="button" aria-label="Trang tiếp theo" disabled={currentPage === pageCount - 1} onClick={() => setCurrentPage((page) => page + 1)} className="text-[#1A585F] transition-opacity disabled:cursor-not-allowed disabled:opacity-25"><ChevronRight className="h-5 w-5" strokeWidth={1.5} /></button></div></div><div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-7">{pageProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div></div>
}

function CategorySection({ category }: { category: Category }) {
  return <section aria-label={category.label} className="space-y-10"><p className="max-w-2xl text-sm leading-6 text-[#698E93]">{category.intro}</p>{category.brands.map((brand) => <BrandSection key={`${category.label}-${brand.brand}`} section={brand} />)}</section>
}

function CategoryCard({ card, active, onSelect }: { card: (typeof categoryCards)[number]; active: boolean; onSelect: () => void }) {
  return <button type="button" aria-pressed={active} onClick={onSelect} className={`group relative aspect-[2/1] overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#07676E] sm:aspect-[4/3] ${active ? "ring-2 ring-[#07676E] ring-offset-2 ring-offset-[#F7F1E8]" : ""}`}><Image src={card.image} alt="" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover object-[center_bottom] transition-transform duration-700 group-hover:scale-[1.04]" /><div className="absolute inset-0 bg-gradient-to-t from-[#102735]/85 via-[#102735]/10 to-transparent" /><div className="absolute inset-x-5 bottom-4 text-[#F7F1E8] sm:bottom-5"><h3 className="font-serif text-2xl font-medium sm:text-3xl">{card.title}</h3><p className="mt-1 max-w-[15rem] text-sm leading-5 text-[#F7F1E8]/80">{card.description}</p></div></button>
}

export function ProductCatalog() {
  const categories = buildCategories()
  const [active, setActive] = useState("SUP")
  return <section id="bo-suu-tap" className="bg-[#F7F1E8] pb-16 pt-8 text-[#1A585F] sm:pb-20 sm:pt-6 lg:pb-24 lg:pt-8"><div className="mx-auto max-w-[1600px] px-5 sm:px-8 2xl:px-12"><h2 className="max-w-2xl font-serif text-3xl font-medium leading-[1.04] tracking-[-.035em] sm:text-4xl lg:text-5xl">Chọn điều đưa bạn đến gần mặt nước hơn.</h2><div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-5" aria-label="Danh mục sản phẩm">{categoryCards.map((card) => <CategoryCard key={card.label} card={card} active={active === card.label} onSelect={() => setActive(card.label)} />)}</div><div className="mt-12 lg:mt-16">{categories.map((category) => <div key={category.label} hidden={category.label !== active} aria-hidden={category.label !== active}><CategorySection category={category} /></div>)}</div></div></section>
}
