import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/types/product"

export function ProductCard({ product }: { product: Product }) {
  return <article className="group overflow-hidden rounded-[var(--radius-lg)] border border-border bg-[hsl(var(--surface-elevated))] transition-transform duration-[var(--duration-normal)] hover:-translate-y-1"><Link href={`/san-pham/${product.slug}`} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"><div className="relative aspect-[4/3] overflow-hidden bg-muted"><Image src={product.images[0].src} alt={product.images[0].alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /></div><div className="p-5"><p className="small uppercase tracking-[.16em] text-brand">{product.brand} · {product.category}</p><h2 className="heading-3 mt-3">{product.name}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{product.description}</p><span className="mt-5 inline-flex text-sm font-semibold text-foreground">Xem chi tiết <span aria-hidden="true" className="ml-2 transition-transform group-hover:translate-x-1">→</span></span></div></Link></article>
}
