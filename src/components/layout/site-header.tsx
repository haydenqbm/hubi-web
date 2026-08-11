import { NavigationMenu } from "@/components/ui/navigation-menu"

const NAV_ITEMS = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/san-pham" },
  { label: "Blog", href: "/blog" },
  { label: "Liên hệ", href: "/lien-he" },
] as const

export function SiteHeader() {
  return <header><NavigationMenu items={NAV_ITEMS} /></header>
}
