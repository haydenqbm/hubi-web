"use client"

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import { frameUrl, HERO_FRAME_COUNT, HeroFrameCache, type HeroSequenceVariant } from "./hero-sequence-loader"

export type HeroSequenceHandle = { drawFrame: (index: number) => void; drawPoster: () => void; preloadAround: (index: number) => void }

type Props = { variant: HeroSequenceVariant; className?: string }

function drawCover(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const context = canvas.getContext("2d")
  if (!context) return
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
  }
  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  context.clearRect(0, 0, width, height)
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
  const drawWidth = image.naturalWidth * scale
  const drawHeight = image.naturalHeight * scale
  context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight)
}

export const HeroSequence = forwardRef<HeroSequenceHandle, Props>(function HeroSequence({ variant, className }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cacheRef = useRef<HeroFrameCache | null>(null)
  const currentFrameRef = useRef(1)

  useImperativeHandle(ref, () => ({
    drawFrame(index) {
      currentFrameRef.current = Math.min(HERO_FRAME_COUNT, Math.max(1, Math.round(index)))
      const image = cacheRef.current?.get(currentFrameRef.current)
      if (image && canvasRef.current) drawCover(canvasRef.current, image)
      else void cacheRef.current?.load(currentFrameRef.current).then((loaded) => { if (canvasRef.current && currentFrameRef.current === Math.round(index)) drawCover(canvasRef.current, loaded) }).catch(() => undefined)
    },
    drawPoster() {
      const canvas = canvasRef.current
      if (!canvas) return
      const poster = new Image()
      poster.onload = () => drawCover(canvas, poster)
      poster.src = "/hero-sequence/poster.webp"
    },
    preloadAround(index) { cacheRef.current?.preloadAround(index) },
  }), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const cache = new HeroFrameCache(variant)
    cacheRef.current = cache
    const draw = (image: HTMLImageElement) => { if (canvasRef.current) drawCover(canvasRef.current, image) }
    const resize = () => { const image = cache.get(currentFrameRef.current) ?? cache.get(1); if (image) draw(image) }
    const poster = new Image()
    poster.onload = () => draw(poster)
    poster.src = "/hero-sequence/poster.webp"
    void cache.load(1).then(draw).catch(() => undefined)
    cache.preloadAround(1, 5)
    window.addEventListener("resize", resize)
    return () => { window.removeEventListener("resize", resize); cacheRef.current = null }
  }, [variant])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
})

HeroSequence.displayName = "HeroSequence"

export { frameUrl }
