export type ProductImage = { src: string; alt: string }
export type ProductPackage = { name: string; description: string; includes: string[]; price?: string }
export type ProductWarranty = { duration: string; scope: string; instructions?: string[]; exclusions?: string[]; note?: string }

export type Product = {
  id: string
  slug: string
  name: string
  code?: string
  brand?: string
  category?: string
  collection?: string
  material?: string
  description?: string
  startingPrice?: string
  overview?: string
  brandNote?: string
  images: ProductImage[]
  specs?: Record<string, string>
  accessories?: string[]
  packages?: ProductPackage[]
  usage?: string[]
  warnings?: string[]
  warranty?: ProductWarranty
  shipping?: string
  featured?: boolean
}
