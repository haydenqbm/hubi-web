import Link from "next/link"
import Image from "next/image"

export function HubiLogo({ inverted = false, markOnly = false }: { inverted?: boolean; markOnly?: boolean }) {
  return <Link href="/" aria-label="Hubi Việt Nam" className={`group inline-flex items-center ${markOnly ? "justify-center" : "gap-2"} ${inverted ? "text-[#F7F1E8]" : "text-[#1A585F]"}`}>
    <Image src="/logo-mark.png" alt="" width={markOnly ? 42 : 34} height={markOnly ? 28 : 22} className={markOnly ? "h-auto w-[42px] object-contain" : "h-auto w-[34px] object-contain"} priority />
    {!markOnly && <span className="font-serif text-[1.35rem] font-medium leading-none tracking-[-0.045em]">hubivietnam</span>}
  </Link>
}
