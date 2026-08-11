# AGENTS.md — Hubi Việt Nam Public Website

Before editing, read `docs/ACTIVE.md`, the active plan referenced there, and the approved design spec only when architecture/design intent is needed.

## Durable rules

- YAGNI. Build only the active V1 scope.
- Reuse before custom: shadcn → selected 21st.dev → React Bits Free → adapt/wrap → custom only when needed.
- Do not add backend, CMS, auth, cart, checkout, payment, customer accounts, or Hubi App API integration in V1.
- Preserve semantic global tokens and Be Vietnam Pro typography.
- Desktop first, with responsive/mobile boundaries valid from the start.
- V1 uses native browser scrolling. Do not add Lenis.
- Keep third-party adapted components presentation-oriented; Hubi-specific composition belongs in feature/layout wrappers.
- Static product/blog data must stay typed and accessed through the thin content boundary defined in the plan.
- Do not create generic service/repository/domain/store/hooks directories without a real current consumer.

## Execution cadence

- Implement the active batch end-to-end and verify at the meaningful checkpoint.
- Debug ordinary TypeScript/CSS/component integration errors locally.
- Update `docs/ACTIVE.md` only at checkpoint completion or on a true blocker.
