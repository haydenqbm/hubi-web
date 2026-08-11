import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { PageContainer } from "@/components/shared/page-container"
import { getProductBySlug, getProducts } from "@/lib/content"

export function generateStaticParams() { return getProducts().map((product) => ({ slug: product.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = getProductBySlug((await params).slug)
  return product ? { title: product.name, description: product.description, openGraph: { title: product.name, description: product.description, images: product.images.map((image) => image.src) } } : {}
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()
  return <section className="py-[var(--section-space)]"><PageContainer><Link href="/san-pham" className="small font-semibold text-brand hover:underline">← Quay lại Sản phẩm</Link><div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_.9fr] md:items-center"><div className="relative aspect-square overflow-hidden rounded-[var(--radius-xl)]"><Image src={product.images[0].src} alt={product.images[0].alt} fill sizes="(max-width: 768px) 100vw, 55vw" className="object-cover" /></div><div><p className="small uppercase tracking-[.2em] text-brand">{product.brand} · {product.category}</p><h1 className="heading-1 mt-4">{product.name}</h1><p className="body-lg mt-6 text-muted-foreground">{product.description}</p><p className="small mt-5 text-muted-foreground">Mã sản phẩm: <span className="font-semibold text-foreground">{product.code}</span></p><dl className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">{Object.entries(product.specs ?? {}).map(([key, value]) => <div key={key}><dt className="small text-muted-foreground">{key}</dt><dd className="mt-1 font-semibold">{value}</dd></div>)}</dl><Link href="/lien-he" className="mt-9 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[hsl(var(--accent-foreground))]">Trao đổi về sản phẩm</Link></div></div></PageContainer></section>
}
