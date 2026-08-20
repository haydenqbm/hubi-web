"use client"

import Link from "next/link"
import { useEffect } from "react"
import { PageContainer } from "@/components/shared/page-container"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return <main className="bg-hubi-cream text-hubi-deep-teal"><PageContainer className="flex min-h-[60vh] flex-col items-start justify-center py-20"><p className="text-xs uppercase tracking-[.2em] text-hubi-muted-teal">Có sự cố</p><h1 className="mt-4 max-w-2xl font-serif text-5xl font-medium leading-[.96] tracking-[-.04em] sm:text-6xl">Dòng nước đang tạm gián đoạn.</h1><p className="mt-6 max-w-lg text-base leading-7 text-hubi-sage">Bạn có thể thử lại hoặc tiếp tục khám phá các sản phẩm của Hubi.</p><div className="mt-8 flex flex-wrap gap-3"><button type="button" onClick={reset} className="inline-flex min-h-11 items-center justify-center bg-hubi-teal px-5 py-3 text-sm font-medium text-hubi-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hubi-teal">Thử lại</button><Link href="/san-pham" className="inline-flex min-h-11 items-center justify-center border border-hubi-deep-teal/30 px-5 py-3 text-sm font-medium text-hubi-deep-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hubi-teal">Xem sản phẩm</Link></div></PageContainer></main>
}
