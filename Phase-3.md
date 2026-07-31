# Phase 3 — Request Form Behavior and Service Boundary

## Phase header

- **Phase:** 3 of 5
- **Status:** Pending
- **Objective:** Implement and test the finite request-access state model, submission-first validation, accessible feedback, retry behavior, and fail-closed service boundary.
- **Expected outcome:** Every UI outcome is proven with deterministic test services, while the production bootstrap transmits nothing and cannot fabricate success. This is the first baseline eligible for a public preview, not a production release.
- **Source plan revision:** `docs/PLAN.md`, Stage 6 challenged revision reviewed 2026-07-31; repository baseline `f94f1045d3a4951abc9d4be52a37229874ae1350`.

## Requirement coverage

### Requirements delivered

- `FR-003`, `FR-004`, `FR-005`, `FR-006`, `FR-007`, `FR-008`, `FR-009`, `FR-010`, `FR-011`
- `CONTENT-003`
- `A11Y-005`, `A11Y-008`, `A11Y-009`

### Acceptance criteria delivered

- `AC-002`, `AC-003`, `AC-004`, `AC-005`, `AC-006`, `AC-007`, `AC-008`
- `AC-016`

### Continuing requirements re-verified

- `FR-002`, `FR-012`
- `A11Y-003`, `A11Y-004`, `A11Y-006`, `A11Y-007`

## Scope and out of scope

### In scope

- Email normalization and native syntax validation.
- Explicit `idle`, `validation-error`, `submitting`, `service-error`, and `success` states.
- Controller initialization, event ownership, teardown, duplicate guard, and stale-result protection.
- Non-duplicating validation, status, and success announcement paths.
- Service port, production-safe unavailable adapter, and test-only deterministic services.
- Minimal Vitest, DOM environment, and accessible DOM-query test tooling.

### Out of scope

- Real HTTP request transmission or production success.
- Browser automation, automated accessibility smoke checks, CI, and compatibility audit; Phase 4 owns these.
- Final service topology, privacy contract, abuse protection, no-JavaScript production response, and Vercel release.

## Prerequisites and dependencies

- Phases 1 and 2 acceptance gates pass.
- Exact approved state copy and treatments remain:
  - Submitting: “Requesting…”
  - Service error: “We couldn’t submit your request. Please try again.”
  - Success: “Thanks! Your request has been received.”
- Native constraints remain in raw HTML.
- Custom validation may set `form.noValidate = true` only after complete controller initialization.
- Production code must import only the unavailable service until Phase 5.

## Expected file impact

| Path or area | State | Expected impact |
|---|---|---|
| `frontend/src/main.ts` | Existing | Initialize the controller with the production-safe unavailable adapter. |
| `frontend/src/request-access/validation.ts` | Proposed | Normalize and validate one email with native validity semantics. |
| `frontend/src/request-access/service.ts` | Proposed | Define the narrow asynchronous service port and affirmative-success contract. |
| `frontend/src/request-access/unavailable-service.ts` | Proposed | Reject without transmitting the email. |
| `frontend/src/request-access/controller.ts` | Proposed | Own state, events, DOM/ARIA synchronization, focus, guard, and teardown. |
| `frontend/src/request-access/*.test.ts` | Proposed | Unit and DOM integration coverage with test-only services. |
| `frontend/vitest.config.ts` | Proposed | Configure the DOM-capable unit/integration environment. |
| `frontend/package.json` and lockfile | Existing | Add minimal test dependencies and `test` script. |
| `frontend/index.html` | Existing | Adjust stable hooks/ARIA containers only if controller integration proves necessary. |
| `frontend/src/styles/request-form.css` | Existing | Bind approved visual hooks to controller-owned state without changing Phase 2 design. |
| `README.md` | Existing | Document preview-safe fail-closed behavior and test command. |

## Ordered tasks

### `P3-T01` — Revalidate the responsive construction state

- **Action:** Confirm Phases 1–2 gates, exact copy, semantic form attributes, style hooks, accessibility order, and non-public status before introducing behavior.
- **Reason / requirements:** Prevents controller code from compensating for markup/style defects and preserves phase boundaries.
- **Expected result:** Behavior starts from a passing, single-form document.
- **Dependencies:** Phases 1–2 complete.
- **Verification:** Run `pnpm run typecheck`, `pnpm run build`, inspect form markup and computed states, and confirm a clean `git diff --check`.

### `P3-T02` — Add minimal unit and DOM test infrastructure

- **Action:** Add Vitest, one DOM environment, Testing Library DOM helpers, and user-event support as development-only dependencies; add `test` and any required setup/config without changing runtime dependencies.
- **Reason / requirements:** Stage 6 requires behavior tests to arrive with the behavior they verify.
- **Expected result:** Feature-scoped TypeScript tests can query native controls by role/name and run deterministically.
- **Dependencies:** `P3-T01`.
- **Verification:** Run an initial passing smoke test, `pnpm run test`, `pnpm run typecheck`, and `pnpm run build`.

