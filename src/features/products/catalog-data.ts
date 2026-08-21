import { getAccessories, getAccessoryCategories, getProducts } from "@/lib/content"
import type { Accessory } from "@/types/accessory"
import type { Product } from "@/types/product"

const accessories = getAccessories()
const accessoryCategories = getAccessoryCategories()
const products = getProducts()

export type CatalogProduct = { name: string; price: string; image: string; href: string }
export type BrandSection = { brand: string; products: CatalogProduct[] }
export type Category = { label: string; intro: string; brands: BrandSection[] }
export type CategoryCardData = { label: string; title: string; description: string; image: string }

const PRODUCT_IMAGE_VERSION = "2026-08-19-v4"
const categoryOrder = ["SUP", "THUYỀN CÂU", "XE ĐẠP NƯỚC", "PHỤ KIỆN"]
const categoryIntros: Record<string, string> = {
  SUP: "Những thiết kế cân bằng cho những ngày muốn đi xa hơn trên mặt nước.",
  "THUYỀN CÂU": "Không gian ổn định cho những buổi đi xa và những khoảnh khắc thật yên.",
  "XE ĐẠP NƯỚC": "Một cách mới để khám phá mặt nước cùng gia đình và bạn bè.",
  "PHỤ KIỆN": "Những chi tiết hoàn thiện trải nghiệm trên mặt nước.",
}

function toCatalogProduct(product: Product): CatalogProduct {
  return { name: product.name, price: product.startingPrice ?? "Liên hệ", image: `${product.images[0].src}?v=${PRODUCT_IMAGE_VERSION}`, href: `/san-pham/${product.slug}` }
}

function toAccessoryCatalogProduct(accessory: Accessory): CatalogProduct {
  return { name: accessory.name, price: accessory.price, image: `${accessory.images[0].src}?v=${PRODUCT_IMAGE_VERSION}`, href: `/phu-kien/${accessory.slug}` }
}

export const categories: Category[] = categoryOrder.map((label) => {
  const grouped = new Map<string, CatalogProduct[]>()
  products.filter((product) => (product.categories ?? [product.category]).includes(label)).forEach((product) => {
    const brand = product.brand ?? "Hãng khác"
    const list = grouped.get(brand) ?? []
    list.push(toCatalogProduct(product))
    grouped.set(brand, list)
  })
  const brands = [...grouped.entries()].map(([brand, items]) => ({ brand, products: items }))
  if (label === "PHỤ KIỆN") {
    accessoryCategories.forEach(({ key, label: accessoryLabel }) => {
      const items = accessories.filter((accessory) => accessory.category === key).map(toAccessoryCatalogProduct)
      if (items.length > 0) brands.push({ brand: accessoryLabel, products: items })
    })
  }
  return { label, intro: categoryIntros[label], brands }
})

export const categoryCards: readonly CategoryCardData[] = [
  { label: "SUP", title: "SUP", description: "Cân bằng, linh hoạt và sẵn sàng lên đường.", image: "/images/categories/sup.png" },
  { label: "THUYỀN CÂU", title: "Thuyền câu", description: "Không gian ổn định cho những buổi đi xa.", image: "/images/categories/thuyen-cau.png" },
  { label: "XE ĐẠP NƯỚC", title: "Xe đạp nước", description: "Một cách mới để khám phá mặt nước.", image: "/images/categories/xe-dap-nuoc.png" },
  { label: "PHỤ KIỆN", title: "Phụ kiện", description: "Những chi tiết hoàn thiện trải nghiệm trên mặt nước.", image: "/images/categories/phu-kien.png" },
]
