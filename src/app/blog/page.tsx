import type { Metadata } from "next"
import { PageContainer } from "@/components/shared/page-container"
import { SectionHeading } from "@/components/shared/section-heading"
import { BlogCard } from "@/features/blog/blog-card"
import { getPosts } from "@/lib/content"

export const metadata: Metadata = { title: "Blog", description: "Câu chuyện, kiến thức và cảm hứng sống năng động cùng Hubi Việt Nam." }

export default function BlogPage() {
  return <section className="bg-[hsl(var(--surface))] py-[var(--section-space)]"><PageContainer><SectionHeading eyebrow="Từ mặt nước" title="Những câu chuyện để mang theo trong mỗi chuyến đi." description="Kiến thức nhỏ, cảm hứng lớn và những góc nhìn về một lối sống gần hơn với mặt nước." /><div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{getPosts().map((post) => <BlogCard key={post.id} post={post} />)}</div></PageContainer></section>
}
