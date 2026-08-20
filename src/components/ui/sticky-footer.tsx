"use client"

import type React from "react"
import { motion, useReducedMotion } from "motion/react"
import { HubiLogo } from "@/components/shared/hubi-logo"
import Link from "next/link"

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & { delay?: number }

function AnimatedContainer({ delay = 0.1, children, ...props }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion()
  return <motion.div initial={false} whileInView={shouldReduceMotion ? undefined : { filter: "blur(0px)", translateY: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay, duration: 0.8 }} {...props}>{children}</motion.div>
}

type FooterLink = { title: string; href: string }
type FooterLinkGroup = { label: string; links: FooterLink[] }

export function StickyFooter({ className, ...props }: React.ComponentProps<"footer">) {
  return <footer className={`relative overflow-hidden bg-hubi-deep-teal text-hubi-cream ${className ?? ""}`} {...props}><div className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14"><div className="grid grid-cols-2 gap-8 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8"><AnimatedContainer className="col-span-2 max-w-sm space-y-4 md:col-span-1"><HubiLogo inverted /><p className="max-w-xs text-sm leading-6 text-hubi-blue-grey">Mang những trải nghiệm thể thao dưới nước chất lượng đến gần hơn với người Việt.</p><Link href="/lien-he" className="inline-flex items-center border-b border-hubi-tan pb-1 text-sm text-hubi-tan transition-colors hover:text-hubi-cream">Bắt đầu trò chuyện <span aria-hidden="true" className="ml-3">→</span></Link></AnimatedContainer>{footerLinkGroups.map((group, index) => <AnimatedContainer key={group.label} delay={0.1 + index * 0.1}><h3 className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-hubi-blue-grey">{group.label}</h3><ul className="mt-3 space-y-2 text-sm">{group.links.map((link) => <li key={link.title}><Link href={link.href} className="transition-colors hover:text-hubi-tan">{link.title}</Link></li>)}</ul></AnimatedContainer>)}</div><div className="mt-10 flex flex-col gap-2 border-t border-hubi-blue-grey/25 pt-4 text-xs text-hubi-blue-grey md:mt-12 md:flex-row md:items-center md:justify-between"><p>© {new Date().getFullYear()} Hubi Việt Nam. Bảo lưu mọi quyền.</p><p>Trải nghiệm trên mặt nước</p></div></div></footer>
}

const footerLinkGroups: FooterLinkGroup[] = [
  { label: "Khám phá", links: [{ title: "Trang chủ", href: "/" }, { title: "Sản phẩm", href: "/san-pham" }, { title: "Blog", href: "/blog" }] },
  { label: "Kết nối", links: [{ title: "Liên hệ", href: "/lien-he" }, { title: "Hubi Việt Nam", href: "/" }] },
]
