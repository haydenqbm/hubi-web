import Link from "next/link"
import Image from "next/image"
import type { BlogPost } from "@/types/blog"

export function BlogCard({ post }: { post: BlogPost }) {
  return <article className="group overflow-hidden rounded-[var(--radius-lg)] border border-border bg-white"><Link href={`/blog/${post.slug}`} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"><div className="relative aspect-[16/10] overflow-hidden bg-muted"><Image src={post.coverImage ?? "/hero-sequence/poster.webp"} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /></div><div className="p-5"><time dateTime={post.publishedAt} className="small uppercase tracking-[.16em] text-brand">{new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${post.publishedAt}T00:00:00`))}</time><h2 className="heading-3 mt-3">{post.title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p><span className="mt-5 inline-flex text-sm font-semibold">Đọc bài viết <span aria-hidden="true" className="ml-2 transition-transform group-hover:translate-x-1">→</span></span></div></Link></article>
}
