"use client"

import { motion } from "framer-motion"
import type { PropsWithChildren } from "react"

export function StickyFooter({ children }: PropsWithChildren) {
  return <motion.footer initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }} className="bg-foreground text-white">{children}</motion.footer>
}