### `P3-T03` — Implement and test email normalization/validation

- **Action:** Create a pure validation module that trims leading/trailing whitespace, evaluates empty and standard single-email validity through native platform semantics, and returns a typed result without provider/domain restrictions.
- **Reason / requirements:** Delivers `FR-004`, supports `FR-005`–`FR-007`, and proves `AC-003`, `AC-005`.
- **Expected result:** The same normalized value drives local validation and later service submission.
- **Dependencies:** `P3-T02`.
- **Verification:** Unit tests cover empty, whitespace-only, invalid syntax, valid syntax, surrounding whitespace, and values that the native email constraint accepts.

### `P3-T04` — Define the service port and fail-closed adapters

- **Action:** Define `RequestAccessService` so it accepts one normalized email and resolves only for an affirmative success result. Add an unavailable production adapter that sends nothing and rejects recoverably. Keep success, failure, deferred, timeout, malformed, and stale services inside test-only modules/fixtures.
- **Reason / requirements:** Delivers the architectural boundary for `FR-008`–`FR-011` without creating false production receipt.
- **Expected result:** Production has no endpoint, secret, network transmission, or success fake; tests can drive every UI outcome.
- **Dependencies:** `P3-T02`, `P3-T03`.
- **Verification:** Unit tests prove unavailable behavior sends nothing; inspect production import graph/build output for test fakes and endpoint strings.

### `P3-T05` — Initialize the controller atomically

- **Action:** Resolve and type-check every required form/control/feedback element, attach all listeners, and set `form.noValidate = true` only after initialization succeeds. Return a teardown function that removes listeners and invalidates pending completions.
- **Reason / requirements:** Preserves native constraints when JavaScript fails and prevents partial behavior ownership.
- **Expected result:** Successful initialization owns one submit path; failed initialization leaves native form behavior intact and does not partially mutate ARIA/state.
- **Dependencies:** `P3-T03`, `P3-T04`.
- **Verification:** DOM tests cover complete initialization, missing required elements, listener attachment, `noValidate` timing, repeated initialization policy, and teardown.

### `P3-T06` — Implement submission-first validation and correction recovery

- **Action:** Route Enter, pointer, and touch through the form `submit` event. On invalid submission, block the request, preserve the typed value, show exact validation feedback, set the synchronized invalid association/state, and focus the field. After a validation failure, use `input` and `change` to clear the error only when the current value becomes valid; do not restore it on later invalid editing without another submit.
- **Reason / requirements:** Delivers `FR-003`–`FR-007`, `A11Y-005`, `A11Y-008`, and `AC-002`–`AC-005`, `AC-016`.
- **Expected result:** Validation timing is predictable across typing and browser autofill and never calls the service for invalid input.
- **Dependencies:** `P3-T05`.
- **Verification:** DOM tests use role/name queries and cover initial editing, empty/invalid submit by Enter and button, exact copy, value retention, error association/announcement, correction, autofill/change, and later invalid editing.

### `P3-T07` — Implement guarded submitting and stale-result safety

- **Action:** On valid submit, snapshot the normalized email, enter `submitting`, set “Requesting…”, make the input read-only, keep the CTA focusable with `aria-disabled="true"`, expose busy/progress through one polite status channel, and guard repeat submits. Use a request generation/token or equivalent so teardown and late/stale completions cannot overwrite current state.
- **Reason / requirements:** Delivers `FR-008`, `A11Y-009`, `AC-006`, and the Stage 6 duplicate/stale-result corrections.
- **Expected result:** Exactly one request is pending, geometry remains stable, focus is not lost, and every non-success exit can restore operability.
- **Dependencies:** `P3-T05`, `P3-T06`.
- **Verification:** DOM tests cover repeated activation, retained normalized value, focusable guarded CTA, read-only input, busy/status attributes, teardown, deferred completion, and stale/late results.

### `P3-T08` — Implement service-error recovery and retry

- **Action:** Treat rejection, timeout, unavailable service, malformed response, missing result, and any non-affirmative outcome as `service-error`. Restore input editability and CTA availability before showing the exact recoverable message; preserve the email; keep validation semantics independent; allow edit or retry through the normal path.
- **Reason / requirements:** Delivers `FR-010`, `FR-011`, `CONTENT-003`, `A11Y-009`, and `AC-008`.
- **Expected result:** Failure never claims success, loses the value, sets false email invalidity, duplicates announcements, or leaves controls locked.
- **Dependencies:** `P3-T07`.
- **Verification:** DOM tests cover network failure, unavailable adapter, timeout, malformed/missing response, restoration order, one polite announcement, edit-before-retry, direct retry, and later success/failure.

