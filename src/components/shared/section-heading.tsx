export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="max-w-3xl"><p className="small mb-4 uppercase tracking-[.2em] text-brand">{eyebrow}</p><h1 className="heading-1 text-balance">{title}</h1>{description && <p className="body-lg mt-6 max-w-2xl text-muted-foreground">{description}</p>}</div>
}
