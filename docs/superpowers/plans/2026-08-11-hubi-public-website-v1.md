# Hubi Việt Nam Public Website V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan in large coherent batches. Do not split the three batches into separate review gates unless a true blocker or risky foundational failure appears.

**Goal:** Build the first production-ready Vietnamese Hubi Việt Nam showcase website with a reusable global shell, a scroll-driven image-sequence hero, a curated product showcase, and static Product/Blog/Contact pages.

**Architecture:** Next.js App Router with TypeScript and Tailwind CSS. UI is composition-first: shadcn primitives, the user-selected 21st.dev navigation and sticky footer, and React Bits free components for expressive text/CTA/showcase effects. Content is typed local data in V1 behind a thin access boundary so a later Hubi App API can replace the source without rewriting page UI. Scroll choreography is native browser scrolling coordinated by GSAP ScrollTrigger; the hero sequence renders imperatively to Canvas.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui, 21st.dev, React Bits Free, GSAP + ScrollTrigger, Motion/Framer Motion as required by imported components, Lucide React, Sharp for build-time hero asset derivatives, Vitest/React Testing Library for targeted component behavior if scaffolded, Playwright for V1 browser verification.

## Global Constraints

- Website language: Vietnamese only in V1.
- Primary navigation: `Trang chủ`, `Sản phẩm`, `Blog`, `Liên hệ`.
- Homepage is the main landing page.
- Showcase only: no cart, checkout, authentication, database, CMS, admin, payment, customer account, or ecommerce order workflow.
- Framework: Next.js App Router + TypeScript + Tailwind CSS.
- UI source priority: shadcn/ui → user-selected 21st.dev components → React Bits free → adapted wrapper → custom implementation only when required.
- Header base: 21st.dev `larsen66/navigation-menu`.
- Footer base: 21st.dev `sshahaider/sticky-footer`; remove the demo Lenis integration because V1 uses native browser scrolling.
- Expressive landing-page text/CTA should prefer React Bits free components.
- Scroll choreography: GSAP + ScrollTrigger.
- Hero renderer: HTML Canvas + supplied 339-frame 1920×1080 JPEG image sequence.
- Hero message: `Biến mặt nước thành trải nghiệm khó quên`.
- Hero CTA: `Khám phá ngay`; action scrolls to the featured product showcase on the same page.
- Smooth scrolling engine: native browser scrolling in V1; do not add Lenis unless visual testing later proves a clear need.
- Data: typed local static content now; thin data-access boundary for future Hubi App Product API.
- Typography default: Be Vietnam Pro, loaded centrally via Next.js font handling.
- All reusable colors, typography, spacing, radii, surfaces, widths, and motion values must flow through global semantic tokens.
- Desktop is implemented/polished first, while component APIs and CSS must preserve a responsive mobile path from the beginning.
- Mobile is equal product priority and receives a baseline in every batch; final polish occurs in Batch 3.
- Hosting target: Vercel Pro, but core architecture remains compatible with normal Next.js Node deployment.
- YAGNI: do not create generic `services`, `repositories`, `domain`, `store`, or `hooks` directories without a real consumer.
- Verification style: large checkpoint verification only. Do not run full build/test after every small edit. A focused early check is allowed only for a blocker, third-party integration mismatch, or hero asset/performance risk.
- No placeholder sections in shipping UI. If content for an optional homepage section has not been decided, omit the section instead of shipping filler.

---

## Planned File Map

