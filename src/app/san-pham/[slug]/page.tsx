import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Check, Grid3X3, Layers3, LucideIcon, Ruler, ShieldCheck, Truck, Weight } from "lucide-react"
import { PageContainer } from "@/components/shared/page-container"
import { DetailDropdown } from "@/components/ui/detail-dropdown"
import { PackageDialog } from "@/components/ui/package-dialog"
import { ProductImageCarousel } from "@/features/products/product-image-carousel"
import { getProductBySlug, getProducts } from "@/lib/content"
import type { ProductPackage, ProductWarranty } from "@/types/product"

export function generateStaticParams() { return getProducts().map((product) => ({ slug: product.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = getProductBySlug((await params).slug)
  return product ? { title: product.name, description: product.description, openGraph: { title: product.name, description: product.description, images: product.images.map((image) => image.src) } } : {}
}

const specIcons: Record<string, LucideIcon> = { "Kích thước": Ruler, "Tải trọng": Weight, "Bảo hành": ShieldCheck, "Freeship": Truck, "Chất liệu": Layers3, "Lõi": Grid3X3 }

function BulletList({ items }: { items: string[] }) {
  return <ul className="space-y-3">{items.map((item) => <li key={item} className="text-sm leading-6 text-hubi-sage">{item}</li>)}</ul>
}

function WarrantyContent({ warranty }: { warranty: ProductWarranty }) {
  return <div className="grid gap-8 text-sm leading-7 text-hubi-sage md:grid-cols-3"><div><h3 className="text-xs font-medium uppercase tracking-[.16em] text-hubi-teal">Thời hạn bảo hành</h3><p className="mt-3 font-serif text-3xl text-hubi-deep-teal">{warranty.duration}</p><p className="mt-3">{warranty.scope}</p></div>{warranty.instructions && <div><h3 className="text-xs font-medium uppercase tracking-[.16em] text-hubi-teal">Kiểm tra sản phẩm khi nhận hàng</h3><ul className="mt-3 list-disc space-y-2 pl-5">{warranty.instructions.map((item) => <li key={item}>{item}</li>)}</ul></div>}{warranty.exclusions && <div><h3 className="text-xs font-medium uppercase tracking-[.16em] text-hubi-teal">Không áp dụng khi</h3><ul className="mt-3 list-disc space-y-2 pl-5">{warranty.exclusions.map((item) => <li key={item}>{item}</li>)}</ul></div>}{warranty.note && <p className="border-t border-hubi-deep-teal/15 pt-5 md:col-span-3"><span className="font-medium text-hubi-deep-teal">Lưu ý:</span> {warranty.note}</p>}</div>
}

function PackageTable({ packages }: { packages: ProductPackage[] }) {
  const rows = ["Thân SUP", "Bơm tay", "Balo", "Mái chèo", "Fin / vây", "Dây leash", "Bộ sửa chữa", "Túi khô điện thoại", "Túi khô đựng đồ, dây đeo vai", "Ghế câu"]
  const includes = (item: ProductPackage, row: string) => {
    if (item.name === "Bản không phụ kiện") return row === "Thân SUP" && item.price !== undefined
    if (item.name === "Bản dịch vụ" && row === "Bộ sửa chữa") return false
    return item.includes.some((entry) => {
    if (row === "Thân SUP") return entry.includes("ván SUP") || entry.includes("thân ván")
    if (row === "Bơm tay") return entry === "Bơm tay"
    if (row === "Balo") return entry === "Balo"
    if (row === "Mái chèo") return entry === "Mái chèo"
    if (row === "Fin / vây") return entry.includes("vây")
    if (row === "Dây leash") return entry.toLowerCase().includes("leash")
    if (row === "Bộ sửa chữa") return entry.includes("vá") || entry.includes("sửa chữa")
    if (row === "Túi khô điện thoại") return entry.includes("Túi khô")
    if (row === "Túi khô đựng đồ, dây đeo vai") return entry.includes("Túi khô đựng đồ")
    return entry.includes("Ghế câu")
  })
  }
  return <div className="overflow-x-auto"><table className="w-full table-fixed border-collapse text-left"><caption className="sr-only">So sánh cấu hình, giá và phụ kiện theo từng phiên bản</caption><thead><tr className="border-b border-hubi-deep-teal/25 text-xs uppercase leading-4 tracking-[.1em] text-hubi-muted-teal"><th scope="col" className="w-[22%] py-2 pr-1 font-medium sm:w-40 sm:py-3 sm:pr-4"><span className="sr-only">Phụ kiện</span></th>{packages.map((item) => <th key={item.name} scope="col" className="break-words px-1 py-2 text-center font-medium sm:px-3 sm:py-3">{item.name}</th>)}</tr></thead><tbody><tr className="border-b border-hubi-deep-teal/15"><th scope="row" className="py-2 pr-1 text-sm font-medium text-hubi-sage sm:py-3 sm:pr-4">Giá</th>{packages.map((item) => <td key={`${item.name}-price`} className={`px-1 py-2 text-center text-sm italic sm:px-3 sm:py-3 ${item.price ? "text-hubi-danger" : "text-hubi-muted-teal"}`}>{item.price ?? "Không bán"}</td>)}</tr>{rows.map((row) => <tr key={row} className="border-b border-hubi-deep-teal/15 last:border-b-0"><th scope="row" className="break-words py-2 pr-1 text-sm font-medium leading-4 text-hubi-sage sm:py-3 sm:pr-4">{row}</th>{packages.map((item) => <td key={`${item.name}-${row}`} className="px-1 py-2 text-center sm:px-3 sm:py-3">{item.price && includes(item, row) && <Check className="mx-auto h-4 w-4 text-hubi-teal sm:h-5 sm:w-5" strokeWidth={1.8} aria-label={`${item.name} bao gồm ${row}`} />}</td>)}</tr>)}</tbody></table></div>
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProductBySlug((await params).slug)
  if (!product) notFound()

  const specs = product.specs ?? {}
  const overview = product.overview ?? product.description ?? ""
  const usage = product.usage ?? []
  const introduction = [overview, ...usage].join(" ")
  const warnings = product.warnings ?? []
  const packages = product.packages ?? []
  const pricedPackageCount = packages.filter((item) => item.price !== undefined).length
  const startingPriceLabel = product.startingPrice ? `${pricedPackageCount > 1 ? "Từ " : ""}${product.startingPrice}` : undefined
  const materialSpec = specs["Chất liệu"]
  const baseSpecs = Object.fromEntries(Object.entries(specs).filter(([key]) => key !== "Model" && key !== "Chất liệu"))
  const displaySpecs = materialSpec ? { ...baseSpecs, "Chất liệu": materialSpec.replace(/\s*&\s*lõi Drop-stitch/i, ""), "Lõi": /Drop-stitch/i.test(materialSpec) ? "Drop-stitch" : "—" } : baseSpecs

  return <article className="bg-hubi-cream text-hubi-charcoal">
    <div className="md:mx-auto md:grid md:max-w-7xl md:grid-cols-[minmax(0,1.35fr)_minmax(20rem,.65fr)] md:items-start">
      <ProductImageCarousel images={product.images} productName={product.name} />
      <div className="px-6 pt-10 md:sticky md:top-20 md:px-8 md:py-12 md:pb-0">
        <header className="border-b border-hubi-deep-teal/20 pb-9"><h1 className="font-serif text-5xl font-medium leading-[.98] tracking-[-.04em] text-hubi-deep-teal md:text-6xl">{product.name}</h1>{startingPriceLabel && <p className="mt-5 font-serif text-2xl italic font-normal tracking-[-.02em] text-hubi-danger md:text-3xl">{startingPriceLabel}</p>}{packages.length > 0 && <PackageDialog><PackageTable packages={packages} /></PackageDialog>}</header>

        <dl className="grid grid-cols-3 gap-x-2 gap-y-7 border-b border-hubi-deep-teal/20 py-7 sm:gap-5 md:grid-cols-2 md:gap-6 md:py-9">{Object.entries(displaySpecs).map(([key, value]) => { const Icon = specIcons[key] ?? Ruler; return <div key={key} className="min-w-0 text-center md:text-left"><Icon className="mx-auto h-7 w-7 text-hubi-teal md:mx-0 md:h-6 md:w-6" strokeWidth={1.5} /><dt className="mt-3 break-words text-[0.75rem] uppercase leading-tight tracking-[.04em] text-hubi-muted-teal sm:text-[0.75rem] sm:tracking-[.12em]">{key}</dt><dd className="mt-1 break-words font-serif text-base leading-tight text-hubi-deep-teal sm:text-base md:text-xl">{value}</dd></div> })}</dl>
      </div>
    </div>

    <PageContainer className="pb-10 pt-0 md:pb-20">
      <div>
        <DetailDropdown title="Giới thiệu chung" open><p className="max-w-3xl text-base leading-8 text-hubi-sage">{introduction}</p></DetailDropdown>
        <DetailDropdown title="Khuyến cáo sử dụng"><BulletList items={warnings} /></DetailDropdown>
        {product.warranty && <DetailDropdown title="Chính sách bảo hành"><WarrantyContent warranty={product.warranty} /></DetailDropdown>}
      </div>

      <section className="flex flex-col gap-6 border-t border-hubi-deep-teal/20 pt-10 md:flex-row md:items-center md:justify-between"><p className="max-w-xl font-serif text-3xl leading-tight text-hubi-deep-teal md:text-4xl">Sẵn sàng chọn cấu hình phù hợp với hành trình của bạn?</p><Link href={`/lien-he?san-pham=${encodeURIComponent(product.name)}`} className="inline-flex shrink-0 items-center justify-center bg-hubi-tan px-6 py-4 text-sm font-medium text-hubi-charcoal transition-colors hover:bg-hubi-tan-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hubi-teal">Liên hệ để tư vấn</Link></section>
    </PageContainer>
  </article>
}
