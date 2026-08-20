"use client"

import Image from "next/image"
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react"
import * as React from "react"
import type { ProductImage } from "@/types/product"

const PRODUCT_IMAGE_VERSION = "2026-08-19-v4"

export function ProductImageCarousel({ images, productName }: { images: ProductImage[]; productName: string }) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [reducedMotion, setReducedMotion] = React.useState(false)
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const pointerStart = React.useRef<number | null>(null)
  const lightboxTouchStart = React.useRef<number | null>(null)
  const dragged = React.useRef(false)
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

  React.useEffect(() => {
    if (!lightboxOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = previousOverflow }
  }, [lightboxOpen])

  const goTo = (index: number) => {
    const nextIndex = (index + safeImages.length) % safeImages.length
    setActiveIndex(nextIndex)
  }

  const move = (direction: -1 | 1) => goTo(activeIndex + direction)

  const onLightboxTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return
    lightboxTouchStart.current = event.touches[0]?.clientX ?? null
  }

  const onLightboxTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (lightboxTouchStart.current === null) return
    const distance = (event.changedTouches[0]?.clientX ?? lightboxTouchStart.current) - lightboxTouchStart.current
    lightboxTouchStart.current = null
    if (Math.abs(distance) > 48) move(distance > 0 ? -1 : 1)
  }

  return (
    <section role="region" aria-label={`${productName} — thư viện hình ảnh`} aria-roledescription="carousel" className="bg-hubi-tan/35">
      <div className="relative aspect-square w-full touch-pan-y cursor-zoom-in overflow-hidden bg-hubi-tan/30 md:h-[min(55svh,36rem)] md:aspect-auto" onClick={() => { if (!dragged.current) setLightboxOpen(true) }} onKeyDown={(event) => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); if (event.key === "Enter" || event.key === " ") setLightboxOpen(true) }} onPointerDown={(event) => { pointerStart.current = event.clientX; dragged.current = false }} onPointerUp={(event) => { if (pointerStart.current === null) return; const distance = event.clientX - pointerStart.current; if (Math.abs(distance) > 48) { dragged.current = true; move(distance > 0 ? -1 : 1) }; pointerStart.current = null }} onPointerCancel={() => { pointerStart.current = null }} role="button" tabIndex={0} aria-label={`Mở ảnh ${activeIndex + 1} ở chế độ toàn màn hình`}>
        <div className="flex h-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {safeImages.map((image) => <div key={`${image.src}-${image.alt}`} className="relative h-full min-w-full shrink-0"><Image src={image.src} alt={image.alt} fill priority={activeIndex === 0} sizes="100vw" className="select-none object-cover md:object-contain" draggable={false} /></div>)}
        </div>
        <span className="pointer-events-none absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-hubi-ink/55 text-hubi-cream md:right-6 md:top-6"><Maximize2 aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} /></span>
        {safeImages.length > 1 && <span className="absolute bottom-4 right-4 bg-hubi-deep-teal/85 px-3 py-1.5 text-xs tracking-[.16em] text-hubi-cream md:bottom-6 md:right-8" aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(safeImages.length).padStart(2, "0")}</span>}
      </div>
        {safeImages.length > 1 && <div className="mt-1 flex items-center justify-center gap-2 px-4 md:gap-4 md:px-8"><button type="button" aria-label="Ảnh trước" onClick={() => move(-1)} className="inline-flex h-11 w-11 shrink-0 items-center justify-center p-2 text-hubi-deep-teal transition-colors hover:text-hubi-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hubi-teal"><ArrowLeft className="h-6 w-6" strokeWidth={1.5} /></button><div ref={thumbnailRailRef} className="flex max-w-[13rem] gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] sm:max-w-[25rem] md:max-w-[40rem]" role="tablist" aria-label="Chọn ảnh sản phẩm">{safeImages.map((image, index) => <button ref={(element) => { thumbnailRefs.current[index] = element }} key={`thumb-${image.src}`} type="button" role="tab" aria-label={`Xem ảnh ${index + 1}`} aria-selected={activeIndex === index} aria-current={activeIndex === index ? "true" : undefined} onClick={() => goTo(index)} className={`relative z-0 h-12 w-12 shrink-0 overflow-hidden border-2 bg-hubi-cream transition-opacity sm:h-14 sm:w-14 md:h-16 md:w-16 ${activeIndex === index ? "z-10 border-2 border-hubi-teal opacity-100 ring-2 ring-inset ring-hubi-teal" : "border-transparent opacity-55 hover:opacity-100"}`}><Image src={image.src} alt="" fill sizes="64px" className="object-cover" /></button>)}</div><button type="button" aria-label="Ảnh tiếp theo" onClick={() => move(1)} className="inline-flex h-11 w-11 shrink-0 items-center justify-center p-2 text-hubi-deep-teal transition-colors hover:text-hubi-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hubi-teal"><ArrowRight className="h-6 w-6" strokeWidth={1.5} /></button></div>}
      {lightboxOpen && <div role="dialog" aria-modal="true" aria-label={`${productName} — ảnh toàn màn hình`} tabIndex={-1} onKeyDown={(event) => { if (event.key === "Escape") setLightboxOpen(false); if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1) }} className="fixed inset-0 z-[100] flex h-svh w-full items-center justify-center overflow-hidden bg-black/95 p-5 text-hubi-cream outline-none sm:p-10">
        <div className="relative h-full w-full touch-pan-y" onTouchStart={onLightboxTouchStart} onTouchEnd={onLightboxTouchEnd} onTouchCancel={() => { lightboxTouchStart.current = null }}>
          <Image src={safeImages[activeIndex].src} alt={safeImages[activeIndex].alt} fill sizes="100vw" className="object-contain p-5 sm:p-10" priority />
          <button type="button" onClick={() => setLightboxOpen(false)} aria-label="Đóng ảnh toàn màn hình" className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-hubi-cream/10 text-hubi-cream transition-colors hover:bg-hubi-cream/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hubi-cream"><X aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} /></button>
          {safeImages.length > 1 && <><button type="button" onClick={() => move(-1)} aria-label="Ảnh trước" className="absolute left-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-hubi-cream/10 text-hubi-cream transition-colors hover:bg-hubi-cream/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hubi-cream"><ArrowLeft aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} /></button><button type="button" onClick={() => move(1)} aria-label="Ảnh tiếp theo" className="absolute right-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-hubi-cream/10 text-hubi-cream transition-colors hover:bg-hubi-cream/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hubi-cream"><ArrowRight aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} /></button><span className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 bg-hubi-cream/10 px-3 py-1.5 text-xs tracking-[.16em] text-hubi-cream">{String(activeIndex + 1).padStart(2, "0")} / {String(safeImages.length).padStart(2, "0")}</span></>}
        </div>
      </div>}
    </section>
  )
}
