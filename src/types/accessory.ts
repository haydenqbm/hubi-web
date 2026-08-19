export type AccessoryCategory = "mái chèo" | "áo phao" | "bơm" | "khác"

export type AccessoryImage = {
  src: string
  alt: string
}

export type Accessory = {
  slug: string
  name: string
  category: AccessoryCategory
  price: string
  images: AccessoryImage[]
  description: string
}
