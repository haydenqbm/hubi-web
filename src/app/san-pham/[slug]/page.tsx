import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Check, Layers3, LucideIcon, Ruler, ShieldCheck, Truck, Weight } from "lucide-react"
import { PageContainer } from "@/components/shared/page-container"
import { DetailDropdown } from "@/components/ui/detail-dropdown"
import { ProductImageCarousel } from "@/features/products/product-image-carousel"
import { getProductBySlug, getProducts } from "@/lib/content"
import type { ProductPackage, ProductWarranty } from "@/types/product"

export function generateStaticParams() { return getProducts().map((product) => ({ slug: product.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = getProductBySlug((await params).slug)
  return product ? { title: product.name, description: product.description, openGraph: { title: product.name, description: product.description, images: product.images.map((image) => image.src) } } : {}
}

const specIcons: Record<string, LucideIcon> = { "Kích thước": Ruler, "Tải trọng": Weight, "Bảo hành": ShieldCheck, "Freeship": Truck, "Chất liệu": Layers3 }

function BulletList({ items }: { items: string[] }) {
  return <ul className="space-y-3">{items.map((item) => <li key={item} className="text-sm leading-6 text-[#5D6555]">{item}</li>)}</ul>
}

function WarrantyContent({ warranty }: { warranty: ProductWarranty }) {
  return <div className="grid gap-8 text-sm leading-7 text-[#5D6555] md:grid-cols-3"><div><h3 className="text-xs font-medium uppercase tracking-[.16em] text-[#07676E]">Thời hạn bảo hành</h3><p className="mt-3 font-serif text-3xl text-[#1A585F]">{warranty.duration}</p><p className="mt-3">{warranty.scope}</p></div>{warranty.instructions && <div><h3 className="text-xs font-medium uppercase tracking-[.16em] text-[#07676E]">Kiểm tra sản phẩm khi nhận hàng</h3><ul className="mt-3 list-disc space-y-2 pl-5">{warranty.instructions.map((item) => <li key={item}>{item}</li>)}</ul></div>}{warranty.exclusions && <div><h3 className="text-xs font-medium uppercase tracking-[.16em] text-[#07676E]">Không áp dụng khi</h3><ul className="mt-3 list-disc space-y-2 pl-5">{warranty.exclusions.map((item) => <li key={item}>{item}</li>)}</ul></div>}{warranty.note && <p className="border-t border-[#1A585F]/15 pt-5 md:col-span-3"><span className="font-medium text-[#1A585F]">Lưu ý:</span> {warranty.note}</p>}</div>
}

function PackageTable({ packages }: { packages: ProductPackage[] }) {
  const rows = ["Thân SUP", "Bơm tay", "Balo", "Mái chèo", "Fin / vây", "Dây leash", "Bộ sửa chữa", "Túi khô điện thoại"]
  const packageFeatures: Record<string, string[]> = {
    "Bản đầy đủ": rows,
    "Bản dịch vụ": ["Thân SUP", "Mái chèo", "Fin / vây"],
    "Bản không phụ kiện": ["Thân SUP"],
  }
  return <div className="overflow-x-auto"><table className="w-full table-fixed border-collapse text-left"><caption className="sr-only">So sánh cấu hình, giá và phụ kiện theo từng phiên bản</caption><thead><tr className="border-b border-[#1A585F]/25 text-xs uppercase leading-4 tracking-[.1em] text-[#698E93]"><th scope="col" className="w-[22%] py-2 pr-1 font-medium sm:w-40 sm:py-3 sm:pr-4"><span className="sr-only">Phụ kiện</span></th>{packages.map((item) => <th key={item.name} scope="col" className="break-words px-1 py-2 text-center font-medium sm:px-3 sm:py-3">{item.name}</th>)}</tr></thead><tbody><tr className="border-b border-[#1A585F]/15"><th scope="row" className="py-2 pr-1 text-sm font-medium text-[#5D6555] sm:py-3 sm:pr-4">Giá</th>{packages.map((item) => <td key={`${item.name}-price`} className="px-1 py-2 text-center text-sm italic text-[#B42318] sm:px-3 sm:py-3">{item.price}</td>)}</tr>{rows.map((row) => <tr key={row} className="border-b border-[#1A585F]/15 last:border-b-0"><th scope="row" className="break-words py-2 pr-1 text-sm font-medium leading-4 text-[#5D6555] sm:py-3 sm:pr-4">{row}</th>{packages.map((item) => <td key={`${item.name}-${row}`} className="px-1 py-2 text-center sm:px-3 sm:py-3">{packageFeatures[item.name]?.includes(row) && <Check className="mx-auto h-4 w-4 text-[#07676E] sm:h-5 sm:w-5" strokeWidth={1.8} aria-label={`${item.name} bao gồm ${row}`} />}</td>)}</tr>)}</tbody></table></div>
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
  const displaySpecs = { ...specs }

  return <article className="bg-[#F7F1E8] text-[#2A2C2D]">
    <div className="md:mx-auto md:grid md:max-w-7xl md:grid-cols-[minmax(0,1.35fr)_minmax(20rem,.65fr)] md:items-center">
      <ProductImageCarousel images={product.images} productName={product.name} />
      <div className="px-6 pt-10 md:px-8 md:py-12 md:pb-0">
        <header className="border-b border-[#1A585F]/20 pb-9"><h1 className="font-serif text-5xl font-medium leading-[.98] tracking-[-.04em] text-[#1A585F] md:text-6xl">{product.name}</h1>{product.material && <p className="mt-4 text-sm leading-6 text-[#5D6555] md:text-base">{product.material}</p>}{product.startingPrice && <p className="mt-5 font-serif text-2xl italic font-normal tracking-[-.02em] text-[#B42318] md:text-3xl">{product.startingPrice}</p>}</header>

        <dl className="grid grid-cols-5 gap-2 border-b border-[#1A585F]/20 py-7 sm:gap-5 md:grid-cols-2 md:gap-6 md:py-9">{Object.entries(displaySpecs).map(([key, value]) => { const Icon = specIcons[key] ?? Ruler; return <div key={key} className="min-w-0 text-center md:text-left"><Icon className="mx-auto h-5 w-5 text-[#07676E] md:mx-0 md:h-6 md:w-6" strokeWidth={1.5} /><dt className="mt-3 break-words text-[0.5rem] uppercase leading-tight tracking-[.06em] text-[#698E93] sm:text-[0.65rem] sm:tracking-[.12em]">{key}</dt><dd className="mt-1 break-words font-serif text-[0.68rem] leading-tight text-[#1A585F] sm:text-base md:text-xl">{value}</dd></div> })}</dl>
      </div>
    </div>

    <PageContainer className="pb-10 pt-0 md:pb-20">
      <div className="border-t border-[#1A585F]/20">
        <DetailDropdown title="Giới thiệu chung và mục đích sử dụng" open><p className="max-w-3xl text-base leading-8 text-[#5D6555]">{introduction}</p></DetailDropdown>
        {packages.length > 0 && <DetailDropdown title="Cấu hình gói bán"><PackageTable packages={packages} /></DetailDropdown>}
        <DetailDropdown title="Khuyến cáo sử dụng"><BulletList items={warnings} /></DetailDropdown>
        {product.warranty && <DetailDropdown title="Chính sách bảo hành"><WarrantyContent warranty={product.warranty} /></DetailDropdown>}
      </div>

      <section className="flex flex-col gap-6 border-t border-[#1A585F]/20 pt-10 md:flex-row md:items-center md:justify-between"><p className="max-w-xl font-serif text-3xl leading-tight text-[#1A585F] md:text-4xl">Sẵn sàng chọn cấu hình phù hợp với hành trình của bạn?</p><Link href={`/lien-he?san-pham=${encodeURIComponent(product.name)}`} className="inline-flex shrink-0 items-center justify-center bg-[#E0CCB3] px-6 py-4 text-sm font-medium text-[#2A2C2D] transition-colors hover:bg-[#D5BC99] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#07676E]">Liên hệ để tư vấn</Link></section>
    </PageContainer>
  </article>
}
