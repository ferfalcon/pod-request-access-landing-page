# Phase 2 — Responsive Visual System

## Phase header

- **Phase:** 2 of 5
- **Status:** Pending
- **Objective:** Implement the three approved content-fit layout modes, imagery, typography, and independent visual control states.
- **Expected outcome:** The page matches the mobile, tablet, and desktop Figma intent and remains usable between reference widths, but it is still a non-public construction state until Phase 3 adds guarded behavior.
- **Source plan revision:** `docs/PLAN.md`, Stage 6 challenged revision reviewed 2026-07-31; repository baseline `f94f1045d3a4951abc9d4be52a37229874ae1350`.

## Requirement coverage

### Requirements delivered

- `FR-012`
- `RESP-001`, `RESP-002`, `RESP-003`, `RESP-004`, `RESP-005`, `RESP-006`, `RESP-007`
- `A11Y-006`, `A11Y-007`, `A11Y-012`, `A11Y-013`, `A11Y-014`, `A11Y-015`

### Requirements re-verified from Phase 1

- `A11Y-002` — visual heading treatment must preserve the single accessible heading.

### Acceptance criteria delivered

- `AC-009`, `AC-010`, `AC-011`, `AC-012`, `AC-013`, `AC-014`, `AC-015`
- `AC-018`, `AC-019`, `AC-020`
- Responsive and visual completion of `AC-001`
- Layout-specific re-verification of `AC-017`

## Scope and out of scope

### In scope

- Mobile-first tokens and page styling.
- Mobile below `48rem`, tablet-like from `48rem` to below `80rem`, and desktop at `80rem+`.
- Responsive hero crops, tint/opacity, dots, platform-mark placement, and bounded desktop composition.
- Default, populated/autofill, hover, pressed, focus, invalid, submitting, service-error, and success visual hooks.
- Text resize, zoom/reflow, long input/copy, short viewport, and virtual-keyboard resilience.

### Out of scope

- Controller-driven state transitions or service calls.
- Unit/DOM/browser test infrastructure.
- A real success request or production deployment.
- Final visual acceptance when Chivo or high-density approved assets are unavailable.

## Prerequisites and dependencies

- Phase 1 acceptance gate passes.
- Semantic markup remains single-source; no separate mobile and desktop form markup may be introduced.
- Approved breakpoints remain `48rem` and `80rem`.
- The hero, dots, and marks remain decorative.
- Approved focus, pressed, submitting, service-error, and success treatments/copy remain unchanged.
- Missing approved Chivo/high-density assets are documented as visual-release gates, not silently substituted with remote resources.

## Expected file impact

| Path or area | State | Expected impact |
|---|---|---|
| `frontend/src/styles/tokens.css` | Existing after Phase 1 | Refine responsive, typography, state, and layout tokens. |
| `frontend/src/styles/base.css` | Existing after Phase 1 | Add font-face/fallback behavior only when approved assets exist. |
| `frontend/src/styles/page.css` | Existing after Phase 1 | Implement mobile, tablet-like, and desktop page compositions. |
| `frontend/src/styles/request-form.css` | Existing after Phase 1 | Implement responsive form layout and independent control/state presentations. |
| `frontend/src/assets/fonts/` | Proposed; asset-gated | Add approved local Chivo `300`/`700` WOFF2 files when supplied. |
| `frontend/src/assets/images/` | Existing after Phase 1 | Retain structural crops; replace only with approved higher-density sources. |
| `README.md` | Existing | Record visual asset gates and any verified iOS input-size deviation. |

## Ordered tasks

### `P2-T01` — Revalidate the Phase 1 handoff

- **Action:** Confirm the semantic DOM, assets, tokens, native form constraints, build, and non-public status match the Phase 1 handoff before adding layout CSS.
- **Reason / requirements:** Prevents visual work from compensating for broken semantics or duplicated markup.
- **Expected result:** Phase 2 starts from one stable document and a passing build.
- **Dependencies:** Phase 1 complete.
- **Verification:** Run `pnpm run typecheck`, `pnpm run build`, inspect DOM order, and confirm `git diff --check`.

### `P2-T02` — Finalize the visual token layer and typography fallback

