export type HeroSequenceVariant = "desktop" | "mobile"

export const HERO_FRAME_COUNT = 339

export function frameUrl(index: number, variant: HeroSequenceVariant): string {
  const safeIndex = Math.min(HERO_FRAME_COUNT, Math.max(1, Math.round(index)))
  return `/hero-sequence/${variant}/frame-${String(safeIndex).padStart(4, "0")}.webp`
}

export class HeroFrameCache {
  private readonly images = new Map<number, HTMLImageElement>()
  private readonly pending = new Map<number, Promise<HTMLImageElement>>()

  constructor(private readonly variant: HeroSequenceVariant, private readonly frameCount = HERO_FRAME_COUNT) {}

  load(index: number): Promise<HTMLImageElement> {
    const safeIndex = Math.min(this.frameCount, Math.max(1, Math.round(index)))
    const cached = this.images.get(safeIndex)
    if (cached) return Promise.resolve(cached)
    const existing = this.pending.get(safeIndex)
    if (existing) return existing
    const request = new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image()
      image.decoding = "async"
      image.onload = () => { this.images.set(safeIndex, image); this.pending.delete(safeIndex); resolve(image) }
      image.onerror = () => { this.pending.delete(safeIndex); reject(new Error(`Unable to load hero frame ${safeIndex}`)) }
      image.src = frameUrl(safeIndex, this.variant)
    })
    this.pending.set(safeIndex, request)
    return request
  }

  preloadAround(index: number, radius = 4): void {
    const center = Math.round(index)
    for (let offset = -radius; offset <= radius; offset += 1) void this.load(center + offset).catch(() => undefined)
  }

  get(index: number): HTMLImageElement | undefined {
    return this.images.get(Math.min(this.frameCount, Math.max(1, Math.round(index))))
  }
}
