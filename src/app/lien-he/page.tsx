import type { Metadata } from "next"
import Link from "next/link"
import { PageContainer } from "@/components/shared/page-container"
import { SectionHeading } from "@/components/shared/section-heading"

export const metadata: Metadata = { title: "Liên hệ", description: "Kết nối với Hubi Việt Nam để tìm hiểu thêm về các sản phẩm thể thao dưới nước." }

export default function ContactPage() {
  return <section className="bg-[hsl(var(--surface))] py-[var(--section-space)]"><PageContainer><div className="grid gap-12 md:grid-cols-[1.15fr_.85fr] md:items-end"><SectionHeading eyebrow="Kết nối cùng Hubi" title="Sẵn sàng cho trải nghiệm tiếp theo trên mặt nước?" description="Hãy tìm hiểu bộ sưu tập của Hubi Việt Nam và chọn sản phẩm phù hợp với hành trình của bạn." /><div className="rounded-[var(--radius-lg)] bg-foreground p-7 text-white md:p-9"><p className="text-sm uppercase tracking-[.18em] text-cyan-200">Bắt đầu từ đây</p><p className="mt-5 text-lg leading-8 text-white/80">Thông tin liên hệ trực tiếp sẽ được cập nhật cùng hệ thống kênh chính thức của Hubi Việt Nam.</p><Link href="/san-pham" className="mt-7 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-cyan-100">Xem sản phẩm</Link></div></div></PageContainer></section>
}
