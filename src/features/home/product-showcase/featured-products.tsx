import { PageContainer } from "@/components/shared/page-container"
import { AccordionGallery } from "@/components/ui/react-bits/accordion-gallery"
import { getFeaturedProducts } from "@/lib/content"

export function FeaturedProducts() {
  return <section id="san-pham-noi-bat" className="bg-[hsl(var(--background))] py-[var(--section-space)]"><PageContainer><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="small mb-4 uppercase tracking-[.2em] text-brand">Bộ sưu tập Hubi</p><h2 className="heading-2 max-w-2xl">Chọn trải nghiệm phù hợp với nhịp nước của bạn.</h2></div><p className="body max-w-sm text-muted-foreground">Những mẫu SUP được tuyển chọn cho hành trình thư thái, năng động và đầy cảm hứng.</p></div><AccordionGallery products={getFeaturedProducts()} /></PageContainer></section>
}
