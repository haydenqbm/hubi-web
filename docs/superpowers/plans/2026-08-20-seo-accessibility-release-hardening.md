# SEO, Accessibility, and Release Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every public route crawlable, correctly described, accessible, resilient, and verifiable in production.

**Architecture:** Keep the current Next.js App Router and static content model. Centralize site-wide metadata/schema helpers in `src/lib/seo.ts`, add route-level metadata where content is dynamic, and add explicit error/not-found documents instead of replacing the existing pages. Use production build and browser checks as release gates.

**Tech Stack:** Next.js 16 App Router, TypeScript, `next/image`, Metadata API, JSON-LD, pnpm, ESLint, TypeScript.

**Spec:** This plan is based on the requested audit checklist in the user message; no separate spec file was supplied.

## Global Constraints

- Preserve the Hubi Việt Nam visual system, Vietnamese copy, and existing product URLs.
- Do not add a CMS, backend, analytics package, or SEO dependency for these fixes.
- Keep `https://hubi.vn` as the canonical production origin unless deployment configuration says otherwise.
- All images must use `next/image` or an intentional decorative CSS background; all meaningful images need descriptive alt text.
- Do not expose development source maps in production.
- Every route must retain a visible, semantic H1 and a useful status/error message.

## Audit Findings

| Requested item | Current evidence | Planned outcome |
|---|---|---|
| View-source empty | Cannot verify against a running server: localhost is unavailable and the sandbox blocked the socket. The homepage and both blog routes are redirects, so those URLs do not render page content themselves. | Verify production HTML with `curl`/view-source; ensure primary routes SSR meaningful HTML and remove placeholder redirects or give them real metadata/content. |
| No 404 page | Dynamic product/accessory routes call `notFound()`, but no custom `src/app/not-found.tsx` exists. | Add branded global 404 with navigation and contact/product recovery links. |
| Same page titles | Product titles are dynamic; accessories have dynamic titles but no description; blog routes redirect and lack metadata. | Give every index/detail route unique title and description; preserve the title template. |
| No meta description | Root and most active routes have descriptions, but blog redirects and accessory detail metadata are incomplete. | Add complete route metadata, including descriptions and keywords only if useful. |
| No `og:image` | Root `openGraph` has no image; product detail has images; other routes do not. | Add a default branded OG image and route-specific product/accessory images. |
| No structured data | No `application/ld+json` or schema helper found. | Add Organization/WebSite on site-wide pages, BreadcrumbList on detail pages, and Product/Offer on product detail pages. |
| Multiple/no H1 | Active product/accessory pages each have one H1; `/` and blog routes only redirect and therefore have no page H1. | Ensure each rendered page has exactly one H1; convert placeholder routes into real pages or intentional redirects with documented behavior. |
| No canonical tag | `metadataBase` exists, but no explicit `alternates.canonical` was found. | Add canonical URLs for indexes and dynamic slugs. |
| No `llms.txt` | No `llms.txt` exists. | Add `public/llms.txt` with concise site purpose, primary routes, product/contact guidance, and crawl-safe canonical links. |
| AI blocked in `robots.txt` | `src/app/robots.ts` currently allows `*` and does not state an AI policy. | Decide and document policy; default plan is allow public content and explicitly avoid accidental blocking while listing sitemap. |
| No favicon | `src/app/favicon.ico` exists. | Verify it is emitted at `/favicon.ico`; add touch/icon metadata only if browser testing shows a gap. |
| No `sitemap.xml` | `src/app/sitemap.ts` exists and includes products, accessories, and posts, but blog routes currently redirect. | Keep the generated sitemap only for routes that render valid content; add `lastModified` when content supports it. |
| No `lang` attribution | `<html lang="vi">` already exists. | Keep it and add an automated assertion so it cannot regress. |
| Missing alt text | Most `Image` components have alt text; thumbnails intentionally use `alt=""`. Static audit must inspect every image and decorative image separately. | Fix meaningful omissions, retain empty alt only for redundant thumbnail imagery, and add tests/checks. |
| Source maps | `.next/dev` contains development maps; production exposure is unverified because build could not run. | Verify production output and configure source-map exposure only if production artifacts contain maps; never treat dev `.next` as a release artifact. |
| Console errors | No `console.*` calls were found in source; browser runtime could not be started in this environment. | Run browser smoke checks and fail the release on console errors, failed image requests, or hydration errors. |
| Massive JS bundle | `framer-motion`, `motion`, and `gsap` are all dependencies; bundle size is unmeasured. | Measure production client chunks, remove unused animation dependency/imports, and lazy-load only client-heavy interactive components where measurement justifies it. |
| Broken links | Product/accessory internal links are data-driven; blog links route to redirect placeholders. Link integrity is not automatically tested. | Add route/link checks against generated slugs and browser/crawler checks for 2xx/3xx/4xx results. |
| Clickable logo | `HubiLogo` already wraps the mark in a link to `/`. | Preserve and add an accessible-name/link smoke assertion. |
| Success/error message | Contact page is informational and has no form state; route errors have no custom UI. | Add branded `not-found`/`error` states and only add form success/error messaging if a form is introduced. |
| Browser icon as logo | `HubiLogo` uses `/images/brand/logo-mark.png`; favicon is separate. | Verify header/footer markup uses the Hubi asset, not `public/logo.png` or browser/Next placeholder assets; remove unused placeholder assets after reference audit. |

