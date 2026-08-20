import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { PageContainer } from "@/components/shared/page-container"
import { getPosts } from "@/lib/content"
import { absoluteUrl, defaultOgImage } from "@/lib/seo"

export const metadata: Metadata = { title: "Blog", description: "Gợi ý chọn SUP, bảo quản thiết bị và cảm hứng cho những ngày trên mặt nước.", alternates: { canonical: "/blog" }, openGraph: { title: "Blog | Hubi Việt Nam", description: "Gợi ý chọn SUP, bảo quản thiết bị và cảm hứng cho những ngày trên mặt nước.", url: absoluteUrl("/blog"), images: [{ url: defaultOgImage, alt: "Trải nghiệm thể thao dưới nước cùng Hubi Việt Nam" }] } }

export default function BlogPage() {
  const posts = getPosts()
  return <main className="bg-hubi-cream text-hubi-deep-teal"><PageContainer className="py-16 md:py-24"><header className="max-w-2xl"><p className="text-xs uppercase tracking-[.2em] text-hubi-muted-teal">Hubi Việt Nam</p><h1 className="mt-4 font-serif text-5xl font-medium leading-[.96] tracking-[-.04em] sm:text-6xl">Những câu chuyện trên mặt nước.</h1><p className="mt-6 text-base leading-7 text-hubi-sage">Gợi ý thực tế và những khoảng lặng để bạn chuẩn bị tốt hơn cho hành trình tiếp theo.</p></header><div className="mt-14 grid gap-10 md:grid-cols-3">{posts.map((post) => <article key={post.slug}><Link href={`/blog/${post.slug}`} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hubi-teal"><div className="relative aspect-[4/3] overflow-hidden bg-hubi-tan/40">{post.coverImage && <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />}</div><time dateTime={post.publishedAt} className="mt-5 block text-xs uppercase tracking-[.16em] text-hubi-muted-teal">{post.publishedAt}</time><h2 className="mt-2 font-serif text-3xl leading-tight">{post.title}</h2><p className="mt-3 text-sm leading-6 text-hubi-sage">{post.excerpt}</p></Link></article>)}</div></PageContainer></main>
}