### `P3-T09` — Implement affirmative inline success

- **Action:** On affirmative service success only, clear stale live status, replace the complete form slot with the exact success confirmation, add `tabindex="-1"` to the confirmation, and move focus there without a duplicate live announcement.
- **Reason / requirements:** Delivers `FR-009`, `CONTENT-003`, `A11Y-009`, and `AC-007`.
- **Expected result:** The visitor stays on the page, the form is gone, the confirmation is immediately discoverable, and no ambiguous outcome becomes success.
- **Dependencies:** `P3-T07`.
- **Verification:** DOM tests cover affirmative success, no redirect, form replacement, focus target, cleared status, one announcement path, and rejection of malformed/non-affirmative results.

### `P3-T10` — Wire the production-safe bootstrap and complete the preview gate

- **Action:** Initialize the controller from `main.ts` with only the unavailable adapter; bind controller state hooks to the Phase 2 styles; document preview behavior and test commands; inspect the production bundle for test fakes, endpoints, secrets, or fabricated success paths.
- **Reason / requirements:** Makes Phase 3 the first safe public-preview baseline while preserving the Phase 5 release gate.
- **Expected result:** The built page demonstrates validation and recoverable unavailability but cannot transmit an address or display success in production; tests still prove all outcomes through dependency injection.
- **Dependencies:** `P3-T02`–`P3-T09`.
- **Verification:** `pnpm run test`, `pnpm run typecheck`, `pnpm run build`, keyboard-only manual pass, targeted screen-reader announcement pass, JavaScript-disabled check, bundle/source-map inspection, and `git diff --check`.

## Responsive and accessibility work

- Reuse the Phase 2 layout; dynamic feedback stays in normal flow and may increase page height.
- Keep validation feedback associated with the field and focus the field after invalid submit.
- Do not mirror validation text into the asynchronous status channel.
- Keep focus stable for pending/failure; announce those states through one polite status region.
- Restore operability before exposing service-error feedback.
- Clear live status and focus the confirmation on success.
- Keep CTA hover/pressed/focus and field value/autofill/invalid states independent.
- Verify every dynamic state at mobile, tablet-like, and desktop modes.

## Testing and validation

### Known commands after `P3-T02`

```bash
pnpm run test
pnpm run typecheck
pnpm run build
```

### Required behavior coverage

- No error before first submit.
- Empty/invalid submit, trimming, exact copy, no service call.
- Correction and browser-autofill recovery.
- Enter and CTA equivalence.
- One pending request and duplicate guard.
- Unavailable, failure, timeout, malformed, missing, teardown, and stale-result handling.
- Value preservation, restoration, retry, and edit-before-retry.
- Affirmative success only.
- Invalid, busy, error, and success focus/ARIA synchronization.
- Initialization failure leaves native constraints active.

## Acceptance gate

- All Phase 3 requirements and acceptance criteria pass in unit/DOM tests and targeted manual checks.
- Production imports only the unavailable adapter and transmits nothing.
- Production cannot show success without a real affirmative service result.
- Initialization and teardown fail safely.
- The first public preview, if created, is explicitly labeled as service unavailable and is not promoted to production.
- Phase 4 can exercise the feature without adding alternate application behavior.

## Risks and recovery

| Risk | Mitigation | Recovery |
|---|---|---|
| Native validation prevents the owned submit path | Set `noValidate` only after controller initialization. | Remove custom ownership and restore native constraints until initialization is correct. |
| Validation/status is announced twice | Assign one channel per state and test representative AT. | Remove duplicate live role/association before proceeding. |
| Pending state traps controls | Keep CTA focusable and guard behavior in code; restore on every exit. | Force transition to service error and restore editability/availability. |
| Test fakes enter production | Keep them in test-only modules and inspect the production graph. | Remove the import, rebuild, and block preview until the bundle is clean. |
| Late response overwrites current state | Use teardown/generation protection. | Ignore invalidated completion and restore the last valid controller state. |

## Completion checklist and handoff

- [ ] Phase 2 handoff revalidated.
- [ ] Minimal Vitest/DOM tooling and scripts pass.
- [ ] Validation module and tests complete.
- [ ] Service port and unavailable adapter complete.
- [ ] Atomic controller initialization/teardown complete.
- [ ] Validation, submitting, failure/retry, and success transitions complete.
- [ ] Announcement/focus ownership verified without duplication.
- [ ] Production bootstrap imports no success fake or endpoint.
- [ ] Test, typecheck, build, manual keyboard/AT, and bundle checks pass.

**Phase 4 may assume:** complete testable UI behavior, a production-safe unavailable adapter, deterministic test-only services, responsive state styling, and no approved real endpoint or production deployment contract.
