# CLAUDE.md

## Project

Retro UK music charts app (Top of the Pops style). Fetches UK top 40 from Last.fm and displays chart positions.

## Commands

```bash
npm run dev          # dev server
npm test             # tests in watch mode
npm run test:run     # tests once (use this to verify)
npm run typecheck    # TypeScript check
npm run build        # production build
```

## Key Conventions

- **TDD**: write the test first, then the implementation
- **Small steps**: one failing test → make it pass → refactor
- **Pure functions first**: prefer pure functions (e.g. `transformChart`) over side-effectful code — they're easier to test
- **Injectable dependencies**: the `fetchFn` pattern in `lastfm.ts` (pass fetch as a parameter) avoids `vi.mock()` module patching — follow this pattern for any new external dependencies
- **No `vi.mock()` for the service layer** — inject mocks via function parameters instead

## Architecture

```
types/chart.ts          ← define types here first; everything else imports from here
services/lastfm.ts      ← API adapter (injectable fetchFn)
utils/transformChart.ts ← pure function: raw API response → ChartEntry[]
hooks/useChart.ts       ← orchestrates fetch + React state
components/             ← one subdirectory per component, test co-located
```

Data flow: `useChart` → `fetchTopTracks` → `transformChart` → `ChartList` → `ChartEntry`

## Environment

Requires `.env.local` with `VITE_LASTFM_API_KEY`. Copy from `.env.example`. API endpoint: `geo.getTopTracks?country=united+kingdom`.

## Testing Patterns

- `transformChart` — no mocks needed, just call the pure function
- `fetchTopTracks` — pass a `vi.fn()` as the second argument
- Components — React Testing Library; use `aria-label` / role queries where possible
- `useChart` — `vi.spyOn(lastfmService, 'fetchTopTracks')` + `renderHook` + `waitFor`
