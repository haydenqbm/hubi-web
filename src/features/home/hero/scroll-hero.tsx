"use client"

import { useEffect, useRef, useState } from "react"
import { PageContainer } from "@/components/shared/page-container"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { HeroCopy } from "./hero-copy"
import { HeroSequence, type HeroSequenceHandle } from "./hero-sequence"
import { HERO_FRAME_COUNT } from "./hero-sequence-loader"

export function ScrollHero() {
  const rootRef = useRef<HTMLElement>(null)
  const sequenceRef = useRef<HeroSequenceHandle>(null)
  const [variant, setVariant] = useState<"desktop" | "mobile">("desktop")

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)")
    const update = () => setVariant(media.matches ? "mobile" : "desktop")
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    gsap.registerPlugin(ScrollTrigger)
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const context = gsap.context(() => {
      sequenceRef.current?.drawPoster()
      if (reducedMotion) return
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => ScrollTrigger.create({ trigger: root, start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true, onUpdate: (self) => { const frame = Math.round(self.progress * (HERO_FRAME_COUNT - 1)) + 1; sequenceRef.current?.drawFrame(frame); sequenceRef.current?.preloadAround(frame) } }),
        "(max-width: 767px)": () => ScrollTrigger.create({ trigger: root, start: "top bottom", end: "bottom top", scrub: true, onUpdate: (self) => sequenceRef.current?.drawFrame(Math.round(self.progress * (HERO_FRAME_COUNT - 1)) + 1) }),
      })
    }, root)
    return () => context.revert()
  }, [])

  return <section ref={rootRef} data-hero className="relative isolate h-[200vh] overflow-hidden bg-slate-950" aria-label="Giới thiệu Hubi Việt Nam"><div className="sticky top-0 h-screen overflow-hidden"><HeroSequence ref={sequenceRef} variant={variant} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-x-0 bottom-0 top-16 bg-[linear-gradient(90deg,rgba(0,0,0,.65),rgba(0,0,0,.18)_65%,rgba(0,0,0,.04))]" /><PageContainer className="relative h-screen"><HeroCopy /></PageContainer></div></section>
}
