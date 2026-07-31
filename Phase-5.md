# Phase 5 — Production Service Integration and Deployment

## Phase header

- **Phase:** 5 of 5
- **Status:** Blocked pending release inputs
- **Objective:** Connect an approved, secure request service; provide JavaScript and no-JavaScript submission; finalize approved assets/content; and release through the verified Vercel project with coordinated rollback.
- **Expected outcome:** Real requests succeed only on affirmative persistence, failures remain recoverable, operational handling is privacy-safe, and the deployed page passes the complete release gate.
- **Source plan revision:** `docs/PLAN.md`, Stage 6 challenged revision reviewed 2026-07-31; repository baseline `f94f1045d3a4951abc9d4be52a37229874ae1350`.

## Requirement coverage

### Production realization

- `FR-008`, `FR-009`, `FR-010`, `FR-011`
- `CONTENT-003`

### Production acceptance revalidation

- `AC-006`, `AC-007`, `AC-008`
- Release closure for `AC-001`, `AC-002`, `AC-003`, `AC-004`, `AC-005`, `AC-006`, `AC-007`, `AC-008`, `AC-009`, `AC-010`, `AC-011`, `AC-012`, `AC-013`, `AC-014`, `AC-015`, `AC-016`, `AC-017`, `AC-018`, `AC-019`, `AC-020`, and all 38 normative requirements.

## Scope and out of scope

### In scope

- Closing `PLAN-OQ01`–`PLAN-OQ04`.
- Choosing direct-browser versus same-origin server/edge topology from the approved service contract.
- Real adapter, timeout, affirmative-success recognition, and normalized failure handling.
- Server-side validation, abuse protection, secret isolation, and privacy-safe logging.
- Accessible POST form action and no-JavaScript HTML success/error response.
- Final licensed content, Chivo, platform marks/list, and high-density hero sources.
- Environment, Vercel, monitoring, smoke-test, rollout, and rollback documentation.

### Out of scope

- Fabricated endpoint, payload, consent, retention, monitoring, or deployment settings.
- Client-side secrets or security controls that belong at the receiving boundary.
- Production release while any blocking approval or smoke test remains incomplete.
- Database migration; none is defined for this client repository.

## Prerequisites and dependencies

- Phases 1–4 acceptance gates pass.
- **`PLAN-OQ01` closed:** final/licensed hero, Chivo, marks/list, distribution copy, and high-density source decision.
- **`PLAN-OQ02` closed:** endpoint, method, payload, affirmative response, timeout/retry, CORS/CSRF, server validation, abuse protection, and no-JavaScript response.
- **`PLAN-OQ03` closed:** privacy notice, consent, retention/deletion, confirmation email, monitoring, and PII-safe logging.
- **`PLAN-OQ04` closed:** Vercel ownership, root/build/output/environment/security/rollback settings.
- The approved contract identifies an accountable product/service owner and release approver.

If any prerequisite remains unresolved, this phase stays blocked and the unavailable adapter remains the production behavior.

## Expected file impact

| Path or area | State | Expected impact |
|---|---|---|
| `frontend/src/request-access/http-service.ts` | Proposed; gated | Implement the approved browser request adapter when direct-client topology is safe. |
| Same-origin server/edge request area | Conditional; gated | Implement the form action, secret isolation, validation, abuse controls, and service delegation when required. |
| `frontend/src/request-access/service.ts` | Existing after Phase 3 | Align the UI port with the approved affirmative-success contract without leaking transport details. |
| `frontend/src/main.ts` | Existing | Select the approved configured service; retain unavailable fallback for missing/invalid config. |
| `frontend/index.html` | Existing | Add the approved POST action and no-JavaScript contract. |
| `frontend/.env.example` | Proposed | Document public configuration names only; include no secret values. |
| `frontend/src/assets/images/` | Existing | Replace structural assets only with approved final sources. |
| `frontend/src/assets/fonts/` | Proposed/conditional | Add approved local Chivo WOFF2 files. |
| `frontend/tests/` and request-access tests | Existing after Phases 3–4 | Add contract and production-topology coverage. |
| Vercel configuration/handler files | Conditional | Add only after the connected project topology is verified. |
| `README.md` | Existing | Document service, privacy, environment, deployment, monitoring, and rollback contract. |

## Ordered tasks

### `P5-T01` — Close and record every production prerequisite

- **Action:** Obtain and record approvals for the final content/assets, service/API, privacy/consent/retention, abuse protection, confirmation email, monitoring/logging, and Vercel ownership/configuration represented by `PLAN-OQ01`–`PLAN-OQ04`.
- **Reason / requirements:** These decisions materially determine architecture, legal handling, visual acceptance, and release safety.
- **Expected result:** Each open question has an accountable owner, approved answer, and evidence; no implementation relies on a guessed contract.
- **Dependencies:** Phase 4 complete.
- **Verification:** Review the approval record against every field in the four plan questions. If any field is missing, stop Phase 5 and retain the unavailable adapter.

### `P5-T02` — Select and document the production topology

