import type { Metadata } from "next"
import Image from "next/image"
import { ProductCatalog } from "@/features/products/product-catalog"

export const metadata: Metadata = { title: "Sản phẩm", description: "Khám phá thuyền, SUP và phụ kiện Hubi Việt Nam." }

export default function ProductsPage() {
  return <>
    <section data-hero className="relative isolate min-h-screen overflow-hidden bg-[#062E35] text-[#F7F1E8]">
      <Image src="/images/products/desktop-hero-v2.png" alt="Mặt nước lúc hoàng hôn" fill priority sizes="100vw" className="hidden object-cover object-right md:block md:translate-x-[2%] md:-translate-y-[3%] md:scale-[1.06]" />
      <Image src="/images/products/mobile-hero-v2.png" alt="Mặt nước lúc hoàng hôn" fill priority sizes="100vw" className="object-cover object-center -translate-y-[3%] scale-[1.06] md:hidden" />
      <div className="absolute inset-x-0 bottom-0 top-16 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
      <div className="relative mx-auto flex min-h-screen max-w-[1600px] items-start px-[9%] pb-16 pt-36 md:items-center md:px-8 md:pb-0 md:pt-16 lg:px-12"><div className="max-w-xl"><h1 className="font-serif font-medium leading-[.94] tracking-[-.035em] md:max-w-2xl md:text-6xl lg:text-7xl"><span className="block text-[clamp(3.25rem,8.5vw,4.75rem)] md:hidden"><span className="block">Ra khơi</span><span className="block">theo cách</span><span className="block">của bạn.</span></span><span className="hidden md:inline">Ra khơi theo cách của bạn.</span></h1><p className="mt-5 max-w-lg text-base leading-7 text-[#F7F1E8]/80 sm:text-lg md:mt-6 md:text-lg lg:text-xl">Thuyền, SUP và phụ kiện cho những ngày muốn đi xa hơn trên mặt nước.</p></div></div>
    </section>
    <ProductCatalog />
  </>
}
