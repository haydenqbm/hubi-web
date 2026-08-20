import { products } from "@/data/products"
import { posts } from "@/data/posts"
import { accessories, accessoryCategories, getAccessoryBySlug as findAccessoryBySlug } from "@/data/accessories"
import type { BlogPost } from "@/types/blog"
import type { Product } from "@/types/product"
import type { Accessory, AccessoryCategory } from "@/types/accessory"

type AccessoryCategoryOption = { key: AccessoryCategory; label: string }
export function getProducts(): Product[] { return products }
export function getProductBySlug(slug: string): Product | undefined { return products.find((product) => product.slug === slug) }
export function getPosts(): BlogPost[] { return posts }
export function getPostBySlug(slug: string): BlogPost | undefined { return posts.find((post) => post.slug === slug) }
export function getAccessories(): Accessory[] { return accessories }
export function getAccessoryCategories(): AccessoryCategoryOption[] { return accessoryCategories }
export function getAccessoryBySlug(slug: string): Accessory | undefined { return findAccessoryBySlug(slug) }
