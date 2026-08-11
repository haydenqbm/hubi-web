# Hubi Việt Nam Public Website — Design Spec

Date: 2026-08-11
Status: Approved

## 1. Product goal

Build a Vietnamese public website for Hubi Việt Nam whose primary purpose is product showcase and brand presentation. The website is not an ecommerce system and does not need a backend, CMS, authentication, cart, checkout, or Hubi App integration in V1.

The site should feel visual, modern, water-sport oriented, and motion-forward while remaining maintainable. Reuse high-quality prebuilt components before writing custom UI.

Primary navigation:
- Trang chủ
- Sản phẩm
- Blog
- Liên hệ

Trang chủ is also the main landing page.

## 2. Success criteria

V1 is successful when:
- Desktop experience is polished first, without creating architecture that blocks mobile.
- Mobile has equal product priority and receives a responsive baseline from the start, with polish following desktop.
- Global typography, colors, spacing, radii, layout widths, and motion values can be customized centrally.
- Header and footer are reusable global shell components.
- Homepage begins with a scroll-driven hero using the supplied 339-frame image sequence.
- Hero message is “Biến mặt nước thành trải nghiệm khó quên”.
- Hero CTA is “Khám phá ngay” and scrolls to the product showcase.
- Product showcase uses React Bits Accordion Gallery.
- Product and blog content are static and typed in V1.
- Product UI is insulated from the current static source so it can later consume data from Hubi App API with limited UI changes.
- The project favors prebuilt shadcn, 21st.dev, and React Bits components over custom implementations.
- Implementation is organized into large one-shot batches with verification at meaningful checkpoints rather than after every small task.

## 3. Technical stack

- Framework: Next.js with App Router
- Language: TypeScript
- Styling: Tailwind CSS
- UI primitives: shadcn/ui
- Community components: 21st.dev
- Motion / expressive landing-page components: React Bits free components
- Scroll choreography: GSAP + ScrollTrigger
- Hero rendering: HTML Canvas + image sequence
- Smooth scrolling: native browser scroll in V1
- Lenis: excluded initially; add only if visual testing later proves a clear need
- Hosting target: Vercel Pro
- Architecture: deployment-neutral where practical
- Content language: Vietnamese only in V1

## 4. Route map

```text
/
├── /san-pham
│   └── /san-pham/[slug]
├── /blog
│   └── /blog/[slug]
└── /lien-he
```

Page responsibilities:

### `/`
- Global header
- Scroll hero
- Product showcase
- Additional showcase sections chosen progressively during implementation
- Global footer

### `/san-pham`
- Product listing / showcase
- Static typed data in V1
- Links to product detail

### `/san-pham/[slug]`
- Product visual gallery
- Product name, code, brand, category, description, specifications, related content as available in static data
- No cart or checkout
- Contact / inquiry CTA where appropriate

### `/blog`
- Blog listing
- Static typed post data in V1

### `/blog/[slug]`
- Article page
- Vietnamese content

### `/lien-he`
- Company contact details
- Lightweight contact CTA / links
- No custom CRM integration in V1

## 5. Global UI shell

### Header

Base component:
- 21st.dev Navigation Menu selected by the user
- Source reference: Larsen66 navigation menu

Adaptation rules:
- Keep the component's visual character where useful.
- Replace demo content with Hubi navigation.
- Use semantic design tokens rather than hard-coded palette values.
- Desktop implementation first.
- Mobile navigation behavior must be supported from the component boundary even if visual polish comes later.
- Avoid product-specific business logic inside the header.

Navigation labels:
- Trang chủ
- Sản phẩm
- Blog
- Liên hệ

### Footer

Base component:
- 21st.dev Sticky Footer selected by the user
- Source reference: sshahaider sticky-footer

Adaptation rules:
- Replace demo copy with Hubi company/navigation content.
- Respect global tokens.
- Keep footer globally reusable.
- Avoid turning the footer into a large sitemap in V1.

## 6. Homepage hero

### Media source

Supplied archive characteristics verified on 2026-08-11:
- 339 JPEG frames
- 1920×1080 per frame
- Approximately 18.7 MB total source size
- Sequential filenames from the supplied frame set

The media will be treated as an image sequence, not as an HTML video.

### Hero behavior

Desktop model:
1. Hero enters viewport.
2. Hero becomes pinned for the designed scroll range.
3. ScrollTrigger maps scroll progress from 0 to 1.
4. Progress maps to the current image-sequence frame.
5. Canvas draws the current frame.
6. Hero copy and CTA animate independently as DOM overlays.
7. At the end of the hero sequence, the hero unpins and flows into the product showcase.

Conceptual mapping:

```text
native scroll
    ↓
GSAP ScrollTrigger
    ↓
progress 0..1
    ↓
frame index 1..339
    ↓
canvas.drawImage()
```

### Hero text

Headline:
“Biến mặt nước thành trải nghiệm khó quên”

CTA:
“Khám phá ngay”

CTA action:
- Smoothly navigate/scroll to the homepage product showcase anchor.
- It does not change route.

### Hero text / CTA motion

