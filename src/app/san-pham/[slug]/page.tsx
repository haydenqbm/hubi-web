import { notFound } from "next/navigation"
import Image from "next/image"
import { PageContainer } from "@/components/shared/page-container"
import { getProductBySlug, getProducts } from "@/lib/content"

export function generateStaticParams() { return getProducts().map((product) => ({ slug: product.slug })) }

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()
  return <section className="py-[var(--section-space)]"><PageContainer><div className="grid gap-10 md:grid-cols-[1.1fr_.9fr] md:items-center"><div className="relative aspect-square overflow-hidden rounded-[var(--radius-xl)]"><Image src={product.images[0].src} alt={product.images[0].alt} fill sizes="(max-width: 768px) 100vw, 55vw" className="object-cover" /></div><div><p className="small uppercase tracking-[.2em] text-brand">{product.brand} · {product.category}</p><h1 className="heading-1 mt-4">{product.name}</h1><p className="body-lg mt-6 text-muted-foreground">{product.description}</p><dl className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">{Object.entries(product.specs ?? {}).map(([key, value]) => <div key={key}><dt className="small text-muted-foreground">{key}</dt><dd className="mt-1 font-semibold">{value}</dd></div>)}</dl></div></div></PageContainer></section>
}
