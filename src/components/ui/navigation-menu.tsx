"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export type NavigationItem = { label: string; href: string }

export function NavigationMenu({ items }: { items: readonly NavigationItem[] }) {
  const [open, setOpen] = useState(false)
  return <>
    <nav aria-label="Điều hướng chính" className="hidden items-center gap-8 md:flex">
      {items.map((item) => <Link key={item.href} href={item.href} className="relative py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">{item.label}<span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-brand transition-transform duration-[var(--duration-normal)] ease-[var(--ease-standard)] hover:scale-x-100" /></Link>)}
    </nav>
    <button type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Đóng menu" : "Mở menu"} onClick={() => setOpen(!open)} className="rounded-md p-2 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:hidden">
      {open ? <X size={22} /> : <Menu size={22} />}
    </button>
    {open && <nav id="mobile-navigation" aria-label="Điều hướng di động" className="absolute inset-x-0 top-full border-t border-border bg-white px-[var(--page-padding)] py-4 shadow-lg md:hidden">{items.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block border-b border-border py-4 text-base font-medium last:border-0">{item.label}</Link>)}</nav>}
  </>
}
