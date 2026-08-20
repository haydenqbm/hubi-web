"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { X } from "lucide-react"

export function PackageDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return <>
    <button type="button" onClick={() => setOpen(true)} className="mt-5 inline-flex items-center border-b border-hubi-teal pb-1 text-sm font-medium text-hubi-teal transition-colors hover:border-hubi-deep-teal hover:text-hubi-deep-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hubi-teal">Cấu hình gói bán</button>
    <dialog ref={dialogRef} onClose={() => setOpen(false)} className="m-auto max-h-[88svh] w-[calc(100%-2rem)] max-w-5xl overflow-hidden bg-hubi-cream p-0 text-hubi-charcoal shadow-[0_24px_80px_rgb(var(--hubi-ink-rgb)/.28)] backdrop:bg-hubi-ink/60">
      <div className="flex max-h-[88svh] flex-col">
        <header className="flex shrink-0 items-center justify-between border-b border-hubi-deep-teal/20 px-5 py-4 sm:px-7 sm:py-5"><h2 className="font-serif text-2xl text-hubi-deep-teal sm:text-3xl">Cấu hình gói bán</h2><button type="button" onClick={() => dialogRef.current?.close()} aria-label="Đóng cấu hình gói bán" className="inline-flex h-10 w-10 items-center justify-center rounded-full text-hubi-deep-teal transition-colors hover:bg-hubi-tan/40 hover:text-hubi-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hubi-teal"><X aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} /></button></header>
        <div className="overflow-auto px-5 py-5 sm:px-7 sm:py-7">{children}</div>
      </div>
    </dialog>
  </>
}
