"use client"

import type { PropsWithChildren } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function Magnet({ children }: PropsWithChildren) {
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 })
  return <motion.div onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - rect.left - rect.width / 2) * .15); y.set((event.clientY - rect.top - rect.height / 2) * .15) }} onPointerLeave={() => { x.set(0); y.set(0) }} style={{ x, y }}>{children}</motion.div>
}
