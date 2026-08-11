"use client"

import type React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & { delay?: number }

function AnimatedContainer({ delay = 0.1, children, ...props }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion()
  if (shouldReduceMotion) return <>{children}</>
  return <motion.div initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }} whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay, duration: 0.8 }} {...props}>{children}</motion.div>
}

type FooterLink = { title: string; href: string }
type FooterLinkGroup = { label: string; links: FooterLink[] }

export function StickyFooter({ className, ...props }: React.ComponentProps<"footer">) {
  return <footer className={cn("relative h-[720px] w-full", className)} style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }} {...props}><div className="fixed bottom-0 h-[720px] w-full"><div className="sticky top-[calc(100vh-720px)] h-full overflow-y-auto"><div className="relative flex size-full flex-col justify-between gap-5 border-t border-border px-4 py-8 md:px-12"><div aria-hidden="true" className="absolute inset-0 isolate z-0 overflow-hidden"><div className="absolute left-0 top-0 h-[80rem] w-[35rem] -translate-y-[21.875rem] -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsl(var(--foreground)/.06)_0,hsl(var(--foreground)/.02)_50%,hsl(var(--foreground)/.01)_80%)]" /><div className="absolute left-0 top-0 h-[80rem] w-[15rem] -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--foreground)/.04)_0,hsl(var(--foreground)/.01)_80%,transparent_100%)] [translate:5%_-50%]" /></div><div className="relative z-10 mt-10 flex flex-col gap-8 md:flex-row xl:mt-0"><AnimatedContainer className="w-full max-w-sm space-y-4"><p className="text-2xl font-bold tracking-[-.04em]"><span className="text-brand">hubi</span> Việt Nam</p><p className="mt-8 text-sm text-muted-foreground md:mt-0">Mang những trải nghiệm thể thao dưới nước chất lượng đến gần hơn với người Việt.</p></AnimatedContainer>{footerLinkGroups.map((group, index) => <AnimatedContainer key={group.label} delay={0.1 + index * 0.1} className="w-full"><div className="mb-10 md:mb-0"><h3 className="text-sm uppercase">{group.label}</h3><ul className="mt-4 space-y-2 text-sm text-muted-foreground">{group.links.map((link) => <li key={link.title}><a href={link.href} className="inline-flex items-center transition-all duration-300 hover:text-foreground">{link.title}</a></li>)}</ul></div></AnimatedContainer>)}</div><div className="relative z-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-2 text-sm text-muted-foreground md:flex-row"><p>© {new Date().getFullYear()} Hubi Việt Nam. Bảo lưu mọi quyền.</p><p>Trải nghiệm trên mặt nước</p></div></div></div></div></footer>
}

const footerLinkGroups: FooterLinkGroup[] = [
  { label: "Khám phá", links: [{ title: "Trang chủ", href: "/" }, { title: "Sản phẩm", href: "/san-pham" }, { title: "Blog", href: "/blog" }] },
  { label: "Kết nối", links: [{ title: "Liên hệ", href: "/lien-he" }, { title: "Hubi Việt Nam", href: "/" }] },
]
