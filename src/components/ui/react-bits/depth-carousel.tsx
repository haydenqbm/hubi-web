"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import * as React from "react"
import gsap from "gsap"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "./depth-carousel.css"

export type DepthCarouselItem = { content: ReactNode; alt?: string }

type Props = {
  items: DepthCarouselItem[]
  cardWidth?: number
  cardHeight?: number
  depth?: number
  spread?: number
  tilt?: number
  perspective?: number
  visibleCards?: number
  falloff?: number
  blur?: number
  duration?: number
  loop?: boolean
  showControls?: boolean
  showIndicators?: boolean
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export function DepthCarousel({ items, cardWidth = 360, cardHeight = 500, depth = 160, spread = 52, tilt = 18, perspective = 1400, visibleCards = 3, falloff = 0.2, blur = 0, duration = 700, loop = true, showControls = true, showIndicators = true }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const positionRef = useRef(0)
  const focusRef = useRef(0)
  const dragRef = useRef<{ x: number; start: number; moved: boolean; id: number } | null>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const reducedMotionRef = useRef(false)
  const [active, setActive] = useState(0)
  const data = useMemo(() => items.filter(Boolean), [items])

  const layout = useCallback((position: number) => {
    const root = rootRef.current
    if (!root || data.length === 0) return
    const scale = root.clientWidth < 768 ? 1 : clamp(root.clientWidth / (cardWidth + spread * 2 + 48), 0.88, 1)
    data.forEach((_, index) => {
      const card = cardRefs.current[index]
      if (!card) return
      let distance = index - position
      if (loop && data.length > 1) {
        distance = ((distance % data.length) + data.length) % data.length
        if (distance > data.length / 2) distance -= data.length
      }
      const behind = Math.max(0, distance)
      const visible = Math.abs(distance) <= visibleCards + 0.5
      const opacity = visible ? (distance < 0 ? Math.max(0, 1 + distance) : 1) : 0
      card.style.transform = `translate(-50%, -50%) scale(${scale}) translateX(${spread * distance}px) translateZ(${-depth * distance}px) rotateY(${tilt * clamp(distance, 0, 1)}deg)`
      card.style.opacity = String(opacity)
      card.style.filter = distance === 0 ? "none" : `brightness(${Math.max(0.2, 1 - behind * falloff)}) blur(${Math.min(blur, behind * blur / Math.max(1, visibleCards))}px)`
      card.style.zIndex = String(2000 - Math.round(distance * 20))
      card.style.pointerEvents = visible && opacity > 0.05 ? "auto" : "none"
    })
  }, [blur, cardWidth, data, depth, falloff, loop, spread, tilt, visibleCards])

  const goTo = useCallback((rawIndex: number, animate = true) => {
    if (!data.length) return
    const next = loop ? ((rawIndex % data.length) + data.length) % data.length : clamp(rawIndex, 0, data.length - 1)
    const delta = loop && data.length > 1 ? ((next - positionRef.current + data.length / 2) % data.length) - data.length / 2 : next - positionRef.current
    tweenRef.current?.kill()
    const proxy = { position: positionRef.current }
    tweenRef.current = gsap.to(proxy, { position: positionRef.current + delta, duration: animate && !reducedMotionRef.current ? duration / 1000 : 0, ease: "power3.out", onUpdate: () => { positionRef.current = proxy.position; layout(proxy.position) }, onComplete: () => { positionRef.current = next; layout(next) } })
    focusRef.current = next
    setActive(next)
  }, [data.length, duration, layout, loop])

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    layout(0)
    const resize = () => layout(positionRef.current)
    window.addEventListener("resize", resize)
    return () => { window.removeEventListener("resize", resize); tweenRef.current?.kill() }
  }, [layout])

  const onPointerDown = (event: React.PointerEvent) => { if (data.length > 1) dragRef.current = { x: event.clientX, start: positionRef.current, moved: false, id: event.pointerId } }
  const onPointerMove = (event: React.PointerEvent) => { const drag = dragRef.current; if (!drag) return; const distance = event.clientX - drag.x; if (Math.abs(distance) > 6) drag.moved = true; if (drag.moved) { rootRef.current?.setPointerCapture(drag.id); positionRef.current = drag.start - distance / Math.max(cardWidth * 0.55, 40); layout(positionRef.current) } }
  const onPointerUp = () => { const drag = dragRef.current; dragRef.current = null; if (drag?.moved) goTo(Math.round(positionRef.current)) }

  return <div ref={rootRef} className="depth-carousel" style={{ "--dc-perspective": `${perspective}px` } as React.CSSProperties} role="region" aria-roledescription="carousel" aria-label="Sản phẩm" tabIndex={0} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); goTo(focusRef.current - 1) } if (event.key === "ArrowRight") { event.preventDefault(); goTo(focusRef.current + 1) } if (event.key === "Home") { event.preventDefault(); goTo(0) } if (event.key === "End") { event.preventDefault(); goTo(data.length - 1) } }}>
    <div className="depth-carousel__stage">{data.map((item, index) => <div key={index} ref={(element) => { cardRefs.current[index] = element }} className="depth-carousel__card" style={{ width: cardWidth, height: cardHeight }} role="group" aria-label={`${item.alt ?? "Sản phẩm"}, ${index + 1} / ${data.length}`} aria-current={active === index ? "true" : undefined} onClick={() => { if (!dragRef.current?.moved) goTo(index) }}>{item.content}</div>)}</div>
    {showControls && data.length > 1 && <><button type="button" className="depth-carousel__arrow depth-carousel__arrow--prev" aria-label="Sản phẩm trước" onClick={() => goTo(active - 1)}><ChevronLeft aria-hidden="true" /></button><button type="button" className="depth-carousel__arrow depth-carousel__arrow--next" aria-label="Sản phẩm tiếp theo" onClick={() => goTo(active + 1)}><ChevronRight aria-hidden="true" /></button></>}
    {showIndicators && data.length > 1 && <div className="depth-carousel__dots" role="tablist" aria-label="Chọn sản phẩm">{data.map((_, index) => <button key={index} type="button" role="tab" aria-label={`Xem sản phẩm ${index + 1}`} aria-selected={active === index} className={`depth-carousel__dot${active === index ? " is-active" : ""}`} onClick={() => goTo(index)} />)}</div>}
  </div>
}
