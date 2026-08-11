import type { Metadata } from "next"
import { PageContainer } from "@/components/shared/page-container"
import { SectionHeading } from "@/components/shared/section-heading"
import { ProductGrid } from "@/features/products/product-grid"
import { getProducts } from "@/lib/content"

export const metadata: Metadata = { title: "Sản phẩm", description: "Khám phá các sản phẩm SUP được Hubi Việt Nam tuyển chọn." }

export default function ProductsPage() {
  return <section className="py-[var(--section-space)]"><PageContainer><SectionHeading eyebrow="Bộ sưu tập Hubi" title="Sản phẩm cho những ngày muốn ra mặt nước." description="Từ những buổi chèo đầu tiên đến các chuyến khám phá dài hơn, chọn thiết kế phù hợp với nhịp điệu của bạn." /><div className="mt-14"><ProductGrid products={getProducts()} /></div></PageContainer></section>
}