```text
hubi-web-public/
├── public/
│   ├── images/
│   │   ├── products/
│   │   └── blog/
│   └── hero-sequence/
│       ├── desktop/
│       ├── mobile/
│       └── poster.webp
├── scripts/
│   └── optimize-hero-sequence.mjs
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   ├── [slug]/page.tsx
│   │   │   └── page.tsx
│   │   ├── lien-he/page.tsx
│   │   ├── san-pham/
│   │   │   ├── [slug]/page.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── site-footer.tsx
│   │   │   └── site-header.tsx
│   │   ├── shared/
│   │   │   ├── page-container.tsx
│   │   │   └── section-heading.tsx
│   │   └── ui/
│   │       ├── navigation-menu.tsx
│   │       ├── sticky-footer.tsx
│   │       └── react-bits/*
│   ├── data/
│   │   ├── posts.ts
│   │   └── products.ts
│   ├── features/
│   │   ├── blog/
│   │   │   ├── blog-card.tsx
│   │   │   └── blog-content.tsx
│   │   ├── contact/
│   │   │   └── contact-page-content.tsx
│   │   ├── home/
│   │   │   ├── hero/
│   │   │   │   ├── hero-copy.tsx
│   │   │   │   ├── hero-sequence.tsx
│   │   │   │   ├── hero-sequence-loader.ts
│   │   │   │   └── scroll-hero.tsx
│   │   │   └── product-showcase/
│   │   │       └── featured-products.tsx
│   │   └── products/
│   │       ├── product-card.tsx
│   │       ├── product-detail.tsx
│   │       └── product-grid.tsx
│   ├── lib/
│   │   ├── content.ts
│   │   ├── gsap.ts
│   │   └── utils.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── tokens.css
│   │   └── typography.css
│   └── types/
│       ├── blog.ts
│       └── product.ts
├── tests/
│   └── e2e/
│       └── public-site.spec.ts
├── docs/
│   ├── ACTIVE.md
│   └── superpowers/
│       ├── specs/2026-08-11-hubi-public-website-design.md
│       └── plans/2026-08-11-hubi-public-website-v1.md
├── AGENTS.md
├── components.json
├── next.config.ts
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

### Key Interfaces

`src/types/product.ts`

```ts
export type ProductImage = {
  src: string
  alt: string
}

export type Product = {
  id: string
  slug: string
  name: string
  code?: string
  brand?: string
  category?: string
  description?: string
  images: ProductImage[]
  specs?: Record<string, string>
  featured?: boolean
}
```

`src/types/blog.ts`

```ts
export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt?: string
  coverImage?: string
  publishedAt: string
  content: string
}
```

`src/lib/content.ts`

```ts
import type { BlogPost } from "@/types/blog"
import type { Product } from "@/types/product"