- **Action:** Choose direct browser submission only if the endpoint is public, secret-free, CORS-approved, server-validated, abuse-protected, and supports an accessible HTML form fallback. Otherwise choose a same-origin server/edge boundary. Record request/response, timeout, failure normalization, security, and rollback compatibility before coding.
- **Reason / requirements:** Preserves security and progressive enhancement instead of forcing a static-only architecture.
- **Expected result:** One approved topology owns both JavaScript and no-JavaScript paths and can affirm real receipt.
- **Dependencies:** `P5-T01`.
- **Verification:** Architecture review confirms no client secret, compatible CORS/CSRF behavior, independent server validation, abuse controls, HTML response, and compatible rollback window.

### `P5-T03` — Implement the approved service boundary

- **Action:** Implement the direct HTTP adapter or same-origin server/edge handler selected in `P5-T02`. Normalize/validate the email at the receiving boundary, enforce the approved timeout and affirmative-success response, map every other outcome to recoverable failure, and keep transport details behind `RequestAccessService`.
- **Reason / requirements:** Realizes `FR-008`–`FR-011`, `CONTENT-003`, and `AC-006`–`AC-008` in production.
- **Expected result:** Only an approved affirmative service result resolves success; network, timeout, malformed, missing, and unsuccessful outcomes reject safely.
- **Dependencies:** `P5-T02`.
- **Verification:** Contract tests cover valid request, invalid server input, duplicate/pending handling, affirmative success, each failure class, timeout, malformed response, and service-version compatibility.

### `P5-T04` — Complete the no-JavaScript POST path

- **Action:** Set the form’s approved `method="post"` action and implement an accessible HTML success/error response through the same receiving boundary. Preserve independent server validation and a clear path back/retry on failure.
- **Reason / requirements:** The production form must work when TypeScript fails or is unavailable; a `<noscript>` notice alone is insufficient.
- **Expected result:** JavaScript and native form submission use compatible validation/service rules without exposing the email in the URL.
- **Dependencies:** `P5-T03`.
- **Verification:** Disable JavaScript and test valid, invalid, service-failure, retry, and success responses with keyboard and screen reader; confirm POST, TLS, response focus/heading, and no raw address in URL/history.

### `P5-T05` — Configure production selection and fail-closed fallback

- **Action:** Add only approved public configuration names to `.env.example`; select the real service in `main.ts` when configuration is present and valid; retain the unavailable adapter for missing/invalid configuration. Keep all secrets at the server/edge boundary.
- **Reason / requirements:** Prevents misconfiguration from fabricating success or leaking credentials.
- **Expected result:** Preview/staging/production behavior is explicit, and absent configuration degrades to the tested recoverable error.
- **Dependencies:** `P5-T03`.
- **Verification:** Test configured and missing/invalid configurations; inspect built JS and source maps for secrets, private URLs, test fakes, and raw-email logging.

### `P5-T06` — Implement approved privacy, security, and operational controls

- **Action:** Apply the approved consent/privacy notice, retention/deletion behavior, confirmation-email behavior, CORS/CSRF policy, rate limiting or equivalent abuse protection, security headers, PII-safe logs, monitoring, alert ownership, and incident response.
- **Reason / requirements:** Client validation is UX only; production collection requires independent safeguards and accountable operations.
- **Expected result:** The receiving system rejects invalid/abusive traffic, exposes no secret, avoids unnecessary raw-email logs, and follows the approved data lifecycle.
- **Dependencies:** `P5-T01`–`P5-T05`.
- **Verification:** Security/privacy review, abuse-control test, log inspection, consent-path test, retention/deletion evidence, and monitoring/alert smoke test.

### `P5-T07` — Finalize approved content, fonts, and image assets

- **Action:** Replace structural hero/font/mark/content placeholders only with approved, licensed sources; preserve observed hierarchy/order unless approved content changes it; provide high-density/modern hero candidates without upscaling; rerun crop, wrapping, contrast, byte-size, and LCP checks.
- **Reason / requirements:** Closes `PLAN-OQ01` and prevents soft imagery, unlicensed branding, or outdated platform references from shipping.
- **Expected result:** Final visible content and locally delivered assets are approved at tested device pixel ratios and do not regress layout/performance/accessibility.
- **Dependencies:** `P5-T01`; may proceed in parallel with `P5-T03` only after approval.
- **Verification:** License/brand approval record; Figma comparison; DPR/device review; build asset inspection; font fallback/load check; LCP/CLS measurement; all responsive tests.

### `P5-T08` — Verify and document Vercel configuration

- **Action:** Confirm the owning Vercel project and record the actual root, build, output, environment, runtime, server/edge handler, security-header, monitoring, domain, and last-known-good deployment settings. Add checked-in configuration only where it reflects the verified external project.
- **Reason / requirements:** The README live URL is insufficient deployment evidence and incorrect configuration would break both submission paths.
- **Expected result:** Repository documentation and Vercel settings agree, and a compatible rollback target is identified.
- **Dependencies:** `P5-T01`, `P5-T02`, `P5-T05`, `P5-T06`.
- **Verification:** Compare dashboard/project settings with checked-in docs/config; deploy to an isolated preview; verify root `frontend`, build/output, environment scoping, headers, and handler routing as applicable.

