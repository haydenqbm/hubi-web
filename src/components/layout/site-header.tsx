import { NavigationMenu } from "@/components/ui/navigation-menu"

const NAV_ITEMS = [] as const

export function SiteHeader() {
  return <header><NavigationMenu items={NAV_ITEMS} /></header>
}
