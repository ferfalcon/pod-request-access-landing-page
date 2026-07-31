# Phase 4 — Cross-Browser and Release-Quality Hardening

## Phase header

- **Phase:** 4 of 5
- **Status:** Pending
- **Objective:** Add repeatable lint, browser, accessibility, responsive, compatibility, performance, and CI evidence around the Phase 3 feature.
- **Expected outcome:** All 20 acceptance criteria have regression coverage through the appropriate automated or documented manual checks, with residual release gates explicit.
- **Source plan revision:** `docs/PLAN.md`, Stage 6 challenged revision reviewed 2026-07-31; repository baseline `f94f1045d3a4951abc9d4be52a37229874ae1350`.

## Requirement coverage

### Acceptance criteria regression gate

- `AC-001`, `AC-002`, `AC-003`, `AC-004`, `AC-005`
- `AC-006`, `AC-007`, `AC-008`, `AC-009`, `AC-010`
- `AC-011`, `AC-012`, `AC-013`, `AC-014`, `AC-015`
- `AC-016`, `AC-017`, `AC-018`, `AC-019`, `AC-020`

### Requirements re-verified

- All 38 normative requirements: `FR-001`, `FR-002`, `FR-003`, `FR-004`, `FR-005`, `FR-006`, `FR-007`, `FR-008`, `FR-009`, `FR-010`, `FR-011`, `FR-012`, `FR-013`; `CONTENT-001`, `CONTENT-002`, `CONTENT-003`; `RESP-001`, `RESP-002`, `RESP-003`, `RESP-004`, `RESP-005`, `RESP-006`, `RESP-007`; and `A11Y-001`, `A11Y-002`, `A11Y-003`, `A11Y-004`, `A11Y-005`, `A11Y-006`, `A11Y-007`, `A11Y-008`, `A11Y-009`, `A11Y-010`, `A11Y-011`, `A11Y-012`, `A11Y-013`, `A11Y-014`, `A11Y-015`.

This phase does not re-own feature implementation. It proves the behavior and layout introduced in Phases 1–3 across browsers, viewports, accessibility conditions, and production builds.

## Scope and out of scope

### In scope

- Minimal ESLint setup and explicit quality scripts.
- Playwright across current Chromium, Firefox, and WebKit.
- Browser journey, keyboard, responsive, overflow, and screenshot checks.
- Automated axe smoke coverage plus documented manual accessibility checks.
- Approved minimum-browser feature audit and real Safari/iOS evidence where available.
- Production-build performance/resource-priority measurement.
- CI workflow and contributor-facing verification documentation.

### Out of scope

- Real request-service integration or production success.
- Claims that current Playwright engines prove Chrome 111, Edge 111, Firefox 114, or Safari 16.4.
- A hosted visual-regression platform, component framework, or runtime test dependency.
- Final asset/content/legal/Vercel approval.

## Prerequisites and dependencies

- Phases 1–3 acceptance gates pass.
- Production bootstrap remains fail closed.
- Deterministic services remain test-only and injectable into the browser test harness without entering production.
- The approved browser baseline remains Chrome `111+`, Edge `111+`, Firefox `114+`, and Safari `16.4+`.
- Real device/minimum-version access may remain a documented manual gate where automation is unavailable.

## Expected file impact

| Path or area | State | Expected impact |
|---|---|---|
| `frontend/eslint.config.js` | Proposed | Minimal flat ESLint configuration for browser TypeScript and tests. |
| `frontend/playwright.config.ts` | Proposed | Current Chromium, Firefox, WebKit projects and local Vite server. |
| `frontend/tests/request-access.spec.ts` | Proposed | End-to-end request journeys, keyboard, focus, and fail-closed checks. |
| `frontend/tests/responsive.spec.ts` | Proposed | Reference/intermediate widths, overflow, reflow, and screenshots. |
| `frontend/tests/accessibility.spec.ts` | Proposed | Automated axe smoke checks for representative states/modes. |
| `frontend/package.json` and lockfile | Existing | Add lint/e2e scripts and development-only tooling. |
| `.github/workflows/ci.yml` | Proposed | Install, lint, typecheck, unit/DOM, browser, and build gates. |
| `README.md` | Existing | Document commands, compatibility evidence, manual checks, and residual gates. |
| Existing source/styles | Existing | Change only when a failing quality check exposes a verified defect. |

## Ordered tasks

### `P4-T01` — Revalidate Phase 3 and preserve fail-closed production behavior

