import { ProductCard } from "./product-card"
import type { Product } from "@/types/product"

export function ProductGrid({ products }: { products: Product[] }) {
  return <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
}
