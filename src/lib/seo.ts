export const siteUrl = "https://hubi.vn"
export const defaultOgImage = "/images/hero/products-desktop.png"
export const siteDescription = "Khám phá thuyền, SUP và phụ kiện cho những ngày muốn đi xa hơn trên mặt nước cùng Hubi Việt Nam."

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString()
}

export function jsonLd(value: Record<string, unknown>) {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
