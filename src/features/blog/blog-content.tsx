export function BlogContent({ content }: { content: string }) {
  return <div className="body-lg max-w-3xl space-y-7 text-foreground/80">{content.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
}
