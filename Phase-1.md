# Phase 1 — Foundation and Semantic Page

## Phase header

- **Phase:** 1 of 5
- **Status:** Pending
- **Objective:** Replace the generated Vite demo with a reproducible, semantic Pod request-access page foundation.
- **Expected outcome:** The repository contains meaningful HTML, the observed content and structural assets, design foundations, and a minimal TypeScript bootstrap with no Vite demo residue. This is a non-public construction state, not a release candidate.
- **Source plan revision:** `docs/PLAN.md`, Stage 6 challenged revision reviewed 2026-07-31; repository baseline `f94f1045d3a4951abc9d4be52a37229874ae1350`.

## Requirement coverage

### Requirements delivered

- `FR-001`, `FR-002`, `FR-013`
- `CONTENT-001`, `CONTENT-002`
- `A11Y-001`, `A11Y-002`, `A11Y-003`, `A11Y-004`, `A11Y-010`, `A11Y-011`

### Acceptance criteria established

- `AC-001` — structural content and semantic page inventory; responsive visual closure continues in Phase 2.
- `AC-017` — decorative platform, dot, and approved hero semantics.

## Scope and out of scope

### In scope

- Runtime and package-manager reproducibility.
- Semantic document structure and stable form markup.
- Observed initial copy and platform order.
- Local structural copies of the supplied logo, marks, dots, hero crops, and favicon.
- Base design tokens, reset, body defaults, and visually hidden labeling utility.
- Removal of generated Vite demo code and conflicting README validation copy.

### Out of scope

- Figma-fidelity responsive layout and complete control-state styling; Phase 2 owns these.
- Custom validation, asynchronous request state, or service calls; Phase 3 owns these.
- A real form action, success response, or public deployment.
- Final Chivo, high-density hero, platform-list, and asset approval.

## Prerequisites and dependencies

- Stages 1–7 planning artifacts remain current.
- Repository branch `main` is still based on revision `f94f1045…`, or any drift has been reconciled against `PLAN.md`.
- `docs/starter-code/` remains available as source evidence.
- Node `22.20.0` and pnpm `11.7.0` are acceptable reproducible versions for the Vite 8 baseline.
- No production endpoint is assumed or invented.

## Expected file impact

| Path or area | State | Expected impact |
|---|---|---|
| `frontend/package.json` | Existing | Add runtime/package-manager contract and a separate `typecheck` script. |
| `frontend/pnpm-lock.yaml` | Existing | Update only if manifest metadata or dependencies require it. |
| `.node-version` | Proposed | Pin Node `22.20.0` for local and deployment consistency. |
| `frontend/index.html` | Existing | Replace Vite mount-only markup with the complete semantic page foundation. |
| `frontend/src/main.ts` | Existing | Reduce to style imports and a behavior-free bootstrap. |
| `frontend/src/counter.ts` | Existing | Remove generated demo behavior. |
| `frontend/src/style.css` | Existing | Retire after focused styles replace it. |
| `frontend/src/styles/tokens.css` | Proposed | Define semantic color, type, spacing, size, shape, and layout tokens. |
| `frontend/src/styles/base.css` | Proposed | Add minimal reset, body defaults, and utilities. |
| `frontend/src/styles/page.css` | Proposed | Add only the structural page rules needed for a meaningful document. |
| `frontend/src/styles/request-form.css` | Proposed | Add only structural form rules; state styling continues in Phase 2. |
| `frontend/src/assets/images/` | Proposed | Copy supplied structural image and SVG assets without inventing derivatives. |
| `frontend/public/` | Existing | Replace the starter favicon and remove unreferenced Vite demo assets. |
| `README.md` | Existing | Align project behavior, commands, construction-state warning, and validation copy. |

## Ordered tasks

### `P1-T01` — Reconfirm the implementation baseline

- **Action:** Verify the branch, revision, working-tree state, manifest, lockfile, starter sources, asset inventory, and clean baseline build before editing.
- **Reason / requirements:** Prevents phase work from overwriting unreviewed repository drift and preserves the Stage 5–6 evidence baseline.
- **Expected result:** The implementer either confirms the planned baseline or records and reconciles material drift before continuing.
- **Dependencies:** None.
- **Verification:** Run `git status --short`, `git rev-parse --abbrev-ref HEAD`, `git rev-parse HEAD`, `pnpm install --frozen-lockfile`, and `pnpm run build` from the appropriate repository/application directories.

