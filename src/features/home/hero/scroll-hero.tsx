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
        "(min-width: 768px)": () => ScrollTrigger.create({ trigger: root, start: "top top", end: "+=1900", pin: true, scrub: true, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: (self) => { const frame = Math.round(self.progress * (HERO_FRAME_COUNT - 1)) + 1; sequenceRef.current?.drawFrame(frame); sequenceRef.current?.preloadAround(frame) } }),
        "(max-width: 767px)": () => ScrollTrigger.create({ trigger: root, start: "top bottom", end: "bottom top", scrub: true, onUpdate: (self) => sequenceRef.current?.drawFrame(Math.round(self.progress * (HERO_FRAME_COUNT - 1)) + 1) }),
      })
    }, root)
    return () => context.revert()
  }, [])

  return <section ref={rootRef} className="relative isolate min-h-screen overflow-hidden bg-slate-950" aria-label="Giới thiệu Hubi Việt Nam"><HeroSequence ref={sequenceRef} variant={variant} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,20,28,.72),rgba(2,20,28,.2)_65%,rgba(2,20,28,.08))]" /><PageContainer className="relative h-screen"><HeroCopy /></PageContainer></section>
}
