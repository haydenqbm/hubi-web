import { products } from "@/data/products"
import type { Product } from "@/types/product"
export function getProducts(): Product[] { return products }
export function getFeaturedProducts(): Product[] { return products.filter((product) => product.featured) }
export function getProductBySlug(slug: string): Product | undefined { return products.find((product) => product.slug === slug) }