- **Action:** Map the reconciled color, spacing, measures, type roles, control sizes, radii, shadows, focus ring, and breakpoint values to semantic custom properties. If approved Chivo WOFF2 files are available, add weights `300` and `700` with `font-display: swap`; otherwise retain a measured system fallback and mark final typography approval blocked. Use `font-size-adjust` only as a progressive enhancement.
- **Reason / requirements:** Supports `A11Y-012`–`A11Y-014` and consistent responsive styling without relying on unsupported minimum-browser behavior.
- **Expected result:** Typography and geometry are centralized, fallbacks remain readable, and font loading does not become a runtime privacy dependency.
- **Dependencies:** `P2-T01`.
- **Verification:** Block the web font and compare line wrapping/layout stability; inspect computed token use; confirm no third-party font request.

### `P2-T03` — Implement the mobile-first composition

- **Action:** Style the below-`48rem` layout as the centered single column shown at `375 × 812`: subdued full-page decorative hero, centered logo/copy, `32px` heading, `14px` body, visually marks-before-form placement, stacked fluid controls, and no dots.
- **Reason / requirements:** Delivers `RESP-003`, `RESP-005`, `RESP-006`, `A11Y-007`, and `AC-012`, `AC-014`.
- **Expected result:** The `375px` reference is visually faithful without fixed viewport height, and widths down to `320px` remain scrollable and collision-free.
- **Dependencies:** `P2-T02`.
- **Verification:** Manual checks at `320`, `375`, `479`, and `767px`; compare `375 × 812` with Figma; test short and landscape viewports.

### `P2-T04` — Implement the tablet-like composition at `48rem`

- **Action:** Add `@media (min-width: 48rem)` rules that create the left-aligned overlap, tall right-side hero crop, inline form, marks-after-form visual placement, desktop typography, and visible dots shown at `768 × 1024`.
- **Reason / requirements:** Delivers `RESP-002`, `RESP-004`, `RESP-005`, and `AC-011`, `AC-013`.
- **Expected result:** Tablet does not collapse into mobile composition, while flexible tracks and `min-inline-size: 0` prevent content/image collisions.
- **Dependencies:** `P2-T03`.
- **Verification:** Check `767`, `768`, `1024`, and `1279px`; compare `768 × 1024` with Figma; inspect long-copy and feedback fixtures.

### `P2-T05` — Implement the desktop composition at `80rem`

- **Action:** Add `@media (min-width: 80rem)` rules for the centered `70rem` maximum composition, wide hero crop, overlapping content surface, desktop spacing, and visible dot placement.
- **Reason / requirements:** Delivers `RESP-001`, `RESP-004`, `RESP-005`, `RESP-007`, and `AC-010`, `AC-013`.
- **Expected result:** The `1440 × 960` reference is visually faithful, and wider viewports remain centered with bounded content measures.
- **Dependencies:** `P2-T04`.
- **Verification:** Check `1279`, `1280`, `1440`, and at least one width above `1440px`; compare `1440 × 960` with Figma.

### `P2-T06` — Implement independent form and control presentations

- **Action:** Style default, populated, autofill, hover, pressed, focus-visible/focus-within, invalid, submitting, service-error, and success hooks without coupling them. Limit hover styling to hover-capable pointers; use the approved `3px` white focus ring with `3px` offset; use the dark inset/reduced-shadow pressed CTA; preserve `44px` minimum control height and stable submitting geometry.
- **Reason / requirements:** Delivers `FR-012`, `A11Y-006`, `A11Y-012`, `A11Y-014`, and `AC-009`, `AC-019`.
- **Expected result:** Each visual state belongs to the correct control/outcome, focus never masquerades as hover, and autofill remains readable.
- **Dependencies:** `P2-T02`, `P2-T03`.
- **Verification:** Manually force each CSS hook and browser pseudo-state; verify keyboard focus, hover-capable and coarse-pointer behavior, autofill colors, contrast, and target dimensions.

### `P2-T07` — Preserve accessible order while moving decorative marks

- **Action:** Use grid areas or equivalent layout placement to show marks before the form on mobile and after it on tablet/desktop without changing the single DOM order or reordering any meaningful/interactive item.
- **Reason / requirements:** Delivers `A11Y-007`, re-verifies `A11Y-002`, `A11Y-010`, `A11Y-011`, and supports `AC-012`, `AC-017`.
- **Expected result:** Visual fidelity changes responsively while the reading and focus journey remains brand, heading, copy, form.
- **Dependencies:** `P2-T03`, `P2-T04`.
- **Verification:** Compare visual order at all three modes; inspect accessibility tree and keyboard traversal; confirm marks remain non-focusable and hidden.

### `P2-T08` — Harden intrinsic sizing and overflow behavior

