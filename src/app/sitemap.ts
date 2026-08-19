import type { MetadataRoute } from "next"
import { accessories } from "@/data/accessories"
import { getPosts, getProducts } from "@/lib/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hubi.vn"
  return [{ url: base, changeFrequency: "monthly", priority: 1 }, { url: `${base}/san-pham`, changeFrequency: "monthly", priority: .8 }, { url: `${base}/phu-kien`, changeFrequency: "monthly", priority: .8 }, { url: `${base}/blog`, changeFrequency: "weekly", priority: .7 }, { url: `${base}/lien-he`, changeFrequency: "yearly", priority: .6 }, ...getProducts().map((product) => ({ url: `${base}/san-pham/${product.slug}`, changeFrequency: "monthly" as const, priority: .7 })), ...accessories.map((accessory) => ({ url: `${base}/phu-kien/${accessory.slug}`, changeFrequency: "monthly" as const, priority: .7 })), ...getPosts().map((post) => ({ url: `${base}/blog/${post.slug}`, changeFrequency: "monthly" as const, priority: .6 }))]
}
