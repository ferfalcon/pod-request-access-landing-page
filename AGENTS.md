# Repository Guidelines

## Project Structure & Module Organization

The active Vite application lives in `frontend/`. Put application code in `frontend/src/`; `main.ts` is the entry point, `style.css` holds global styles, and reusable images belong in `src/assets/`. Files served unchanged belong in `frontend/public/`.

`docs/starter-code/` contains the original static implementation; treat it as reference unless a task targets it. Root files such as `SPEC.md`, `DESIGN.md`, `PLAN.md`, and `Phase-*.md` record requirements and decisions. `preview.jpg` is the target preview.

## Build, Test, and Development Commands

Run commands from `frontend/` inside WSL:

```bash
pnpm install       # Install the locked dependency set
pnpm dev           # Start Vite with hot module replacement
pnpm build         # Type-check, then create the production bundle in dist/
pnpm preview       # Serve the production bundle locally for final review
```

Use locked dependencies and commit `pnpm-lock.yaml` when they change.

### Environment Notes

The repository is stored in WSL2 Ubuntu 24.04. The verified login-shell toolchain is Node `v24.18.0`, pnpm `11.10.0`, and npm `11.16.0`. Run commands from a WSL login shell; Windows Node/pnpm cannot reliably execute scripts from the `\\wsl.localhost\...` UNC path. From PowerShell, use:

```powershell
wsl -d Ubuntu-24.04 -- bash -lic "cd '/home/fer/code/Pod request access landing page/pod-request-access-landing-page/frontend' && pnpm build"
```

## Coding Style & Naming Conventions

Follow the existing two-space indentation. TypeScript uses ES modules, single quotes, and no semicolons. Keep the strict checks in `tsconfig.json` passing: unused locals, unused parameters, and switch fallthrough are errors. Use `camelCase` for variables and functions, `PascalCase` for types, and descriptive kebab-case for asset filenames. Prefer semantic HTML, accessible labels and alt text, CSS custom properties for shared values, and mobile-first responsive rules.

No formatter or standalone linter is configured. Match nearby code and use `pnpm build` as the required static check.

## Testing Guidelines

There is no automated test framework or coverage requirement. Run `pnpm build`, then verify through `pnpm preview`. Check responsive layouts, keyboard focus, hover states, and empty and malformed-email validation. If tests are introduced, place them beside the module as `*.test.ts` and add a script to `package.json`.

## Commit & Pull Request Guidelines

History uses short, imperative summaries, sometimes with Conventional Commit prefixes such as `feat:` and `fix:`. Prefer that form, for example `fix: preserve form error spacing`. Keep each commit focused.

Pull requests should explain the user-visible change, list verification, and link the relevant issue or specification section. Include before/after screenshots for visual work and note responsive or accessibility impact.
