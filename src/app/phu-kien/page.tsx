import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { PageContainer } from "@/components/shared/page-container"
import { getAccessories, getAccessoryCategories } from "@/lib/content"

export const metadata: Metadata = {
  title: "Phụ kiện",
  description: "Mái chèo, áo phao, bơm và phụ kiện thực tế từ Hubi Việt Nam.",
}

export default function AccessoriesPage() {
  const accessories = getAccessories()
  const accessoryCategories = getAccessoryCategories()
  return (
    <main className="bg-hubi-cream text-hubi-deep-teal">
      <section className="border-b border-hubi-deep-teal/15 bg-hubi-ink py-28 text-hubi-cream md:py-36">
        <PageContainer>
          <p className="font-sans text-xs uppercase tracking-[.2em] text-hubi-blue-grey">Hubi Việt Nam</p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl font-medium leading-[.96] tracking-[-.04em] sm:text-6xl md:text-8xl">Phụ kiện cho mỗi nhịp chèo.</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-hubi-cream/75 md:text-lg">Những món đồ thực tế để chuẩn bị, sử dụng và tận hưởng thời gian trên mặt nước.</p>
        </PageContainer>
      </section>
      <PageContainer className="py-12 md:py-20">
        <div className="space-y-16 md:space-y-24">
          {accessoryCategories.map((category) => {
            const items = accessories.filter((accessory) => accessory.category === category.key)
            return (
              <section key={category.key} aria-labelledby={`category-${category.key}`}>
                <div className="mb-7 flex items-end justify-between gap-4 border-b border-hubi-deep-teal/20 pb-4">
                  <div>
                    <p className="font-sans text-xs uppercase tracking-[.18em] text-hubi-muted-teal">{items.length} sản phẩm</p>
                    <h2 id={`category-${category.key}`} className="mt-2 font-serif text-4xl font-medium tracking-[-.03em] md:text-5xl">{category.label}</h2>
                  </div>
                  <span className="hidden font-serif text-5xl text-hubi-blue-grey/70 md:block">{String(accessoryCategories.indexOf(category) + 1).padStart(2, "0")}</span>
                </div>
                <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((accessory) => (
                    <Link key={accessory.slug} href={`/phu-kien/${accessory.slug}`} className="group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hubi-teal">
                      <div className="relative aspect-square overflow-hidden bg-hubi-tan/45">
                        <Image src={accessory.images[0].src} alt={accessory.images[0].alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-contain p-2 transition-transform duration-700 group-hover:scale-[1.04]" />
                      </div>
                      <p className="mt-4 font-sans text-xs uppercase tracking-[.14em] text-hubi-muted-teal">{category.label}</p>
                      <h3 className="mt-2 font-serif text-2xl font-medium leading-tight">{accessory.name}</h3>
                      <p className="mt-2 text-sm text-hubi-sage">{accessory.price}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </PageContainer>
    </main>
  )
}
