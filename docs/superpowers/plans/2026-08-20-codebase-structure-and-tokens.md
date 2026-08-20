# Hubi Codebase Structure and Design Tokens Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Centralize Hubi UI colors, make asset ownership predictable, and clarify feature/data boundaries without adding unnecessary abstraction.

**Architecture:** Keep Next.js routes in `src/app`, reusable primitives in `src/components`, and page behavior in `src/features`. Add one semantic Hubi token layer in `src/styles/tokens.css`, expose it through Tailwind names, and move only runtime assets into ordered `public/images` categories. Keep static content behind the existing `src/lib/content.ts` boundary; do not create generic services or stores.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS v4, CSS custom properties, `next/image`.

**Spec:** `PRODUCT.md` and `docs/superpowers/specs/2026-08-11-hubi-public-website-design.md`

## Global Constraints

- Preserve the V1 static public showcase scope.
- Preserve current routes, copy, imagery, responsive behavior, and product data.
- Reuse the existing palette; move values into tokens instead of inventing a new theme.
- Do not create generic service/repository/domain/store/hooks directories without a current consumer.
- Runtime hero-sequence assets remain under `public/hero-sequence/` because they are generated build output.

---

### Task 1: Establish semantic color tokens

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/app/globals.css`

- [ ] Add named Hubi palette and semantic UI tokens for surfaces, text, borders, overlays, price/error, and shadows.
- [ ] Expose the named tokens through Tailwind `@theme inline` aliases.
- [ ] Add one reduced-motion token rule only where global behavior needs it.
- [ ] Run `pnpm lint` and `pnpm exec tsc --noEmit`.

### Task 2: Replace component-level color literals

**Files:**
- Modify: `src/app/lien-he/page.tsx`
- Modify: `src/app/phu-kien/page.tsx`
- Modify: `src/app/phu-kien/[slug]/page.tsx`
- Modify: `src/app/san-pham/page.tsx`
- Modify: `src/app/san-pham/[slug]/page.tsx`
- Modify: `src/components/layout/navigation-menu.tsx`
- Modify: `src/components/ui/detail-dropdown.tsx`
- Modify: `src/components/ui/react-bits/depth-carousel.css`
- Modify: `src/features/products/product-catalog.tsx`
- Modify: `src/features/products/product-image-carousel.tsx`
- Modify: `src/features/home/hero/hero-copy.tsx`
- Modify: `src/features/home/hero/scroll-hero.tsx`

- [ ] Replace repeated brand hex classes with semantic Tailwind token classes.
- [ ] Replace raw carousel shadow/overlay colors with token-backed CSS variables.
- [ ] Preserve transparent overlays and contrast values through semantic opacity utilities.
- [ ] Verify with `rg` that UI source contains no repeated Hubi palette literals outside token files.

### Task 3: Organize runtime assets and references

**Files:**
- Move: `public/images/home-desktop-hero.png` → `public/images/hero/products-desktop.png`
- Move: `public/images/products/mobile-hero-v2.png` → `public/images/hero/products-mobile.png`
- Move: `public/images/products/category-*.png` → `public/images/categories/*.png`
- Move: `public/logo-mark.png` → `public/images/brand/logo-mark.png`
- Modify: all source references to moved paths, including `src/app/san-pham/page.tsx`, `src/features/products/product-catalog.tsx`, and `src/components/shared/hubi-logo.tsx`.

- [ ] Keep product/accessory image folders grouped by slug and numbered in existing order.
- [ ] Keep generated hero sequence paths unchanged.
- [ ] Verify every moved runtime asset has at least one source reference and no source reference points to the old path.

### Task 4: Clarify dependency and data boundaries

**Files:**
- Modify: `src/features/products/product-catalog.tsx`
- Modify: `src/lib/content.ts`
- Modify: `src/data/products.ts`
- Modify: `src/data/accessories.ts`
- Review: `src/features/products/product-card.tsx`, `src/features/products/product-grid.tsx`

- [ ] Keep catalog-specific projection/mapping in the products feature, while route data access continues through `src/lib/content.ts`.
- [ ] Remove only confirmed dead legacy product-grid code after repository-wide reference checks; do not delete public behavior.
- [ ] Avoid adding global state or generic hooks; retain local state for active category/carousel state.
- [ ] Verify imports, static params, sitemap, and all product/accessory routes.

### Task 5: Final audit and verification

- [ ] Run `pnpm lint`.
- [ ] Run `pnpm exec tsc --noEmit`.
- [ ] Run `git diff --check`.
- [ ] Run the Impeccable detector on changed UI files.
- [ ] Run `pnpm build` and record any remaining Next.js/toolchain failure separately from code errors.
- [ ] Re-scan color literals, asset references, and imports.

