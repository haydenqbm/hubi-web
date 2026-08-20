"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { usePathname } from "next/navigation"
import { HubiLogo } from "@/components/shared/hubi-logo"

export type NavigationItem = { label: string; href: string }

export function NavigationMenu({ items }: { items: readonly NavigationItem[] }) {
  const [scrolledPastHero, setScrolledPastHero] = React.useState(false)
  const pathname = usePathname()
  const isProductDetail = pathname.startsWith("/san-pham/") || pathname.startsWith("/phu-kien/")
  const isContactPage = pathname === "/lien-he"
  const hasBackLink = isProductDetail || isContactPage

  React.useEffect(() => {
    const hero = document.querySelector("[data-hero]")
    if (!hero || typeof IntersectionObserver !== "function") return
    const observer = new IntersectionObserver(([entry]) => setScrolledPastHero(!entry.isIntersecting), { threshold: 0.05 })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const surface = isProductDetail || scrolledPastHero ? "border-hubi-deep-teal bg-hubi-deep-teal" : "border-hubi-cream/20 bg-hubi-ink/30 backdrop-blur-sm"
  const backLink = <Link href="/san-pham" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[.14em] text-hubi-cream/85 transition-colors hover:text-hubi-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hubi-cream"><ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> Quay lại</Link>

  return <>
    <div className={`${isProductDetail ? "sticky" : "fixed"} inset-x-0 top-0 z-50 hidden border-b text-hubi-cream transition-colors duration-300 md:block ${surface}`}>
      <motion.nav className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10" aria-label="Điều hướng chính">
        {hasBackLink ? backLink : <HubiLogo inverted />}
        {hasBackLink ? <div className="absolute left-1/2 -translate-x-1/2"><HubiLogo inverted /></div> : <div className="flex items-center gap-7">{items.map((item) => <Link key={item.href} href={item.href} className="text-[0.7rem] font-medium uppercase tracking-[.16em] text-hubi-cream/80 transition-colors hover:text-hubi-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hubi-cream">{item.label}</Link>)}</div>}
        <Link href="/lien-he" className="rounded-full bg-hubi-tan px-4 py-2 text-xs font-medium text-hubi-charcoal transition-colors hover:bg-hubi-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hubi-cream">Liên hệ</Link>
      </motion.nav>
    </div>
    <div className={`${isProductDetail ? "sticky" : "fixed"} inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b px-4 text-hubi-cream transition-colors duration-300 md:hidden ${surface}`}>
      {hasBackLink ? backLink : <span aria-hidden="true" className="w-12" />}
      <div className="absolute left-1/2 -translate-x-1/2"><HubiLogo inverted markOnly /></div>
      <Link href="/lien-he" className="rounded-full bg-hubi-tan px-3 py-1.5 text-xs font-medium text-hubi-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hubi-cream">Liên hệ</Link>
    </div>
  </>
}
