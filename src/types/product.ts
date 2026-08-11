export type ProductImage = { src: string; alt: string }
export type Product = { id: string; slug: string; name: string; code?: string; brand?: string; category?: string; description?: string; images: ProductImage[]; specs?: Record<string, string>; featured?: boolean }