export function getProducts(): Product[]
export function getFeaturedProducts(): Product[]
export function getProductBySlug(slug: string): Product | undefined
export function getPosts(): BlogPost[]
export function getPostBySlug(slug: string): BlogPost | undefined
```

The UI consumes these functions rather than importing the raw arrays directly. When Hubi App API integration arrives, this is the first boundary to replace/refactor.

---

# Batch 1: Project Foundation + Global Shell

**Deliverable:** A runnable Next.js website with routes, design tokens, typography, concise agent rules/docs, and the selected 21st.dev header/footer adapted into a clean responsive global shell. No hero or product showcase yet.

**Files:** all root config files, `src/app/layout.tsx`, route placeholders that contain real minimal page headings, `src/styles/*`, `src/components/layout/*`, selected `src/components/ui/*`, `AGENTS.md`, `docs/ACTIVE.md`.

- [ ] **Step 1: Create the repository and Next.js scaffold in one pass**

Use the local project directory:

```bash
mkdir -p /home/quang/projects/hubi-web-public
cd /home/quang/projects/hubi-web-public
pnpm dlx create-next-app@latest . \
  --ts \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-pnpm
```

Do not create a monorepo. Do not add backend packages.

- [ ] **Step 2: Initialize shadcn and install only the dependencies needed by Batch 1**

```bash
pnpm dlx shadcn@latest init
pnpm add motion framer-motion lucide-react
npx @21st-dev/cli@beta add larsen66/navigation-menu
```

For the user-selected Sticky Footer, pull the component from its 21st.dev registry/code surface and place it at `src/components/ui/sticky-footer.tsx`. Do **not** copy the demo's `@studio-freight/lenis` usage into the application. The component may keep its own Motion animation dependency.

- [ ] **Step 3: Create the global style/token system before adapting component visuals**

Create `src/styles/tokens.css` with semantic custom properties for:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 20% 10%;
  --surface: 210 20% 98%;
  --surface-elevated: 0 0% 100%;
  --brand: 196 78% 35%;
  --brand-foreground: 0 0% 100%;
  --accent: 194 72% 92%;
  --accent-foreground: 196 80% 22%;
  --muted: 210 18% 95%;
  --muted-foreground: 215 14% 42%;
  --border: 214 18% 88%;

  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1.25rem;
  --radius-xl: 2rem;

  --container-max: 90rem;
  --page-padding: clamp(1rem, 3vw, 3rem);
  --section-space: clamp(5rem, 9vw, 9rem);

  --duration-fast: 160ms;
  --duration-normal: 320ms;
  --ease-standard: cubic-bezier(.22, 1, .36, 1);
}
```

These are the initial visual values, not a permanent brand lock. Future visual customization should modify tokens rather than scattered component literals.

Create `src/styles/typography.css` with reusable semantic utility classes for `.display-xl`, `.heading-1`, `.heading-2`, `.heading-3`, `.body-lg`, `.body`, `.small`, using fluid `clamp()` sizes. Load Be Vietnam Pro in `src/app/layout.tsx` through `next/font/google` and expose it as a CSS variable.

Import `tokens.css` and `typography.css` from `globals.css`.

- [ ] **Step 4: Build the four-route shell and shared container primitives**

Create real route files for:

```text
/
/san-pham
/blog
/lien-he
```

At this batch, non-home routes may contain only their real Vietnamese page heading and one short descriptive sentence. They are not fake skeleton cards.

Create:

```tsx
// src/components/shared/page-container.tsx
export function PageContainer({ children, className }: React.PropsWithChildren<{ className?: string }>)
```

Use the global `--container-max` and `--page-padding` variables.

- [ ] **Step 5: Adapt the selected 21st.dev header as `SiteHeader`**

`src/components/ui/navigation-menu.tsx` remains vendor-like/adapted component code.

`src/components/layout/site-header.tsx` owns Hubi-specific navigation data:

```ts
const NAV_ITEMS = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/san-pham" },
  { label: "Blog", href: "/blog" },
  { label: "Liên hệ", href: "/lien-he" },
] as const
```

Requirements:
- Hubi branding at left.
- Preserve the component's recognizable animated navigation behavior where compatible with the site.
- Convert all demo colors/spacing that matter to semantic tokens/classes.
- Active/focus/keyboard behavior remains usable.
- Desktop receives full visual polish.
- Mobile receives a functional menu boundary; do not defer functionality itself to later.

- [ ] **Step 6: Adapt the selected Sticky Footer as `SiteFooter`**

Keep `src/components/ui/sticky-footer.tsx` presentation-oriented.

Create `src/components/layout/site-footer.tsx` to supply Hubi content:
- Hubi Việt Nam name/brand.
- Navigation to the same four routes.
- Short showcase-oriented brand sentence.
- Copyright with current year generated at render time.

Explicitly remove demo-level Lenis initialization and any demo-only content. Keep the sticky/animated footer behavior only if it works correctly with native browser scroll.

- [ ] **Step 7: Wire the global layout**

`src/app/layout.tsx` must render:

```tsx
<body>
  <SiteHeader />
  <main>{children}</main>
  <SiteFooter />
</body>
```

Add baseline metadata:

```ts
export const metadata = {
  title: {
    default: "Hubi Việt Nam",
    template: "%s | Hubi Việt Nam",
  },
  description: "Thiết bị thể thao nước và sản phẩm SUP từ Hubi Việt Nam.",
}
```

- [ ] **Step 8: Add lean coordinator/executor documentation**

Create `AGENTS.md` containing only durable rules:
- Read `docs/ACTIVE.md` and the active Superpowers plan before editing.
- YAGNI and reuse-first.
- No backend/ecommerce scope in V1.
- Preserve global semantic tokens.
- Desktop first, responsive boundaries always.
- React Bits preferred for expressive text/CTA.
- GSAP reserved for scroll choreography.
- Large coherent batches; no full verification after every tiny change.
- Update `docs/ACTIVE.md` at checkpoint completion or blocker only.

Create `docs/ACTIVE.md` with:
- current milestone = Batch 1
- approved design spec path
- active implementation plan path
- current scope and exclusions
- next checkpoint = Batch 1 verification
- blockers = none

- [ ] **Step 9: Batch 1 checkpoint verification**

Run once after the coherent Batch 1 implementation:

```bash
pnpm lint
pnpm build
```

Then perform one desktop browser smoke check covering:
- `/`
- `/san-pham`
- `/blog`
- `/lien-he`
- header navigation
- keyboard focus
- footer behavior
- one narrow viewport sanity check to confirm mobile navigation is functional

Fix findings as part of the same batch, rerun only the checks affected by fixes, then update `docs/ACTIVE.md` to Batch 2.

- [ ] **Step 10: Commit Batch 1 as one coherent checkpoint**

```bash
git add .
git commit -m "feat(web): establish public site foundation"
```

---

# Batch 2: Scroll Hero + Featured Product Showcase

**Deliverable:** Homepage has the supplied 339-frame scroll hero, real DOM animated headline/CTA using React Bits free components, graceful reduced-motion/failure behavior, and a curated React Bits Accordion Gallery fed by typed product data.

**Files:** `scripts/optimize-hero-sequence.mjs`, `public/hero-sequence/*`, `src/features/home/hero/*`, `src/components/ui/react-bits/*`, `src/types/product.ts`, `src/data/products.ts`, `src/lib/content.ts`, `src/features/home/product-showcase/featured-products.tsx`, `src/app/page.tsx`.

- [ ] **Step 1: Add Batch 2 dependencies and React Bits source components in one dependency pass**

```bash
pnpm add gsap sharp
```

Pull free **TypeScript + Tailwind** React Bits variants into `src/components/ui/react-bits/` for:
- Accordion Gallery
- one hero text effect selected from Split Text / Blur Text after checking actual frame readability
- Magnet for CTA interaction
- optionally Star Border only if it improves the CTA without reducing legibility

Do not add several competing hero text components “just in case”. Keep only the selected implementation plus Accordion Gallery and CTA pieces actually used.

- [ ] **Step 2: Prepare the supplied source sequence into runtime derivatives**

The source archive contains 339 1920×1080 JPEG frames. Build `scripts/optimize-hero-sequence.mjs` using `sharp` so the source sequence can produce deterministic web derivatives.

Required output naming:

```text
public/hero-sequence/desktop/frame-0001.webp ... frame-0339.webp
public/hero-sequence/mobile/frame-0001.webp ... frame-0339.webp
public/hero-sequence/poster.webp
```

Initial derivative targets:
- Desktop: max width 1600, WebP quality 76.
- Mobile: max width 900, WebP quality 68.
- Poster: first visually stable frame at desktop width, WebP quality 80.

The script must preserve aspect ratio and be safe to rerun. The original supplied archive remains source material, not runtime public content.

Add package script:

```json
"hero:optimize": "node scripts/optimize-hero-sequence.mjs"
```

- [ ] **Step 3: Build the imperative frame loader**

`src/features/home/hero/hero-sequence-loader.ts` should expose:

```ts
export type HeroSequenceVariant = "desktop" | "mobile"

export function frameUrl(index: number, variant: HeroSequenceVariant): string

export class HeroFrameCache {
  constructor(variant: HeroSequenceVariant, frameCount?: number)
  load(index: number): Promise<HTMLImageElement>
  preloadAround(index: number, radius?: number): void
  get(index: number): HTMLImageElement | undefined
}
```

Behavior:
- Clamp frame index to valid bounds.
- Load frame 1 immediately.
- Preload a small initial window, then `preloadAround` the current frame as scroll moves.
- Avoid making all 339 frames part of the critical first-paint promise.
- Cache loaded images in-memory for the active session.
- Rejections are contained so a missing intermediate frame does not crash the hero.

- [ ] **Step 4: Build the Canvas renderer without React re-rendering on every scroll frame**

`src/features/home/hero/hero-sequence.tsx` is a client component.

Responsibilities:
- size canvas against container and device pixel ratio
- use `object-fit: cover` equivalent crop math while drawing
- expose an imperative frame-draw callback/ref to the parent scroll controller
- render `poster.webp` or first loaded frame before ScrollTrigger is ready
- clean resize listeners on unmount

The component must not store every frame change in React state.

- [ ] **Step 5: Centralize GSAP registration**

`src/lib/gsap.ts`:

```ts
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export { gsap, ScrollTrigger }
```

Register ScrollTrigger only in client-safe execution. Do not initialize a global smooth-scroll engine.

- [ ] **Step 6: Build the pinned `ScrollHero` choreography**

`src/features/home/hero/scroll-hero.tsx`:
- client component
- contains the canvas layer and DOM copy layer
- creates one GSAP context scoped to the hero
- desktop uses a long pinned scrub range
- progress maps deterministically to frame `1..339`
- each update draws the closest available frame and queues nearby preload
- cleanup kills the scoped ScrollTrigger/GSAP context

Use responsive matchMedia logic rather than a hard-coded desktop-only assumption.

For `prefers-reduced-motion: reduce`:
- no long pinned scrub
- show poster/static frame
- copy and CTA remain visible and usable

If sequence loading fails:
- show poster/static background
- do not hide copy or CTA

- [ ] **Step 7: Implement the real hero copy and CTA with React Bits**

`src/features/home/hero/hero-copy.tsx` owns only copy/CTA composition.

Headline text is exactly:

```text
Biến mặt nước thành trải nghiệm khó quên
```

CTA text:

```text
Khám phá ngay
```

Rules:
- Render semantic `h1` DOM text.
- React Bits effect may split/reveal text but must preserve accessible readable content.
- Use the selected free Split Text or Blur Text treatment based on actual frame contrast.
- CTA uses Magnet and may use Star Border only if visually coherent.
- CTA points to `#san-pham-noi-bat`.
- Keep animation selective. Do not animate every supporting word independently.

- [ ] **Step 8: Create typed static product content and thin access boundary**

Create `src/types/product.ts` using the Product/ProductImage interface in this plan.

Create `src/data/products.ts` with a small curated real Hubi V1 set. Initial recommended showcase set:
- HB by SKATINGER KOI 350
- PIC NEBULA 350
- GQ representative 335 model
- TIDETREK SUMMER 335

Each item must have a stable slug, image alt text, useful description, specs, and explicit `featured` flag. Use only product assets actually available in the repository; do not invent image files.

Create `src/lib/content.ts` product functions:

```ts
export function getProducts(): Product[]
export function getFeaturedProducts(): Product[]
export function getProductBySlug(slug: string): Product | undefined
```

- [ ] **Step 9: Adapt React Bits Accordion Gallery into `FeaturedProducts`**

`src/features/home/product-showcase/featured-products.tsx`:
- section id `san-pham-noi-bat`
- consumes `getFeaturedProducts()`
- adapts Product data into the Accordion Gallery input shape at the feature boundary
- shows product name plus a concise descriptor in the active panel
- links active product to `/san-pham/[slug]`
- preserves component visual character rather than redesigning its internals from scratch
- uses global typography/color tokens for Hubi copy

- [ ] **Step 10: Compose homepage hero → showcase**

`src/app/page.tsx` should be server-first where possible:

```tsx
<>
  <ScrollHero />
  <FeaturedProducts />
</>
```

Do not predetermine additional homepage sections in this batch. The first visual checkpoint exists specifically so later sections can be chosen based on the actual hero/showcase rhythm.

- [ ] **Step 11: Batch 2 checkpoint verification**

Run the hero optimization once, then verify at the end of the complete batch:

```bash
pnpm hero:optimize
pnpm lint
pnpm build
```

Desktop browser checks:
- hero starts from poster/frame without blank flash
- scroll maps forward and backward through sequence
- pinned section releases correctly
- no obvious canvas stretch/crop bug
- headline remains readable over representative early/middle/late frames
- CTA scrolls to `#san-pham-noi-bat`
- Accordion Gallery interaction works
- product link routing works
- footer still behaves correctly after long pinned scroll

Performance sanity check:
- initial navigation does not wait for all 339 frames
- below-fold gallery assets are not forced into the critical path
- frame loading does not create obvious request storms beyond the intended progressive loading behavior

Reduced-motion check:
- emulate `prefers-reduced-motion`
- hero remains useful without long pin/scrub

Narrow viewport sanity check:
- no horizontal overflow
- hero uses the mobile derivative path
- navigation remains functional

Fix findings within Batch 2; rerun only impacted checks plus final build. Update `docs/ACTIVE.md` to Batch 3.

- [ ] **Step 12: Commit Batch 2 as one coherent checkpoint**

```bash
git add .
git commit -m "feat(web): add scroll hero and product showcase"
```

---

# Batch 3: Product + Blog + Contact + Responsive/SEO V1 Closure

**Deliverable:** All four site sections are real, static content routes are pre-renderable, product/blog detail pages work, metadata is meaningful, desktop and mobile are polished, and the site passes one final V1 verification checkpoint.

**Files:** product/blog/contact feature files, static blog data, dynamic route pages, metadata helpers if needed, Playwright config/spec, final `docs/ACTIVE.md`.

- [ ] **Step 1: Build Product listing and Product detail using the existing Product contract**

`src/features/products/product-card.tsx`:
- product image
- name
- brand/category where available
- link to detail

`src/features/products/product-grid.tsx`:
- consumes `Product[]`
- responsive grid
- no filters/search in V1

`src/app/san-pham/page.tsx`:
- page metadata
- Vietnamese heading/copy
- `getProducts()` → `ProductGrid`

`src/features/products/product-detail.tsx`:
- visual gallery from `images`
- name/code/brand/category
- description
- specs as semantic definition/list UI
- inquiry CTA linking to `/lien-he`
- no price/cart assumptions unless static product content explicitly contains them later

`src/app/san-pham/[slug]/page.tsx`:
- `generateStaticParams()` from product slugs
- `generateMetadata()` from the product
- `notFound()` for invalid slug

- [ ] **Step 2: Build typed static Blog content and Blog routes**

Create `src/types/blog.ts` with the BlogPost interface in this plan.

Create `src/data/posts.ts` with at least three concise Vietnamese showcase/knowledge articles using real text, not lorem ipsum. Suggested V1 topics:
- Cách chọn SUP phù hợp cho người mới
- Chuẩn bị gì trước một buổi chèo SUP
- Gợi ý SUP cho resort, villa và đơn vị dịch vụ

Create/update `src/lib/content.ts`:

```ts
export function getPosts(): BlogPost[]
export function getPostBySlug(slug: string): BlogPost | undefined
```

Build:
- `src/features/blog/blog-card.tsx`
- `src/features/blog/blog-content.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`

Blog detail requirements:
- unique metadata
- stable readable typography
- `generateStaticParams()`
- `notFound()` invalid slug
- no CMS/MDX pipeline in V1 unless real content length makes plain typed content demonstrably painful

- [ ] **Step 3: Build Contact page without creating a backend form**

`src/features/contact/contact-page-content.tsx` and `src/app/lien-he/page.tsx`.

Show only real company/contact channels available to the project. Use direct link actions (`tel:`, `mailto:`, social/profile links) where known. If a channel is not provided, omit it rather than inventing information.

No API route, database, form submission service, captcha, CRM integration, or lead storage in V1.

- [ ] **Step 4: Complete site-wide metadata and crawlable structure**

Ensure:
- root metadata title/description
- unique Product detail title/description
- unique Blog detail title/description
- semantic H1 per route
- alt text on meaningful product/blog imagery
- essential copy remains DOM text

Do not add advanced schema/multilingual SEO tooling in V1.

- [ ] **Step 5: Final responsive/mobile polish pass**

Treat desktop and mobile as equal shipping targets now that desktop visual direction exists.

Check/fix:
- header mobile behavior
- hero crop and scroll distance
- hero text scale/position/contrast
- CTA touch target
- Accordion Gallery mobile interaction
- product grid and detail gallery
- blog typography/line length
- contact layout
- footer stacking/sticky behavior
- no horizontal page overflow

Preserve the story and visual hierarchy on mobile; do not mechanically shrink desktop values.

- [ ] **Step 6: Add one compact Playwright V1 acceptance suite**

Create `tests/e2e/public-site.spec.ts` with one desktop and one mobile project covering the highest-value behavior:

```ts
import { expect, test } from "@playwright/test"

test("public showcase navigation and routes work", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Biến mặt nước thành trải nghiệm khó quên",
  )

  await page.getByRole("link", { name: "Sản phẩm" }).first().click()
  await expect(page).toHaveURL(/\/san-pham$/)

  await page.getByRole("link", { name: "Blog" }).first().click()
  await expect(page).toHaveURL(/\/blog$/)

  await page.getByRole("link", { name: "Liên hệ" }).first().click()
  await expect(page).toHaveURL(/\/lien-he$/)
})
```

Add targeted cases for:
- one product detail route
- one blog detail route
- CTA target on homepage
- no horizontal overflow at mobile viewport

Do not attempt pixel-perfect animation tests.

- [ ] **Step 7: Final V1 checkpoint verification**

Run once after Batch 3 implementation:

```bash
pnpm lint
pnpm build
pnpm exec playwright test
```

Perform a final manual visual pass on desktop and mobile for the four routes plus one product detail and one blog detail.

Check console for runtime errors/warnings during hero interaction.

Fix any V1-blocking issues, rerun the impacted checks and final build, then update `docs/ACTIVE.md` with:
- V1 implementation state
- commits/checkpoint evidence
- any intentionally deferred homepage sections
- future integration note: Hubi App Product API remains deferred
- next design checkpoint rather than speculative implementation work

- [ ] **Step 8: Commit Batch 3 as the V1 closure checkpoint**

```bash
git add .
git commit -m "feat(web): complete public showcase v1"
```

---

## Coordinator Operating Model After V1 Starts

The coordinator owns:
- approved architecture/design decisions
- active plan and `docs/ACTIVE.md`
- executor handoffs
- blocker classification
- scope control/YAGNI
- acceptance checkpoints
- deciding when a visual choice is intentionally left for on-the-go implementation

The executor owns:
- implementing the active batch end-to-end
- normal local debugging inside that batch
- making small implementation choices that do not alter approved architecture
- reporting only genuine blockers, architecture deviations, or checkpoint results

Do **not** escalate ordinary TypeScript/CSS/component-integration errors to the coordinator. The executor should debug those locally.

Escalate when:
- selected third-party component cannot legally/technically be integrated as planned
- achieving the hero behavior requires a material architecture change
- mobile constraints invalidate the desktop approach rather than merely requiring styling adaptation
- requested real content/assets are missing and cannot be omitted without breaking the agreed page purpose
- a new backend/CMS/ecommerce requirement appears

## Plan Self-Review

- Spec coverage: all approved V1 requirements map to Batch 1, 2, or 3.
- Scope: backend/CMS/ecommerce/Hubi API integration remain explicitly excluded.
- Batch size: three review-worthy coherent batches; no microtask review gates.
- Verification: full checks only at batch checkpoints, with focused early checks allowed only for blockers/risk.
- Type consistency: Product and Blog interfaces are defined once and consumed consistently by data access and routes.
- Data migration path: UI consumes the thin `src/lib/content.ts` boundary rather than raw data arrays.
- Motion responsibilities: GSAP owns scroll choreography; React Bits owns expressive text/CTA/showcase effects; imported Motion remains component-local.
- Hero performance: progressive preload, derivatives, mobile variant, fallback, reduced motion, no all-frame critical preload.
- Placeholder scan: no TODO/TBD implementation placeholders remain in this plan.
