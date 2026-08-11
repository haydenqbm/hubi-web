"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"
import type { Product } from "@/types/product"

export function AccordionGallery({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0)
  return <div className="flex min-h-[36rem] flex-col gap-3 md:flex-row">{products.map((product, index) => { const isActive = active === index; return <motion.article key={product.id} layout onClick={() => setActive(index)} className={`relative min-h-24 cursor-pointer overflow-hidden rounded-[var(--radius-lg)] border border-border bg-muted md:min-h-0 ${isActive ? "md:flex-[3]" : "md:flex-1"}`} transition={{ layout: { duration: .45, ease: [.22, 1, .36, 1] } }}><Image src={product.images[0].src} alt={product.images[0].alt} fill sizes="(max-width: 768px) 100vw, 50vw" className={`object-cover transition-transform duration-700 ${isActive ? "scale-100" : "scale-110"}`} /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" /><div className={`absolute inset-x-0 bottom-0 p-5 text-white ${isActive ? "opacity-100" : "opacity-90"}`}><p className="mb-2 text-xs uppercase tracking-[.18em] text-cyan-200">{product.category}</p><h3 className="text-xl font-semibold tracking-[-.03em]">{product.name}</h3>{isActive && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex items-center justify-between gap-4"><p className="max-w-md text-sm leading-6 text-white/75">{product.description}</p><Link href={`/san-pham/${product.slug}`} onClick={(event) => event.stopPropagation()} className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-semibold text-foreground hover:bg-cyan-100">Xem sản phẩm</Link></motion.div>}</div></motion.article>})}</div>
}
