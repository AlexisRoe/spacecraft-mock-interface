# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

This project contains a mocked control interface for an Spacecraft. Its interactive and provides the user a playground of being a captain of an interstellar ship. The application is meant to be used also on e-ink devices and can be installed as pwa (landscape).

## Commands

```bash
npm run dev        # vite dev server on http://localhost:9055
npm run build       # tsc -b && vite build
npm run lint         # biome lint .
npm run format      # biome format --write .
npm run check       # biome check --write . (lint + format)
npm test            # vitest (watch mode)
npm run test:ui     # vitest --ui
npm run coverage    # vitest run --coverage
```

Run a single test file: `npx vitest run src/hooks/use-projects.hook.test.ts`
Run tests matching a name: `npx vitest run -t "creates a project"`

There is no separate typecheck script — `tsc -b` runs as part of `npm run build`.

Always use these commands directly rather than reimplementing what they do — `npm install` /
`npm ci` for dependencies, the `npm run <script>` commands above (as defined in `package.json`) for
build/lint/format/test, and `gh` for GitHub operations (PRs, issues, checks).

## Conventions

- **Filenames**: lowercase-kebab-case with a role suffix — `*.component.tsx` (+ matching
  `*.component.css`), `*.hook.ts`, `*.view.tsx`, each with a co-located `*.test.tsx`/`*.test.ts`.
- **JSDoc on all exported types, interfaces, and functions** — every prop, hook return field, and
  exported component/function has a `/** ... */` doc comment (see `button.component.tsx`,
  `use-projects.hook.ts`). Follow this pattern for new exports; don't skip it.
- Component prop interfaces are named `<Component>Props`; hook return types are named
  `Use<Hook>Return`.
- Biome (not ESLint/Prettier) enforces lint + format: 2-space indent, double quotes, semicolons,
  100-char line width, import organization on. Run `npm run check` before considering work done.

## E-ink UI constraints (non-negotiable for UI changes)

- No animations or CSS transitions — e-ink refresh causes visible ghosting/lag. `src/index.css`
  globally forces `transition: none; animation: none; scroll-behavior: auto;`; don't override this
  per-component.
- High-contrast black-and-white only (`#000000` / `#FFFFFF`), sharp borders, no gradients/shadows.
- Keep the feature surface small and distraction-free — this is a deliberate design constraint, not
  a gap to fill. Don't add features/animations/polish beyond what's asked.

## Testing

- Vitest + Testing Library + jsdom, config in `vite.config.ts` (`test.environment: "jsdom"`,
  globals on).
- Every component/hook/view has a co-located test file; keep that 1:1 pairing for new code.