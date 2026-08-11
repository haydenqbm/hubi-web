import Link from "next/link"
import { PageContainer } from "@/components/shared/page-container"
import { StickyFooter } from "@/components/ui/sticky-footer"

const NAV_ITEMS = [
  { label: "Trang chủ", href: "/" }, { label: "Sản phẩm", href: "/san-pham" }, { label: "Blog", href: "/blog" }, { label: "Liên hệ", href: "/lien-he" },
] as const

export function SiteFooter() {
  return <StickyFooter><PageContainer className="py-14 md:py-20"><div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between"><div className="max-w-md"><p className="text-2xl font-bold tracking-[-.04em]"><span className="text-cyan-300">hubi</span> Việt Nam</p><p className="mt-4 text-sm leading-7 text-white/65">Mang những trải nghiệm thể thao dưới nước chất lượng đến gần hơn với người Việt.</p></div><nav aria-label="Điều hướng chân trang" className="grid grid-cols-2 gap-x-10 gap-y-4 text-sm text-white/75">{NAV_ITEMS.map((item) => <Link key={item.href} href={item.href} className="transition-colors hover:text-white">{item.label}</Link>)}</nav></div><div className="mt-14 border-t border-white/15 pt-5 text-xs text-white/45">© {new Date().getFullYear()} Hubi Việt Nam. Bảo lưu mọi quyền.</div></PageContainer></StickyFooter>
}
