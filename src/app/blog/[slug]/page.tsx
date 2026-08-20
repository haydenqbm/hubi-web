import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageContainer } from "@/components/shared/page-container"
import { getPostBySlug, getPosts } from "@/lib/content"
import { absoluteUrl } from "@/lib/seo"

export function generateStaticParams() { return getPosts().map((post) => ({ slug: post.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPostBySlug((await params).slug)
  return post ? { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { title: `${post.title} | Hubi Việt Nam`, description: post.excerpt, url: absoluteUrl(`/blog/${post.slug}`), images: post.coverImage ? [{ url: post.coverImage, alt: post.title }] : undefined } } : {}
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPostBySlug((await params).slug)
  if (!post) notFound()
  return <main className="bg-hubi-cream text-hubi-deep-teal"><PageContainer className="py-12 md:py-20"><article className="mx-auto max-w-3xl"><Link href="/blog" className="text-xs uppercase tracking-[.16em] text-hubi-muted-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hubi-teal">← Quay lại Blog</Link><h1 className="mt-8 font-serif text-5xl font-medium leading-[.96] tracking-[-.04em] sm:text-6xl">{post.title}</h1><time dateTime={post.publishedAt} className="mt-5 block text-xs uppercase tracking-[.16em] text-hubi-muted-teal">{post.publishedAt}</time>{post.coverImage && <div className="relative mt-10 aspect-[16/9] overflow-hidden bg-hubi-tan/40"><Image src={post.coverImage} alt={post.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" /></div>}<div className="mt-10 space-y-6 text-base leading-8 text-hubi-sage">{post.content.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article></PageContainer></main>
}