### `P5-T09` — Run staging contract, regression, and production-smoke checks

- **Action:** Execute the complete Phase 4 gate plus real-service contract tests and JavaScript/no-JavaScript smoke journeys for invalid, pending, duplicate guard, success, failure, edit/retry, timeout, and missing configuration. Verify content, privacy, logs, monitoring, and asset fidelity.
- **Reason / requirements:** Production must revalidate the same UI contract against the real service rather than only deterministic fakes.
- **Expected result:** All 38 requirements and 20 acceptance criteria have release evidence; production code contains no test fake, secret, or unnecessary raw-email log.
- **Dependencies:** `P5-T03`–`P5-T08`.
- **Verification:** Run `pnpm run lint`, `pnpm run typecheck`, `pnpm run test`, `pnpm run test:e2e`, `pnpm run build`, contract/security tests, preview smoke tests, manual AT/device checks, and bundle/log inspection.

### `P5-T10` — Release and rehearse coordinated rollback

- **Action:** Promote the verified saved deployment, run post-release JavaScript/no-JavaScript smoke tests, confirm monitoring ownership, and rehearse or document restoration of the matching frontend, service contract, and environment/configuration snapshot.
- **Reason / requirements:** Frontend rollback alone is unsafe if the service/config contract has changed.
- **Expected result:** The production URL accepts real requests safely, and the team can return to a known-good compatible state without data loss or false success.
- **Dependencies:** `P5-T09` and explicit release approval.
- **Verification:** Production smoke evidence, monitoring signal, deployment/version identifiers, rollback checklist, and confirmation that the previous service contract remains compatible through the rollback window or is versioned.

## Responsive and accessibility work

- Rerun every Phase 4 responsive, zoom/reflow, keyboard, and AT check after final copy/assets and real service integration.
- Verify pending/failure/success announcements against actual network timing.
- Verify no-JavaScript HTML responses have meaningful headings, focus entry, error text, preserved/re-entry path, and no color-only cues.
- Ensure privacy/consent additions fit every layout and remain reachable on short viewports.
- Recheck final fonts and high-density hero for contrast, crop, wrapping, CLS, and LCP.

## Testing and validation

### Complete application gate

```bash
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run test:e2e
pnpm run build
```

### Additional production evidence

- Service contract and server-validation tests.
- Abuse, CORS/CSRF, security-header, and secret-isolation checks.
- JavaScript and no-JavaScript preview/production smoke tests.
- Privacy/consent/retention/logging/monitoring review.
- Final content/license/brand approval.
- Real Safari/iOS, keyboard, and representative screen-reader checks.
- Deployment and coordinated rollback verification.

## Acceptance gate

- `PLAN-OQ01`–`PLAN-OQ04` are closed with evidence.
- All 38 normative requirements and `AC-001`–`AC-020` pass.
- Only affirmative service receipt produces success.
- JavaScript and no-JavaScript POST paths are accessible and server-validated.
- No secrets, production test fakes, or unnecessary raw-email logging exist.
- Final content/assets/fonts are licensed, approved, and performant.
- Vercel settings, monitoring, security headers, smoke tests, and rollback are verified.
- Explicit release approval is recorded.

## Risks and recovery

| Risk | Mitigation | Recovery |
|---|---|---|
| Production inputs remain incomplete | Keep Phase 5 blocked and unavailable adapter active. | Resume only when every prerequisite has an owner and approval. |
| Direct-client endpoint is unsafe | Select same-origin server/edge topology. | Remove exposed config/credential immediately and invalidate it if leaked. |
| Service contract changes break rollback | Maintain backward compatibility or version the endpoint. | Roll back frontend, service, and config as one tested unit. |
| Real traffic causes abuse or PII leakage | Enforce server validation/rate limits and PII-safe logs. | Disable real adapter, restore unavailable behavior, and follow incident response. |
| Final assets change layout/performance | Rerun full responsive and performance suite after replacement. | Revert to the last approved asset set; never upscale structural sources. |

## Completion checklist and handoff

- [ ] All production prerequisites closed and recorded.
- [ ] Direct-client or same-origin topology approved.
- [ ] Real service boundary and contract tests pass.
- [ ] Accessible no-JavaScript POST path passes.
- [ ] Config selection fails closed and exposes no secret.
- [ ] Privacy, security, abuse, logging, and monitoring controls verified.
- [ ] Final assets/content/fonts approved and retested.
- [ ] Vercel configuration and rollback documented.
- [ ] Complete local/CI/staging/production gate passes.
- [ ] Production smoke tests and coordinated rollback evidence recorded.

**Project handoff:** Planning and implementation are complete only when this checklist and the project-level definition of done in `docs/PLAN.md` both pass. Until then, retain the unavailable production adapter and do not claim that access requests are received.
