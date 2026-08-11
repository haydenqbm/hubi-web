import Link from "next/link"
import { NavigationMenu } from "@/components/ui/navigation-menu"
import { PageContainer } from "@/components/shared/page-container"

const NAV_ITEMS = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/san-pham" },
  { label: "Blog", href: "/blog" },
  { label: "Liên hệ", href: "/lien-he" },
] as const

export function SiteHeader() {
  return <header className="sticky top-0 z-50 border-b border-border/70 bg-white/90 backdrop-blur-xl"><PageContainer className="relative flex h-20 items-center justify-between"><Link href="/" className="text-xl font-bold tracking-[-.04em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"><span className="text-brand">hubi</span><span className="text-foreground"> Việt Nam</span></Link><NavigationMenu items={NAV_ITEMS} /></PageContainer></header>
}
