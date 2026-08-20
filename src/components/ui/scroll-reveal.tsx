"use client"

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react"

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  delay?: number
  distance?: number
}

export function ScrollReveal({ children, delay = 0, distance = 22, ...props }: ScrollRevealProps) {
  const reducedMotion = useReducedMotion()

  return <motion.div initial={reducedMotion ? false : { opacity: 0, y: distance, filter: "blur(6px)" }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.18 }} transition={reducedMotion ? undefined : { delay, duration: 0.72, ease: [0.16, 1, 0.3, 1] }} {...props}>{children}</motion.div>
}