Prefer React Bits free components for expressive typography and CTA treatment.

Candidate component families:
- Split Text
- Blur Text
- Scroll Reveal
- Shiny Text where readability remains strong
- Magnet for CTA interaction
- Star Border or another free React Bits treatment if it fits the visual direction

Selection is made during implementation based on the actual hero frame contrast and composition. The copy remains real DOM text for accessibility and SEO.

### Hero asset strategy

Do not preload all 339 full-resolution JPEG files on first paint.

Required behavior:
- Use a loading poster / initial frame.
- Preload an initial working window of frames.
- Continue controlled loading after first visual readiness.
- Maintain a bounded cache strategy rather than forcing all assets into the critical path.
- Generate optimized derivatives suitable for web delivery.
- Desktop and mobile may use different frame dimensions/quality.
- Mobile may use a reduced effective frame set if visual testing shows negligible quality loss.

The original media archive is a source asset, not the final runtime delivery format.

### Fallbacks

- If Canvas or frame loading fails, show a static hero poster and keep headline + CTA functional.
- Respect `prefers-reduced-motion` by avoiding long pinned/scrubbed motion and presenting a simpler static or reduced-motion hero.

## 7. Product showcase

Base component:
- React Bits Accordion Gallery

Purpose:
- Visually present a curated set of featured Hubi products immediately after the hero.
- Encourage browsing rather than transaction flow.

Behavior:
- Feed the gallery from typed product data.
- Featured products are chosen in static data, not encoded into gallery component internals.
- Active panel may reveal product title, short descriptor, and action to view details.
- Final visual treatment is decided on-the-go after the hero is implemented so the transition feels coherent.

## 8. Data architecture

V1 data is local and typed.

Minimum product contract:

```ts
type Product = {
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

Minimum blog contract:

```ts
type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt?: string
  coverImage?: string
  publishedAt: string
  content: string
}
```

Data source boundary:

```text
UI
 ↓
product data access boundary
 ↓