## File Map

- Create: `src/lib/seo.ts` — canonical URL, shared descriptions, OG image, JSON-LD helpers, and safe text normalization.
- Modify: `src/app/layout.tsx` — complete default metadata, default OG image, icons, and site-wide schema.
- Modify: `src/app/page.tsx` — replace or document the root redirect so the canonical homepage has stable metadata and rendered H1 behavior.
- Modify: `src/app/san-pham/page.tsx` — route metadata, canonical, OG image, and collection schema.
- Modify: `src/app/san-pham/[slug]/page.tsx` — complete dynamic metadata, canonical, Product/BreadcrumbList JSON-LD, and stable detail-page H1.
- Modify: `src/app/phu-kien/page.tsx` — canonical/OG metadata and collection schema.
- Modify: `src/app/phu-kien/[slug]/page.tsx` — dynamic description, canonical, OG image, and BreadcrumbList/Product-like schema as applicable.
- Create or modify: `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx` — either implement the already-advertised blog routes from `src/data/posts.ts` or remove them from navigation/sitemap until implemented; do not leave silent redirects.
- Create: `src/app/not-found.tsx` — branded 404 page with one H1, recovery links, and accessible status copy.
- Create: `src/app/error.tsx` — client error boundary with retry and contact/product recovery action.
- Create: `public/llms.txt` — concise machine-readable site guide.
- Modify: `src/app/robots.ts` — explicit crawler policy and generated sitemap URL.
- Modify: `src/app/sitemap.ts` — include only live canonical routes and optional `lastModified` values.
- Modify: `next.config.ts` — production source-map and image configuration only if verification proves a required change.
- Create: `scripts/check-public-routes.mjs` or an equivalent existing test location — static route, H1, metadata, alt, and internal-link assertions.
- Modify: `package.json` — add one check command only if the repository has no suitable existing test command.

## Implementation Tasks

### Task 1: Establish route truth and metadata contracts

**Files:**
- Create: `src/lib/seo.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: all route page files listed in the File Map

**Interfaces:**
- `absoluteUrl(path: string): string` returns a URL under `https://hubi.vn`.
- `siteMetadata` exposes the default title, description, and OG image path.
- `buildJsonLd(value: Record<string, unknown>): { __html: string }` serializes JSON-LD without unsafe HTML characters.

- [ ] Inventory every route from `src/app`, `src/lib/content.ts`, and `src/app/sitemap.ts` and decide whether it is live, redirected, or intentionally removed.
- [ ] Add explicit `alternates.canonical` to each live page metadata object.
- [ ] Add a default OG image in `layout.tsx` and route-specific image arrays for product/accessory details.
- [ ] Add route-specific descriptions to accessory details and every live index/detail page.
- [ ] Make the root URL a deliberate canonical experience: either render the product landing page at `/` or use a permanent redirect and exclude `/` from duplicate rendered-page checks.
- [ ] Add a metadata test that asserts unique titles, non-empty descriptions, canonical URLs, and OG images for every live route.

### Task 2: Add structured data and crawler-facing documents

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/san-pham/page.tsx`
- Modify: `src/app/san-pham/[slug]/page.tsx`
- Modify: `src/app/phu-kien/page.tsx`
- Modify: `src/app/phu-kien/[slug]/page.tsx`
- Modify: `src/app/robots.ts`
- Modify: `src/app/sitemap.ts`
- Create: `public/llms.txt`

- [ ] Add Organization and WebSite JSON-LD once in the root layout.
- [ ] Add BreadcrumbList JSON-LD to each product/accessory detail route using the actual slug and display name.
- [ ] Add Product JSON-LD only where product price/image/name data is present; omit invalid or invented offers.
- [ ] Validate emitted JSON-LD with a JSON parser and schema-compatible field checks.
- [ ] Keep robots open for public content, explicitly state `Sitemap: https://hubi.vn/sitemap.xml`, and avoid adding AI disallows unless the owner explicitly chooses that policy.
- [ ] Add `public/llms.txt` describing the public site, canonical route groups, product/contact intent, and the fact that prices are reference/contact-led where applicable.
- [ ] Ensure sitemap entries map to pages that return 200, not placeholder redirects.