- **Action:** Run all existing checks, inspect production imports, and confirm test fakes remain isolated before adding new tooling.
- **Reason / requirements:** Prevents hardening work from normalizing a broken or unsafe feature baseline.
- **Expected result:** Phase 4 begins from passing Phase 3 behavior and a clean production graph.
- **Dependencies:** Phases 1–3 complete.
- **Verification:** `pnpm run test`, `pnpm run typecheck`, `pnpm run build`, bundle inspection, and `git diff --check`.

### `P4-T02` — Add minimal linting

- **Action:** Add a flat ESLint configuration suitable for browser TypeScript, Vitest, and Playwright; add a `lint` script; keep lint dependencies development-only and avoid duplicate TypeScript compiler checks.
- **Reason / requirements:** Provides repeatable correctness/maintainability evidence without adding runtime weight.
- **Expected result:** Source and tests share one understandable lint contract.
- **Dependencies:** `P4-T01`.
- **Verification:** Run `pnpm run lint`, `pnpm run typecheck`, and confirm no generated build artifacts are linted.

### `P4-T03` — Add Playwright browser infrastructure

- **Action:** Configure Playwright for current Chromium, Firefox, and WebKit with a local Vite web server, deterministic isolated state, trace/screenshot capture on failure, and no dependency on a production endpoint.
- **Reason / requirements:** Enables browser-level proof for interactions, responsive behavior, and build output.
- **Expected result:** One `test:e2e` command runs the same local application in all three engines.
- **Dependencies:** `P4-T01`.
- **Verification:** Run a smoke journey in every configured project and confirm server lifecycle/cleanup is deterministic.

### `P4-T04` — Automate the request-access journeys

- **Action:** Add browser tests for page inventory, no premature validation, invalid CTA/Enter submission, trimming, correction/autofill recovery, pending duplicate guard, affirmative success, failure/retry, unavailable production behavior, focus movement, and logical keyboard order.
- **Reason / requirements:** Regresses `AC-001`–`AC-009`, `AC-016`, and `AC-017` at browser level.
- **Expected result:** Browser interaction matches unit/DOM behavior and no test relies on implementation-only selectors when accessible role/name queries are available.
- **Dependencies:** `P4-T03`.
- **Verification:** Run the journeys in Chromium, Firefox, and WebKit; inspect failure traces and confirm production-unavailable coverage sends no request.

### `P4-T05` — Automate responsive, reflow, and visual checks

- **Action:** Add tests for `320`, `375`, `479`, `767`, `768`, `1024`, `1279`, `1280`, `1440`, and above `1440px`; assert no page-level horizontal overflow, reachable content, bounded desktop width, correct mode-specific composition, long input containment, and stable dynamic feedback. Capture review screenshots at the three Figma reference sizes.
- **Reason / requirements:** Regresses `AC-010`–`AC-015`, `AC-018`, `AC-019`.
- **Expected result:** Layout transitions and content growth are objectively checked without treating intermediate widths as pixel-match targets.
- **Dependencies:** `P4-T03`, `P4-T04`.
- **Verification:** Run responsive specs in the relevant browser projects; manually compare reference screenshots with Figma; exercise `200%` text and `400%`-equivalent reflow.

### `P4-T06` — Add automated accessibility smoke coverage and manual AT matrix

- **Action:** Integrate axe-core with Playwright for representative default, invalid, submitting, service-error, and success states in mobile and desktop modes. Document and perform manual keyboard/screen-reader checks for labels, focus, single announcements, retry, success focus, contrast, targets, zoom, and reduced motion.
- **Reason / requirements:** Automated checks cannot prove announcement timing or full usability; both layers are required for `A11Y-001`–`A11Y-015` and `AC-016`–`AC-020`.
- **Expected result:** Automated violations are zero for tested scope, and manual-only evidence/residual limitations are explicit.
- **Dependencies:** `P4-T03`–`P4-T05`.
- **Verification:** Run the accessibility specs; record tested browser/AT pairs and outcomes in `README.md`; confirm validation/status/success are not double-announced.

### `P4-T07` — Audit the approved minimum-browser baseline

- **Action:** Inventory every core HTML attribute, CSS selector/property, and Web API used by the page against Chrome 111+, Edge 111+, Firefox 114+, and Safari 16.4+. Keep newer capabilities nonessential and feature-detected/cascade-safe; run available real/remote minimum-version checks and a real Safari/iOS smoke test.
- **Reason / requirements:** Current Playwright engines do not prove the approved minimum versions.
- **Expected result:** Core behavior has documented support or a verified fallback, and newer features such as `font-size-adjust` or fetch priority remain progressive enhancements.
- **Dependencies:** `P4-T04`–`P4-T06`.
- **Verification:** Publish the feature audit and actual browser/device evidence in the README; confirm no unsupported feature is required for submission, validation, layout, focus, or feedback.