### `P1-T02` — Pin the supported runtime and expose type checking

- **Action:** Add `.node-version` with `22.20.0`; add `engines.node` compatible with that exact line, `packageManager: "pnpm@11.7.0"`, and `typecheck: "tsc"` to `frontend/package.json`. Keep the existing Vite build behavior.
- **Reason / requirements:** The repository currently has no runtime contract, and reproducible local, CI, and Vercel behavior is a plan-level prerequisite.
- **Expected result:** Corepack, pnpm, TypeScript, Vite, and later CI use one explicit runtime/package-manager contract without version-range ambiguity.
- **Dependencies:** `P1-T01`.
- **Verification:** Confirm the manifest parses; run `pnpm install --frozen-lockfile`, `pnpm run typecheck`, and `pnpm run build`.

### `P1-T03` — Establish the local asset inventory

- **Action:** Copy the supplied logo, four platform SVGs, dot pattern, three hero JPEG crops, and favicon from `docs/starter-code/` into the Vite application; remove only unreferenced Vite demo assets.
- **Reason / requirements:** Supports `FR-001`, `CONTENT-002`, `A11Y-010`, and `A11Y-011` while preserving production hashing and avoiding remote asset dependencies.
- **Expected result:** Every structural asset referenced by the page exists locally, retains its original source quality, and has a clear role. No upscaled or fabricated derivative is introduced.
- **Dependencies:** `P1-T01`.
- **Verification:** Compare filenames and dimensions with the starter inventory; run `rg` for obsolete Vite asset references; confirm the production build resolves all copied assets.

### `P1-T04` — Replace the Vite shell with semantic page markup

- **Action:** Build the essential document directly in `frontend/index.html`: language and metadata, favicon, one `main`, one coherent `h1` with presentational color spans, supporting copy, decorative hero/pattern/marks, and a real request form using a persistent label, `input type="email"`, `name="email"`, `required`, `autocomplete="email"`, `inputmode="email"`, and `button type="submit"`. Include stable validation, polite status, and success-confirmation slots for later controller ownership.
- **Reason / requirements:** Delivers `FR-001`, `FR-002`, `FR-013`, `CONTENT-001`, `CONTENT-002`, and `A11Y-001`–`A11Y-004`, `A11Y-010`, `A11Y-011`.
- **Expected result:** Essential meaning and native constraints exist before TypeScript runs. Decorative assets expose empty alternative text or group-level hiding, platform marks have no interactive wrapper, and the heading remains one accessible phrase.
- **Dependencies:** `P1-T03`.
- **Verification:** Inspect the accessibility tree and DOM; confirm one `main`, one `h1`, one form, one labeled email control, one submit control named “Request Access,” no links/buttons around platform marks, and no duplicate accessible names from decorative assets.

### `P1-T05` — Create the base design-token and style foundation

- **Action:** Translate approved palette, typography roles, spacing values, measures, radii, shadows, focus dimensions, and `44px` control minimum into semantic custom properties. Add a minimal reset, box sizing, default body colors, system fallback stack, and a canonical visually hidden utility.
- **Reason / requirements:** Provides maintainable foundations for `FR-001`, `CONTENT-001`, and the accessibility semantics introduced in this phase without scattering raw values.
- **Expected result:** The semantic document is readable and stable with CSS disabled or partially loaded, and later phase styles can consume named tokens.
- **Dependencies:** `P1-T04`.
- **Verification:** Inspect computed colors and typography fallback; confirm no global fixed viewport height or page-level overflow suppression exists; run `pnpm run build`.

### `P1-T06` — Remove generated behavior and simplify the bootstrap

- **Action:** Replace `src/main.ts` with focused style imports only, remove `src/counter.ts`, and retire the generated monolithic demo stylesheet and unused demo markup/assets.
- **Reason / requirements:** The implementation strategy keeps essential HTML server-discoverable and introduces behavior only when Phase 3 can test and fail it safely.
- **Expected result:** No counter, Vite logo, demo button, template-string page rendering, or dead starter listener remains.
- **Dependencies:** `P1-T04`, `P1-T05`.
- **Verification:** Use `rg` for `counter`, Vite demo copy, and old asset names; load the development page with JavaScript disabled and confirm essential content and native controls remain present.

