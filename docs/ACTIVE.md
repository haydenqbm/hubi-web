# Hubi Việt Nam Public Website — ACTIVE

Updated: 2026-08-11

## Status

Batch 3 complete. Hubi Public Website V1 is ready for visual review. Batch 1 and Batch 2 remain accepted, including the corrected 21st.dev-derived shell and the scroll Hero foundation.

## Active milestone

**V1 closure — Product, Blog, Contact, Responsive, SEO**

Final V1 scope:
- Homepage scroll Hero and featured Product Accordion Gallery
- Product catalog and static product detail pages
- Editorial Blog listing and static detail pages
- Contact intent page without fabricated company channels
- Responsive desktop/mobile polish
- Metadata, sitemap, robots, accessibility, and performance sanity

## Source of truth

- Design: `docs/superpowers/specs/2026-08-11-hubi-public-website-design.md`
- Plan: `docs/superpowers/plans/2026-08-11-hubi-public-website-v1.md`

## Execution model

- Coordinator owns scope, architecture, plan, docs, blockers, and checkpoint acceptance.
- Executor owns implementation and ordinary debugging inside the active batch.
- Do not escalate normal TypeScript/CSS/component integration errors.
- Do not run full build/test after every small change.
- Verify at the end of the batch, except for targeted checks needed to resolve a blocker or risky third-party integration.

## V1 scope

Public Vietnamese product showcase website only.

In scope:
- Trang chủ landing page
- Sản phẩm
- Blog
- Liên hệ
- static typed product/blog content
- scroll hero using supplied 339-frame image sequence
- React Bits product showcase and expressive text/CTA
- desktop + mobile

Out of scope:
- Hubi App API integration
- backend/database/CMS
- auth
- cart/checkout/payment
- ecommerce order workflow
- multilingual
- Lenis unless later visual validation clearly justifies it

## Current decisions

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- 21st.dev Navigation Menu: `larsen66/navigation-menu`
- 21st.dev Sticky Footer: `sshahaider/sticky-footer`
- React Bits Free preferred for landing text, CTA, micro-interactions, Accordion Gallery
- GSAP + ScrollTrigger for hero scroll choreography
- Canvas image sequence for hero
- native browser scroll
- Be Vietnam Pro typography
- semantic global tokens
- Vercel Pro target; deployment-neutral core architecture

## Next checkpoint

Ready for visual review. Optional post-V1 work: replace static content with approved Hubi App API sources, add verified contact channels, and continue visual refinement from review feedback.

Batch 3 evidence: `pnpm lint` passed; `pnpm build` passed; headless browser verified `/`, `/san-pham`, representative product detail, `/blog`, representative blog detail, `/lien-he`, CTA/gallery/product links, footer, mobile navigation, no horizontal overflow, reduced-motion rendering, and no console/page errors.

## Blockers

None.

## Media policy

Runtime imagery is kept under `public/images/` by surface and product slug. The product page uses its static hero assets directly; there is no source-image build pipeline.

## Accepted deviations

- Local React Bits-style components remain in place because registry source was unavailable; this was accepted in Batch 2.
- Contact direct-action links are omitted until verified company contact information is supplied.