V1: local typed data
future: Hubi App Product API
```

Keep this boundary thin. Do not introduce repository/domain/service layers that provide no immediate value.

## 9. Folder structure

```text
hubi-website/
├── public/
│   ├── images/
│   └── hero-sequence/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── san-pham/
│   │   ├── blog/
│   │   └── lien-he/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   │   ├── header/
│   │   │   └── footer/
│   │   └── shared/
│   ├── features/
│   │   ├── home/
│   │   │   ├── hero/
│   │   │   └── product-showcase/
│   │   ├── products/
│   │   ├── blog/
│   │   └── contact/
│   ├── data/
│   │   ├── products.ts
│   │   └── posts.ts
│   ├── lib/
│   ├── styles/
│   │   ├── globals.css
│   │   ├── tokens.css
│   │   └── typography.css
│   └── types/
├── docs/
│   ├── ACTIVE.md
│   └── superpowers/
│       ├── specs/
│       └── plans/
├── AGENTS.md
├── components.json
└── package.json
```

Rules:
- Add folders only when a real responsibility appears.
- No generic `services`, `repositories`, `store`, `domain`, or `hooks` directories until needed.
- Third-party adapted UI stays close to primitive/component boundaries.
- Hubi-specific composition stays in features.

## 10. Design system foundation

All reusable visual decisions must use global semantic tokens.

Required token families:
- background / foreground
- surfaces
- brand
- accent
- muted
- borders
- destructive/status only if required later
- typography families and scales
- spacing / section rhythm
- container width / page padding
- radii
- shadows where used
- motion duration / easing
- z-index layers if global shell needs them

Components should not scatter arbitrary hex colors or repeated magic spacing values when a semantic token exists.

## 11. Typography

V1 default direction:
- Be Vietnam Pro for display and body

Reasoning:
- Good Vietnamese-language support
- Distinctive enough for brand work
- Can cover display and body with one family
- Avoids unnecessary multiple-font payload in V1

Initial scale direction, refined during visual implementation:
- Hero display: 72–88 px desktop range
- H1: around 56 px desktop
- H2: around 40 px desktop
- H3: around 28 px desktop
- Body large: around 20 px
- Body: around 16 px
- Small: around 14 px

Use fluid/responsive values where appropriate rather than hard-coding desktop values everywhere.

## 12. Component sourcing policy

Priority order:
1. shadcn/ui primitive if suitable
2. User-selected 21st.dev components
3. React Bits free component
4. Adapt/wrap an existing component
5. Custom implementation only when the above do not meet the interaction/design need

React Bits is the preferred expressive layer for:
- headline motion
- text reveals
- CTA interaction
- micro-interactions
- showcase visual effects

GSAP is not the default animation library for every component. Its main role is scroll choreography, pinning, image-sequence progression, and section-level timing where React Bits does not solve the problem.

## 13. Responsive strategy

Product priority:
- Desktop and mobile are equally important.

Implementation order:
- Desktop first.
- Responsive architecture from the beginning.
- Mobile visual polish follows desktop foundation.

Avoid desktop-only assumptions in component APIs.

Hero mobile can differ in:
- scroll distance
- canvas render dimensions
- number of effective frames
- preload budget
- motion intensity

Mobile should preserve the same brand story rather than blindly reproducing desktop mechanics at full cost.

## 14. Accessibility

Minimum requirements:
- Semantic navigation and headings
- Keyboard-operable navigation
- Visible focus states
- Text remains DOM content, not baked into canvas/images
- Sufficient contrast for hero text over varying frames
- `prefers-reduced-motion` support
- Images include appropriate alt text when meaningful
- Decorative images are marked appropriately
- CTA remains usable if motion fails

## 15. Performance principles

Highest-risk performance area is the hero image sequence.

Rules:
- Optimize frame delivery before production.
- Do not block initial paint on the entire sequence.
- Prefer progressive controlled preload.
- Use an explicit canvas sizing strategy for device pixel ratio.
- Avoid re-rendering React on every scroll frame when imperative canvas drawing is enough.
- Keep GSAP work scoped and cleaned up on unmount.
- Lazy-load non-critical homepage media below the fold.
- Keep React Bits effects selective; visual richness should not mean every word moves.

## 16. SEO / metadata

Because this is a public showcase site:
- Use Next.js metadata APIs.
- Product and blog detail routes have unique title/description metadata.
- Static data should support pre-rendering.
- Use semantic headings and crawlable DOM content.
- Do not put essential text only in animated canvas/media.

Advanced SEO tooling, sitemap automation, structured product schema, and multilingual SEO are not V1 blockers unless they become necessary during build.

## 17. Deployment

Initial production target:
- Vercel Pro

Architecture rules:
- Do not deliberately couple core UI/data architecture to Vercel-only features unless there is a concrete benefit.
- Keep the site compatible with normal Next.js Node deployment so later VPS migration remains practical.
- Do not force static export in V1.

## 18. Documentation and agent rules

Keep project docs lean.

Required:
- `docs/ACTIVE.md`: current state, immediate next work, important decisions, blockers
- `docs/superpowers/specs/`: approved design specs
- `docs/superpowers/plans/`: implementation plans
- `AGENTS.md`: concise repository rules for coding agents

Do not duplicate the same status across many files.

Agent implementation rules:
- YAGNI
- Reuse existing/prebuilt components first
- Preserve semantic design tokens
- Do not introduce backend/CMS/auth/cart/ecommerce work in V1
- Do not add abstraction layers without a current consumer
- Desktop implementation first while preserving responsive boundaries
- Prefer large coherent implementation batches
- Do not run build/test after every tiny edit
- Verify at major checkpoints and at the end of each large batch
- A blocker or risky foundational change may justify an earlier targeted check

## 19. Implementation batching direction

The later implementation plan should use large tasks, not microtasks.

Expected batch shape:

### Batch 1 — Foundation + Global Shell
One coherent pass covering:
- Next.js project scaffold
- TypeScript/Tailwind/shadcn setup
- project folder structure
- global tokens
- typography
- routing shell
- AGENTS.md
- docs/ACTIVE.md
- install/adapt selected 21st.dev header
- install/adapt selected 21st.dev footer
- desktop global shell
- responsive baseline
- one verification checkpoint at the end

### Batch 2 — Homepage Hero + Product Showcase
One coherent pass covering:
- prepare optimized hero frame assets
- canvas sequence renderer
- GSAP ScrollTrigger integration
- pinned desktop hero choreography
- React Bits headline treatment
- React Bits CTA
- reduced-motion/static fallback
- product typed data
- React Bits Accordion Gallery
- hero-to-showcase transition
- responsive baseline
- performance sanity check
- one verification checkpoint at the end

### Batch 3 — Product + Blog + Contact Pages
One coherent pass covering:
- static product listing
- product detail route
- static blog listing
- blog detail route
- contact page
- metadata
- site-wide responsive polish
- final V1 verification

Additional homepage showcase sections are intentionally not predetermined. They are selected after the hero and first product showcase exist, then folded into the nearest coherent batch or a new large batch if substantial.

## 20. Explicitly out of scope for V1

- Hubi App API integration
- Database
- CMS
- Admin panel
- Authentication
- Cart
- Checkout
- Payment
- Customer accounts
- Search service
- Complex filtering
- Multilingual content
- Ecommerce order management
- Lenis unless validated as necessary later
- Custom design system component library beyond what the site actually needs

## 21. Key decisions summary

- Public showcase site, not ecommerce.
- Four primary sections: Trang chủ, Sản phẩm, Blog, Liên hệ.
- Next.js App Router + TypeScript + Tailwind.
- shadcn + 21st.dev + React Bits free, reuse-first.
- React Bits preferred for expressive landing-page text and CTA effects.
- GSAP ScrollTrigger controls scroll choreography.
- Hero uses Canvas + supplied 339-frame image sequence.
- Native scroll in V1; no Lenis initially.
- Static typed product/blog content now, thin boundary for future Hubi API.
- Global semantic tokens for easy customization.
- Desktop first, mobile equal product priority.
- Vercel Pro initial hosting, deployment-neutral architecture.
- Large one-shot implementation batches with checkpoint verification.
