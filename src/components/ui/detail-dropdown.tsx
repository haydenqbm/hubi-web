"use client"

import type { ReactNode } from "react"
import { useEffect, useId, useRef, useState } from "react"
import { Plus } from "lucide-react"

export function DetailDropdown({ title, children, open = false }: { title: string; children: ReactNode; open?: boolean }) {
  const [isOpen, setIsOpen] = useState(open)
  const [height, setHeight] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const contentId = useId()

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    let frame = 0
    const updateHeight = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const nextHeight = isOpen ? content.scrollHeight : 0
        setHeight((currentHeight) => currentHeight === nextHeight ? currentHeight : nextHeight)
      })
    }

    updateHeight()
    const observer = typeof ResizeObserver === "function" ? new ResizeObserver(updateHeight) : null
    observer?.observe(content)
    if (!observer) window.addEventListener("resize", updateHeight)
    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      if (!observer) window.removeEventListener("resize", updateHeight)
    }
  }, [isOpen])

  return <section className="border-b border-hubi-deep-teal/20">
    <button type="button" aria-expanded={isOpen} aria-controls={contentId} onClick={() => setIsOpen((value) => !value)} className="group flex w-full items-center justify-between py-6 text-left transition-colors hover:bg-hubi-tan/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hubi-teal">
      <span className="font-serif text-3xl text-hubi-deep-teal transition-colors duration-300 group-hover:text-hubi-teal md:text-4xl">{title}</span>
      <Plus aria-hidden="true" className={`h-7 w-7 shrink-0 text-hubi-muted-teal transition-transform duration-300 group-hover:text-hubi-teal ${isOpen ? "rotate-45" : ""}`} strokeWidth={1.25} />
    </button>
    <div id={contentId} role="region" aria-hidden={!isOpen} style={{ maxHeight: `${height}px` }} className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${isOpen ? "opacity-100" : "opacity-0"}`}>
      <div ref={contentRef} className="pb-10 md:pb-14">{children}</div>
    </div>
  </section>
}
