"use client"

import type { ReactNode } from "react"
import { useEffect, useId, useRef, useState } from "react"

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

  return <section className="border-b border-[#1A585F]/20">
    <button type="button" aria-expanded={isOpen} aria-controls={contentId} onClick={() => setIsOpen((value) => !value)} className="group flex w-full items-center justify-between py-6 text-left transition-colors hover:bg-[#E0CCB3]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#07676E]">
      <span className="font-serif text-3xl text-[#1A585F] transition-colors duration-300 group-hover:text-[#07676E] md:text-4xl">{title}</span>
      <span aria-hidden="true" className={`text-3xl font-light text-[#698E93] transition-transform duration-300 group-hover:text-[#07676E] ${isOpen ? "rotate-45" : ""}`}>+</span>
    </button>
    <div id={contentId} role="region" aria-hidden={!isOpen} style={{ maxHeight: `${height}px` }} className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${isOpen ? "opacity-100" : "opacity-0"}`}>
      <div ref={contentRef} className="pb-10 md:pb-14">{children}</div>
    </div>
  </section>
}