- **Action:** Add flexible tracks, logical properties, fluid limits, `min-inline-size: 0`, normal-flow feedback space, contained single-line input behavior, and vertical page growth. Do not use `100vw`, fixed sample heights, CSS visual reversal of controls, or page-level overflow hiding.
- **Reason / requirements:** Delivers `RESP-004`, `RESP-006`, `A11Y-013`, and `AC-013`–`AC-015`, `AC-018`.
- **Expected result:** Long email/copy, errors, short viewports, text resize, and keyboard conditions do not collide, clip, or create page-level horizontal scrolling.
- **Dependencies:** `P2-T03`–`P2-T07`.
- **Verification:** Test the full width matrix, long email/copy fixtures, `200%` text, `400%`-equivalent reflow, short viewport, and vertical reachability.

### `P2-T09` — Complete visual, accessibility, and device review

- **Action:** Compare the three reference screenshots, verify contrast and target sizes, test real iOS input focus when available, and document any approved asset/font/input-size deviation.
- **Reason / requirements:** Closes Phase 2 acceptance evidence and prevents a small Figma input size from causing disruptive iOS zoom.
- **Expected result:** Residual differences are evidence-backed and release gates remain explicit.
- **Dependencies:** `P2-T02`–`P2-T08`.
- **Verification:** Reference comparisons at `375 × 812`, `768 × 1024`, `1440 × 960`; real Safari/iOS check where available; `pnpm run typecheck`, `pnpm run build`, and `git diff --check`.

## Responsive and accessibility work

- Use mobile-first media queries at exactly `48rem` and `80rem`.
- Keep the root font size at the browser default.
- Keep the page in normal flow and permit vertical scrolling.
- Preserve a single DOM/focus order and move only decorative hidden marks.
- Verify focus against every adjacent state color.
- Keep at least `44px` target height; use `1rem` input text on narrow/touch layouts if real iOS testing proves the observed `14px` value causes disruptive focus zoom.
- Respect reduced motion if any nonessential transition is introduced; no motion is required.
- Treat `font-size-adjust` and fetch priority as progressive enhancements, not core dependencies.

## Testing and validation

### Known commands

```bash
pnpm run typecheck
pnpm run build
```

### Required manual matrix

- Widths: `320`, `375`, `479`, `767`, `768`, `1024`, `1279`, `1280`, `1440`, and above `1440px`.
- Heights/orientation: short mobile viewport and mobile landscape.
- Content: long email, longer heading/body/feedback, validation and service feedback hooks.
- Accessibility: keyboard focus, `200%` text, `400%`-equivalent reflow, contrast, target sizes, reduced motion.
- Devices: real Safari/iOS input focus and virtual keyboard when available.
- Fidelity: all three Figma reference screenshots.

## Acceptance gate

- Phase 2 requirement and acceptance-criterion checks pass.
- No page-level horizontal overflow exists in the required matrix.
- Reference layouts match the intended hierarchy and treatment.
- Focus, hover, pressed, populated, autofill, invalid, and submitting presentations remain independent.
- Asset/font limitations are explicitly recorded.
- The page remains non-public until Phase 3 supplies guarded fail-closed behavior.

## Risks and recovery

| Risk | Mitigation | Recovery |
|---|---|---|
| Intermediate overlap collides | Use intrinsic grid tracks and test both sides of each breakpoint. | Rework track constraints; do not add arbitrary one-off breakpoints without evidence. |
| CSS visual order misleads keyboard users | Move only decorative, hidden marks. | Restore coherent DOM/visual alignment for meaningful content. |
| Missing Chivo changes wrapping | Keep measured fallback and block final visual approval. | Add approved local WOFF2 and rerun every width/text fixture. |
| `1x` hero looks soft | Do not upscale or claim production suitability. | Replace with approved high-density sources and rerun crop/LCP/visual checks. |
| Mobile input zoom disrupts access | Test real iOS and allow `1rem` input text. | Record the fidelity deviation and preserve user zoom. |

## Completion checklist and handoff

- [ ] Phase 1 handoff revalidated.
- [ ] Visual tokens and font fallback finalized.
- [ ] Mobile, tablet-like, and desktop modes implemented.
- [ ] Responsive hero, dots, marks, and bounded desktop measure implemented.
- [ ] Independent form/control state styles verified.
- [ ] Logical reading/focus order preserved.
- [ ] Long content, short viewport, resize, zoom, and overflow checks pass.
- [ ] Reference comparisons and residual visual gates recorded.
- [ ] Typecheck/build pass; construction state remains non-public.

**Phase 3 may assume:** stable semantic markup, approved state styling hooks, resilient responsive layout, exact feedback copy, local structural assets, and no service or custom validation behavior yet.
