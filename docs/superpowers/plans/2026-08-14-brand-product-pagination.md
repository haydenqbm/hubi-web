# Brand Product Pagination Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make each brand’s product rail data-driven with 10–20 preview products and reference-style previous/next pagination.

**Architecture:** Keep product data inside the existing catalog component for now, but generate preview entries from each brand’s seed product and a configurable count. A reusable paginated brand section will derive its page count from `products.length`, so brands can have different counts without hard-coded navigation totals.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS.

## Global Constraints

- Preserve the existing three category tabs: SUP, Thuyền Câu, Phụ Kiện.
- Keep the calm Hubi visual direction and current product-card styling.
- Use the existing product images; duplicate entries are mock previews until real catalog data exists.
- No backend, CMS, or new dependency is required.

---

### Task 1: Data-driven brand product collections

**Files:**
- Modify: `src/features/products/product-catalog.tsx`

**Interfaces:**
- `BrandSection.products` remains `CatalogProduct[]`.
- Each brand gets a configurable product count between 10 and 20.

- [ ] **Step 1: Add a preview collection helper**

Create a helper that clones a seed product with a stable preview suffix and returns exactly the requested count:

```ts
function createPreviewProducts(seed: CatalogProduct, count: number) {
  return Array.from({ length: count }, (_, index) => ({
    ...seed,
    name: `${seed.name} · ${String(index + 1).padStart(2, "0")}`,
  }))
}
```

- [ ] **Step 2: Replace duplicate hard-coded SUP entries**

Give HB, GQ, and TIDETREK distinct counts between 10 and 20 and build each collection from its existing seed product:

```ts
products: createPreviewProducts(seedProduct, 12)
```

Use different counts for the three brands so the navigation visibly proves it is dynamic.

- [ ] **Step 3: Add 10–20 preview entries to other brands**

Apply the same helper to the Thuyền Câu and Phụ Kiện brands, keeping their existing seed image, type, description, and metadata unchanged.

### Task 2: Reusable reference-style product rail

**Files:**
- Modify: `src/features/products/product-catalog.tsx`

**Interfaces:**
- `BrandSection` owns the current page state for its own products.
- The rail derives `pageCount = products.length` and displays the current position.

- [ ] **Step 1: Add local page state to `BrandSection`**

Use `useState(0)` and derive the visible product from `section.products[currentPage]`.

- [ ] **Step 2: Add previous/next controls**

Render a left arrow, active progress segment, inactive segments, and right arrow. Disable the arrows at the collection boundaries and update the page index on click.

- [ ] **Step 3: Preserve multi-card mobile browsing**

Keep the existing compact two-column mobile grid, while the rail controls the focused product preview on larger layouts. The count and segments must come from `products.length`, never from a fixed literal.

### Task 3: Verification

**Files:**
- Test: existing project checks

- [ ] **Step 1: Run lint and TypeScript checks**

Run `pnpm lint && pnpm exec tsc --noEmit` and confirm both exit successfully.

- [ ] **Step 2: Run the Impeccable detector**

Run `node /home/quang/.codex/skills/impeccable/scripts/detect.mjs --json src/features/products/product-catalog.tsx` and confirm no findings.

- [ ] **Step 3: Run the production build**

Run `pnpm build`; if the existing TypeScript-output parsing environment error remains, report it separately from code-level checks.
