# Hubi Việt Nam Public Website — ACTIVE

Updated: 2026-08-11

## Status

Batch 1 complete. Design and implementation plan remain approved for execution style: three large coherent batches with checkpoint verification only.

## Active milestone

**Batch 1 — Project Foundation + Global Shell**

Build in one coherent pass:
- Next.js App Router + TypeScript + Tailwind scaffold
- shadcn foundation
- folder structure
- global semantic design tokens
- Be Vietnam Pro global typography
- four-route shell: Trang chủ / Sản phẩm / Blog / Liên hệ
- selected 21st.dev Navigation Menu adapted as global header
- selected 21st.dev Sticky Footer adapted as global footer
- functional mobile navigation baseline
- concise AGENTS.md

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

Batch 2 — Homepage hero + typed content foundation.

Batch 1 evidence: `pnpm lint` passed; `pnpm build` passed; desktop smoke returned HTTP 200 for `/`, `/san-pham`, `/blog`, and `/lien-he`; mobile navigation source sanity passed for menu boundary and close behavior.

## Blockers

None.
