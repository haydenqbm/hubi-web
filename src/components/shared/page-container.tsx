import type { PropsWithChildren } from "react"
import { cn } from "@/lib/utils"

export function PageContainer({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("mx-auto w-full max-w-[var(--container-max)] px-[var(--page-padding)]", className)}>{children}</div>
}
