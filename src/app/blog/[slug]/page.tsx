import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageContainer } from "@/components/shared/page-container"
import { BlogContent } from "@/features/blog/blog-content"
import { getPostBySlug, getPosts } from "@/lib/content"

export function generateStaticParams() { return getPosts().map((post) => ({ slug: post.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPostBySlug((await params).slug)
  return post ? { title: post.title, description: post.excerpt, openGraph: { title: post.title, description: post.excerpt, type: "article" } } : {}
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPostBySlug((await params).slug)
  if (!post) notFound()
  return <article className="py-[var(--section-space)]"><PageContainer><div className="mx-auto max-w-4xl"><Link href="/blog" className="small font-semibold text-brand hover:underline">← Quay lại Blog</Link><p className="small mt-12 uppercase tracking-[.2em] text-brand">{new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${post.publishedAt}T00:00:00`))}</p><h1 className="heading-1 mt-4 max-w-4xl">{post.title}</h1><p className="body-lg mt-6 max-w-2xl text-muted-foreground">{post.excerpt}</p><div className="relative mt-12 aspect-[16/8] overflow-hidden rounded-[var(--radius-xl)]"><Image src={post.coverImage ?? "/hero-sequence/poster.webp"} alt="" fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" /></div><div className="mt-14"><BlogContent content={post.content} /></div></div></PageContainer></article>
}
