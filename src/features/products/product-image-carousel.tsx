"use client"

import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import * as React from "react"
import type { ProductImage } from "@/types/product"

const PRODUCT_IMAGE_VERSION = "2026-08-19-v4"

export function ProductImageCarousel({ images, productName }: { images: ProductImage[]; productName: string }) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [reducedMotion, setReducedMotion] = React.useState(false)
  const pointerStart = React.useRef<number | null>(null)
  const thumbnailRailRef = React.useRef<HTMLDivElement | null>(null)
  const thumbnailRefs = React.useRef<Array<HTMLButtonElement | null>>([])
  const safeImages = (images.length > 0 ? images : [{ src: "/images/products/tidetrek-storm-x.jpg", alt: productName }]).map((image) => ({ ...image, src: `${image.src}?v=${PRODUCT_IMAGE_VERSION}` }))

  React.useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches)
    updateMotionPreference()
    if ("addEventListener" in mediaQuery) {
      mediaQuery.addEventListener("change", updateMotionPreference)
      return () => mediaQuery.removeEventListener("change", updateMotionPreference)
    }
    const legacyMediaQuery = mediaQuery as MediaQueryList & { addListener: (listener: () => void) => void; removeListener: (listener: () => void) => void }
    legacyMediaQuery.addListener(updateMotionPreference)
    return () => legacyMediaQuery.removeListener(updateMotionPreference)
  }, [])

  React.useLayoutEffect(() => {
    const rail = thumbnailRailRef.current
    const thumbnail = thumbnailRefs.current[activeIndex]
    if (!rail || !thumbnail) return
    const railBounds = rail.getBoundingClientRect()
    const thumbnailBounds = thumbnail.getBoundingClientRect()
    const edgePadding = 2
    let nextScrollLeft = rail.scrollLeft
    if (thumbnailBounds.left < railBounds.left + edgePadding) nextScrollLeft += thumbnailBounds.left - railBounds.left - edgePadding
    if (thumbnailBounds.right > railBounds.right - edgePadding) nextScrollLeft += thumbnailBounds.right - railBounds.right + edgePadding
    rail.scrollTo({ left: Math.max(0, nextScrollLeft), behavior: reducedMotion ? "auto" : "smooth" })
  }, [activeIndex, reducedMotion])

  const goTo = (index: number) => {
    const nextIndex = (index + safeImages.length) % safeImages.length
    setActiveIndex(nextIndex)
  }

  const move = (direction: -1 | 1) => goTo(activeIndex + direction)

  return (
    <section role="region" aria-label={`${productName} — thư viện hình ảnh`} aria-roledescription="carousel" className="bg-[#E0CCB3]/35">
      <div className="relative aspect-square w-full touch-pan-y overflow-hidden bg-[#E0CCB3]/30 md:h-[min(55svh,36rem)] md:aspect-auto" onKeyDown={(event) => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1) }} onPointerDown={(event) => { pointerStart.current = event.clientX }} onPointerUp={(event) => { if (pointerStart.current === null) return; const distance = event.clientX - pointerStart.current; if (Math.abs(distance) > 48) move(distance > 0 ? -1 : 1); pointerStart.current = null }} onPointerCancel={() => { pointerStart.current = null }} tabIndex={0}>
        <div className="flex h-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {safeImages.map((image) => <div key={`${image.src}-${image.alt}`} className="relative h-full min-w-full shrink-0"><Image src={image.src} alt={image.alt} fill priority={activeIndex === 0} sizes="100vw" className="select-none object-cover md:object-contain" draggable={false} /></div>)}
        </div>
        {safeImages.length > 1 && <span className="absolute bottom-4 right-4 bg-[#1A585F]/85 px-3 py-1.5 text-xs tracking-[.16em] text-[#F7F1E8] md:bottom-6 md:right-8" aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(safeImages.length).padStart(2, "0")}</span>}
      </div>
      {safeImages.length > 1 && <div className="mt-1 flex items-center justify-center gap-2 px-4 md:gap-4 md:px-8"><button type="button" aria-label="Ảnh trước" onClick={() => move(-1)} className="inline-flex shrink-0 items-center justify-center p-2 text-[#1A585F] transition-colors hover:text-[#07676E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07676E]"><ArrowLeft className="h-6 w-6" strokeWidth={1.5} /></button><div ref={thumbnailRailRef} className="flex max-w-[13rem] gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] sm:max-w-[25rem] md:max-w-[40rem]" role="tablist" aria-label="Chọn ảnh sản phẩm">{safeImages.map((image, index) => <button ref={(element) => { thumbnailRefs.current[index] = element }} key={`thumb-${image.src}`} type="button" role="tab" aria-label={`Xem ảnh ${index + 1}`} aria-selected={activeIndex === index} aria-current={activeIndex === index ? "true" : undefined} onClick={() => goTo(index)} className={`relative z-0 h-12 w-12 shrink-0 overflow-hidden border-2 bg-[#F7F1E8] transition-opacity sm:h-14 sm:w-14 md:h-16 md:w-16 ${activeIndex === index ? "z-10 border-2 border-[#07676E] opacity-100 ring-2 ring-inset ring-[#07676E]" : "border-transparent opacity-55 hover:opacity-100"}`}><Image src={image.src} alt="" fill sizes="64px" className="object-cover" /></button>)}</div><button type="button" aria-label="Ảnh tiếp theo" onClick={() => move(1)} className="inline-flex shrink-0 items-center justify-center p-2 text-[#1A585F] transition-colors hover:text-[#07676E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07676E]"><ArrowRight className="h-6 w-6" strokeWidth={1.5} /></button></div>}
    </section>
  )
}
