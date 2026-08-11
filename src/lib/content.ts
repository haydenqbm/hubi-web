import { products } from "@/data/products"
import { posts } from "@/data/posts"
import type { BlogPost } from "@/types/blog"
import type { Product } from "@/types/product"
export function getProducts(): Product[] { return products }
export function getFeaturedProducts(): Product[] { return products.filter((product) => product.featured) }
export function getProductBySlug(slug: string): Product | undefined { return products.find((product) => product.slug === slug) }
export function getPosts(): BlogPost[] { return posts }
export function getPostBySlug(slug: string): BlogPost | undefined { return posts.find((post) => post.slug === slug) }
