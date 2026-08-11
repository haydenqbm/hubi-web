"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useMotionValueEvent, useScroll, type Variants } from "framer-motion"
import { Menu, Navigation } from "lucide-react"
import { cn } from "@/lib/utils"

export type NavigationItem = { label: string; href: string }

const EXPAND_SCROLL_THRESHOLD = 80

const containerVariants: Variants = {
  expanded: { y: 0, opacity: 1, width: "auto", transition: { y: { type: "spring", damping: 18, stiffness: 250 }, opacity: { duration: 0.3 }, type: "spring", damping: 20, stiffness: 300, staggerChildren: 0.07, delayChildren: 0.2 } },
  collapsed: { y: 0, opacity: 1, width: "3rem", transition: { type: "spring", damping: 20, stiffness: 300, when: "afterChildren", staggerChildren: 0.05, staggerDirection: -1 } },
}

const logoVariants: Variants = {
  expanded: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -25, rotate: -180, transition: { duration: 0.3 } },
}

const itemVariants: Variants = {
  expanded: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", damping: 15 } },
  collapsed: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } },
}

const collapsedIconVariants: Variants = {
  expanded: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  collapsed: { opacity: 1, scale: 1, transition: { type: "spring", damping: 15, stiffness: 300, delay: 0.15 } },
}

export function NavigationMenu({ items }: { items: readonly NavigationItem[] }) {
  const [isExpanded, setExpanded] = React.useState(true)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { scrollY } = useScroll()
  const lastScrollY = React.useRef(0)
  const scrollPositionOnCollapse = React.useRef(0)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current
    if (isExpanded && latest > previous && latest > 150) {
      setExpanded(false)
      scrollPositionOnCollapse.current = latest
    } else if (!isExpanded && latest < previous && scrollPositionOnCollapse.current - latest > EXPAND_SCROLL_THRESHOLD) {
      setExpanded(true)
    }
    lastScrollY.current = latest
  })

  const handleNavClick = (event: React.MouseEvent) => {
    if (!isExpanded) {
      event.preventDefault()
      setExpanded(true)
    }
  }

  return <>
    <div className="fixed left-1/2 top-6 z-50 hidden -translate-x-1/2 md:block">
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={isExpanded ? "expanded" : "collapsed"} variants={containerVariants} whileHover={!isExpanded ? { scale: 1.1 } : {}} whileTap={!isExpanded ? { scale: 0.95 } : {}} onClick={handleNavClick} className={cn("flex h-12 items-center overflow-hidden rounded-full border border-border bg-[hsl(var(--background)/.8)] shadow-lg backdrop-blur-sm", !isExpanded && "cursor-pointer justify-center")} aria-label="Điều hướng chính">
        <motion.div variants={logoVariants} className="flex shrink-0 items-center gap-2 pl-4 pr-2 font-semibold"><Navigation className="h-6 w-6 text-brand" aria-hidden="true" /><span className="text-sm">hubi</span></motion.div>
        <motion.div className={cn("flex items-center gap-1 pr-4 sm:gap-4", !isExpanded && "pointer-events-none")}>
          {items.map((item) => <motion.a key={item.href} href={item.href} variants={itemVariants} onClick={(event) => event.stopPropagation()} className="px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">{item.label}</motion.a>)}
        </motion.div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center"><motion.div variants={collapsedIconVariants} animate={isExpanded ? "expanded" : "collapsed"}><Menu className="h-6 w-6" aria-hidden="true" /></motion.div></div>
      </motion.nav>
    </div>
    <div className="fixed inset-x-0 top-4 z-50 flex items-center justify-between px-4 md:hidden">
      <Link href="/" className="rounded-full border border-border bg-[hsl(var(--background)/.9)] px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-sm"><span className="text-brand">hubi</span> Việt Nam</Link>
      <button type="button" aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? "Đóng menu" : "Mở menu"} onClick={() => setMobileOpen(!mobileOpen)} className="rounded-full border border-border bg-[hsl(var(--background)/.9)] p-3 shadow-lg backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><Menu className="h-5 w-5" /></button>
    </div>
    {mobileOpen && <nav id="mobile-navigation" aria-label="Điều hướng di động" className="fixed inset-x-4 top-16 z-50 rounded-2xl border border-border bg-background p-3 shadow-xl md:hidden">{items.map((item) => <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted">{item.label}</Link>)}</nav>}
  </>
}
