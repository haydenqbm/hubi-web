"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Magnet } from "@/components/ui/react-bits/magnet"

const headline = "Biến mặt nước thành trải nghiệm khó quên"

export function HeroCopy() {
  const reducedMotion = useReducedMotion()
  return <div className="relative z-10 flex h-full items-end pb-16 md:items-center md:pb-0"><div className="max-w-3xl text-white"><p className="mb-5 text-sm font-semibold uppercase tracking-[.24em] text-cyan-200">Hubi Việt Nam</p><motion.h1 initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .8, ease: [.22, 1, .36, 1] }} className="heading-1 text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,.28)]">{headline}</motion.h1><Magnet><a href="#san-pham-noi-bat" className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-xl transition-colors hover:bg-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Khám phá ngay</a></Magnet></div></div>
}
