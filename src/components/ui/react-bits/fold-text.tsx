"use client"

import { useEffect, useMemo, useRef, type CSSProperties, type ReactNode } from "react"
import gsap from "gsap"

type FoldTextProps = {
  text: string
  splitBy?: "char" | "word" | "line"
  hinge?: "top" | "bottom" | "left" | "right"
  duration?: number
  stagger?: number
  ease?: string
  perspective?: number
  creaseShading?: number
  fontSize?: string | number
  fontWeight?: string | number
  color?: string
  className?: string
  style?: CSSProperties
}

const HINGES = {
  top: { origin: "50% 0%", rotateX: -92, rotateY: 0 },
  bottom: { origin: "50% 100%", rotateX: 92, rotateY: 0 },
  left: { origin: "0% 50%", rotateX: 0, rotateY: 92 },
  right: { origin: "100% 50%", rotateX: 0, rotateY: -92 },
} as const

const clamp = (value: number) => Math.min(1, Math.max(0, value))

function whitespace(value: string, key: string): ReactNode[] {
  return value.split(/(\n)/).map((part, index) => part === "\n" ? <br key={`${key}-br-${index}`} /> : part ? <span className="fold-text-whitespace" key={`${key}-space-${index}`}>{part.replace(/ /g, "\u00a0")}</span> : null)
}

export function FoldText({ text, splitBy = "char", hinge = "top", duration = 0.65, stagger = 0.045, ease = "power3.out", perspective = 700, creaseShading = 0.55, fontSize = "inherit", fontWeight = "inherit", color = "currentColor", className = "", style }: FoldTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const hingeConfig = HINGES[hinge]
  const safePerspective = Math.max(120, perspective)
  const segments = useMemo(() => {
    const segment = (content: string, key: string) => <span className="fold-text-segment" key={key} style={{ "--fold-perspective": `${safePerspective}px` } as CSSProperties}><span className="fold-text-piece" data-fold-hinge={hinge} style={{ transformOrigin: hingeConfig.origin }}>{content || "\u00a0"}</span></span>
    if (splitBy === "line") return text.split("\n").map((line, index) => <span className="fold-text-line" key={`line-${index}`}>{segment(line, `segment-line-${index}`)}</span>)
    if (splitBy === "word") return text.split(/(\s+)/).flatMap((part, index) => /^\s+$/.test(part) ? whitespace(part, `ws-${index}`) : part ? segment(part, `segment-word-${index}`) : [])
    return Array.from(text).map((char, index) => char === "\n" ? <br key={`br-${index}`} /> : segment(char === " " ? "\u00a0" : char, `segment-char-${index}`))
  }, [hinge, hingeConfig.origin, safePerspective, splitBy, text])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const pieces = Array.from(root.querySelectorAll<HTMLElement>(".fold-text-piece"))
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const from = { opacity: 0, rotateX: hingeConfig.rotateX, rotateY: hingeConfig.rotateY, "--fold-crease": clamp(creaseShading), force3D: true }
    const to = { opacity: 1, rotateX: 0, rotateY: 0, "--fold-crease": 0, duration, stagger, ease, clearProps: "willChange" }
    if (reduceMotion) gsap.set(pieces, { opacity: 1, rotateX: 0, rotateY: 0, "--fold-crease": 0 })
    else gsap.fromTo(pieces, from, to)
    return () => gsap.killTweensOf(pieces)
  }, [creaseShading, duration, ease, hingeConfig.rotateX, hingeConfig.rotateY, stagger])

  return <span ref={rootRef} className={`fold-text ${className}`.trim()} style={{ "--fold-text-font-size": typeof fontSize === "number" ? `${fontSize}px` : fontSize, "--fold-text-font-weight": fontWeight, "--fold-text-color": color, ...style } as CSSProperties}><span className="fold-text-sr-only">{text}</span><span className="fold-text-visual" aria-hidden="true">{segments}</span></span>
}