### Task 3: Complete error, accessibility, and image semantics

**Files:**
- Create: `src/app/not-found.tsx`
- Create: `src/app/error.tsx`
- Modify: all page and shared component files containing images, links, buttons, and headings
- Create: `scripts/check-public-routes.mjs`

- [ ] Add a single-H1 branded 404 page with links to `/san-pham`, `/phu-kien`, and `/lien-he`.
- [ ] Add an error boundary with `reset()`, a clear Vietnamese error message, and a recovery link; do not expose stack traces.
- [ ] Audit every `<Image>`: meaningful product/category/hero images get descriptive alt text, decorative duplicates stay `alt=""`, and no raw `<img>` remains.
- [ ] Ensure each clickable logo has an accessible name and points to `/`.
- [ ] Replace any footer `<a href>` internal navigation with Next `Link` where appropriate, then verify target routes.
- [ ] Add static assertions for exactly one H1 on every live rendered route, `<html lang="vi">`, favicon presence, and no internal links to missing slugs.

### Task 4: Verify source output, runtime errors, links, and bundle size

**Files:**
- Modify: `package.json` only if a check script is needed.
- Modify: `next.config.ts` only if production source-map inspection identifies an actual leak.

- [ ] Run `pnpm lint`, `tsc --noEmit`, and `pnpm build` with a writable pnpm store and no network dependency.
- [ ] Start the production server and fetch `/`, `/san-pham`, one product detail, `/phu-kien`, one accessory detail, `/lien-he`, `/404-test`, `/sitemap.xml`, `/robots.txt`, `/llms.txt`, and `/favicon.ico`.
- [ ] Assert page responses, rendered HTML, title, description, canonical, OG image, lang, H1 count, JSON-LD, and image alt attributes.
- [ ] Run a browser smoke pass at mobile and desktop widths: inspect console errors, hydration warnings, failed requests, keyboard focus, logo navigation, carousel controls, and 404 recovery.
- [ ] Record client JS chunk sizes and identify the largest route contributors; remove an animation dependency only when unused or replace broad imports with targeted imports.
- [ ] Confirm production output does not expose source maps; treat `.next/dev` maps as local development artifacts, not release evidence.
- [ ] Run `git diff --check`, ESLint, TypeScript, the route checker, and the production smoke suite as the final gate.

### Task 5: Remove only verified dead assets and redirects

**Files:**
- Modify: `public/` only after reference checks.
- Modify: blog route files and `src/components/layout/site-footer.tsx` if blog is intentionally removed.

- [ ] Search all source, metadata, sitemap, and CSS references before deleting placeholder assets such as `public/logo.png`, `public/next.svg`, `public/vercel.svg`, `public/globe.svg`, `public/file.svg`, and `public/window.svg`.
- [ ] Choose one consistent outcome for blog: implement the listed blog data/routes, or remove blog navigation, sitemap entries, and redirect files together.
- [ ] Re-run the route checker and production build after cleanup so deletion cannot create broken links or missing image requests.

## Release Acceptance Checklist

- [ ] Every live route has a unique title, useful description, canonical URL, OG image, exactly one H1, and Vietnamese `lang`.
- [ ] Product detail pages emit valid Product and BreadcrumbList JSON-LD; the site emits Organization/WebSite JSON-LD.
- [ ] `/404-test` renders the custom 404; runtime failures render the custom error UI.
- [ ] `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/favicon.ico` return successful responses.
- [ ] No broken internal links, missing meaningful alt text, hydration errors, console errors, or failed image requests appear in the smoke pass.
- [ ] Production source maps are absent or intentionally protected, and client bundle sizes are recorded with no unexplained regression.

## Self-Review

- Coverage: every requested item is mapped in the audit table and at least one implementation or verification task.
- Scope: existing `lang`, favicon, `notFound()`, sitemap, robots, metadata, logo link, and alt-text work are preserved rather than redundantly rebuilt.
- Ambiguity: “AI blocked robots.txt” is treated as a policy decision; the current implementation does not block AI crawlers, so the plan keeps public content open unless the owner says otherwise.
- Verification limitation: build/lint could not be completed in the current sandbox because Corepack could not access the pnpm registry/cache; this is explicitly a release-task check, not silently marked passed.
