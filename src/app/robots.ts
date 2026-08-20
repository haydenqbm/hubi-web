import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots { return { rules: [{ userAgent: "*", allow: "/" }, { userAgent: ["GPTBot", "ClaudeBot", "Google-Extended", "PerplexityBot"], allow: "/" }], sitemap: `${siteUrl}/sitemap.xml` } }