### `P1-T07` — Align repository documentation with the approved contract

- **Action:** Update `README.md` with the exact local commands, runtime/package-manager versions, vanilla architecture summary, semantic form intent, asset gates, and explicit non-releaseable status. Replace the legacy empty-email message with “Oops! Please check your email”.
- **Reason / requirements:** Prevents the repository README from competing with `CONTENT-001` and `FR-006` during later implementation.
- **Expected result:** Contributors see one validation contract and understand that this phase must not be published as a working request form.
- **Dependencies:** `P1-T02`, `P1-T06`.
- **Verification:** Search the repository for “Oops! Please add your email” and confirm no matches; manually compare README commands with `package.json`.

### `P1-T08` — Verify the semantic construction state

- **Action:** Run the available type/build checks and complete a manual semantic/accessibility inspection at default browser settings and with CSS or JavaScript unavailable.
- **Reason / requirements:** Provides objective proof for Phase 1 coverage and a safe handoff to responsive styling.
- **Expected result:** The document has the complete content inventory, stable native form semantics, correct decorative treatment, no demo residue, and no broken local assets.
- **Dependencies:** `P1-T02`–`P1-T07`.
- **Verification:** `pnpm run typecheck`, `pnpm run build`, browser accessibility-tree inspection, keyboard traversal, image failure check, and a clean `git diff --check`.

## Responsive and accessibility work

- Preserve one DOM order: brand, heading, supporting copy, form, then decorative marks.
- Keep the heading’s color spans inside one `h1`.
- Use a persistent label even if it is visually hidden to match the design.
- Keep native constraints active; Phase 1 adds no `noValidate`.
- Keep hero, dots, and platform marks out of the accessibility tree and focus order.
- Do not use fixed sample-frame heights or hide page overflow.
- Treat the supplied hero crops as structural `1x` evidence pending final approval.

## Testing and validation

### Known commands

```bash
pnpm install --frozen-lockfile
pnpm run typecheck
pnpm run build
```

### Manual checks

- Essential content is present before TypeScript executes.
- Email label, purpose, required state, and submit semantics are exposed.
- Enter and CTA remain native form actions even though custom behavior is not implemented.
- Platform marks, dots, and hero do not appear as focus stops or named accessibility-tree items.
- Long content is not clipped by foundation styles.
- Phase 1 is not deployed to the public live URL.

## Acceptance gate

- All Phase 1 tasks and checks pass.
- `AC-001` has its structural inventory and semantic foundation; Phase 2 may assume the markup will not be duplicated.
- `AC-017` decorative semantics pass.
- The README validation conflict is removed.
- Runtime, package manager, typecheck, and build are reproducible.
- No public preview or production release occurs from this construction state.

## Risks and recovery

| Risk | Mitigation | Recovery |
|---|---|---|
| Repository drift invalidates planned paths | Reconfirm baseline before editing. | Stop, reconcile the plan, and do not force changes over user work. |
| Form posts to an unapproved destination | Do not invent an endpoint; keep the phase non-public. | Remove any accidental action/config and restore the semantic-only construction state. |
| Decorative assets gain redundant semantics | Use empty alt/group hiding and no interactive wrappers. | Correct markup before Phase 2; recheck the accessibility tree. |
| Starter assets are deleted too broadly | Remove only verified unreferenced demo files. | Restore the specific file from git or source evidence; never reset unrelated work. |
| Missing Chivo blocks foundation work | Use the documented system fallback; final typography remains gated. | Add approved local WOFF2 later and rerun layout checks. |

## Completion checklist and handoff

- [ ] Baseline and clean build reconfirmed.
- [ ] Node/pnpm contract and `typecheck` script added.
- [ ] Structural assets copied without fabricated variants.
- [ ] Semantic page and native form present in raw HTML.
- [ ] Base tokens/styles added; no fixed-height clipping.
- [ ] Vite demo code and dead assets removed.
- [ ] README conflict and commands corrected.
- [ ] Typecheck, build, semantic, keyboard, and accessibility-tree checks pass.
- [ ] Construction state remains non-public.

**Phase 2 may assume:** stable semantic markup, local structural assets, named design tokens, no generated demo code, native form constraints, and a reproducible Vite/TypeScript baseline.