### `P4-T08` — Measure performance and resource priority

- **Action:** Inspect the production bundle and measure representative LCP/CLS/resource loading. Confirm raw-HTML image discovery, intrinsic image sizing, local font behavior, and absence of unnecessary client work. Add `fetchpriority="high"` or preload only if measurement identifies the hero as the LCP candidate and proves improvement without contention.
- **Reason / requirements:** Implements the challenged plan’s evidence-first image/font priority strategy.
- **Expected result:** Resource hints are justified, production remains small, and the single-density asset limitation remains visible.
- **Dependencies:** `P4-T05`, `P4-T07`.
- **Verification:** Record before/after measurements if a priority hint changes; inspect the network waterfall and built asset graph; confirm no lazy loading on the above-the-fold hero.

### `P4-T09` — Add CI and complete the release-quality documentation

- **Action:** Add CI that installs with the frozen lockfile and runs lint, typecheck, unit/DOM tests, browser/accessibility tests, and build. Update README with local commands, browser/device evidence, manual checks, performance notes, preview limitations, asset/service gates, and failure-triage guidance.
- **Reason / requirements:** Makes all checks repeatable for contributors and prevents incomplete previews from being mistaken for production readiness.
- **Expected result:** Pull requests and pushes receive the same quality gates as local work; manual-only obligations and release blockers are visible.
- **Dependencies:** `P4-T02`–`P4-T08`.
- **Verification:** Validate workflow syntax, run the complete command sequence locally, inspect a CI run when repository access permits, and confirm no secrets are required for the fail-closed test suite.

## Responsive and accessibility work

- Test every required width and both sides of `48rem`/`80rem`.
- Include short viewport, landscape, long content, text resize, high zoom/reflow, and virtual-keyboard/device checks.
- Verify keyboard order and visible focus in every mode.
- Test default, validation, pending, service-error, and success accessibility states.
- Use axe only as smoke coverage; announcement timing, focus behavior, and real Safari/iOS remain manual obligations.
- Preserve user zoom and reduced-motion behavior.

## Testing and validation

### Complete command gate

```bash
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run test:e2e
pnpm run build
```

### Manual evidence

- Figma comparison at `375 × 812`, `768 × 1024`, and `1440 × 960`.
- Keyboard-only journey.
- Representative screen-reader/browser pairs.
- Real Safari/iOS input focus and virtual keyboard.
- `200%` text and `400%`-equivalent reflow.
- Minimum-browser compatibility evidence or explicit residual limitation.
- LCP/CLS/network inspection.
- Production bundle check for test fakes, endpoints, secrets, and raw-email logging.

## Acceptance gate

- All five commands pass locally and in CI where available.
- `AC-001`–`AC-020` have mapped automated or manual evidence.
- No core feature relies on capability newer than the approved baseline without fallback.
- Real Safari/iOS and manual AT limitations are documented.
- Production remains fail closed and contains no test fake.
- Residual blockers are limited to approved assets/content, service/privacy/topology, and Vercel release configuration.

## Risks and recovery

| Risk | Mitigation | Recovery |
|---|---|---|
| Tooling overwhelms the small app | Keep all quality dependencies development-only and configuration focused. | Remove redundant tools/config while preserving required evidence. |
| WebKit is treated as Safari proof | Require separate real Safari/iOS evidence. | Reclassify the gap as a release blocker; do not claim coverage. |
| Screenshot tests become brittle | Assert hierarchy/overflow; use reference captures for review rather than a hosted pixel gate. | Update only evidence-backed visual baselines after design approval. |
| CI requires production secrets | Keep Phase 4 on deterministic services and fail-closed production. | Remove secret dependency and block real integration until Phase 5. |
| Performance hint worsens loading | Measure before and after. | Remove the hint and restore browser heuristics. |

## Completion checklist and handoff

- [ ] Phase 3 handoff and production graph revalidated.
- [ ] ESLint and `lint` script pass.
- [ ] Playwright runs Chromium, Firefox, and WebKit.
- [ ] Journey and responsive specs cover all acceptance criteria.
- [ ] Axe smoke and manual accessibility matrix complete.
- [ ] Minimum-browser feature audit complete.
- [ ] Performance/resource-priority evidence recorded.
- [ ] CI and contributor documentation complete.
- [ ] Full command gate passes; residual release gates remain explicit.

**Phase 5 may assume:** release-quality UI behavior and evidence, fail-closed production, complete regression tooling, documented compatibility/performance limits, and no approved real submission service yet.
