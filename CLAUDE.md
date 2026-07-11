# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the project root (this directory).

- `npm run dev` — start Vite dev server (HMR).
- `npm run build` — type-check (`tsc -b`) then production build. Use this to catch type errors; there is no separate typecheck script.
- `npm run lint` — ESLint over the repo.
- `npm run preview` — serve the production build.

There is no test runner configured.

The app expects a backend at `VITE_API_URL` (default `http://localhost:3001`). A mock backend lives in `mock/`: `mock-data.json` supplies `games` and `categories`, and `mock-api.cjs` is middleware that handles `POST /login` and `POST /logout` (valid users and passwords are defined at the top of `mock-api.cjs`, e.g. `rebecka` / `secret`). Serve these with json-server; copy `.env.example` to `.env` to point the app at it.

## Tech stack

- **React 19** + **TypeScript** (strict, `noUnusedLocals`/`noUnusedParameters`), built with **Vite 8**.
- **Redux Toolkit + RTK Query** for state and data fetching (`@reduxjs/toolkit`, `react-redux`).
- **Axios** as the RTK Query transport via a custom base query.
- **Zod** validates every API response before it reaches the app.
- **React Router 7** (`react-router` / `react-router-dom`) for routing.
- **Tailwind CSS v4** (config-less; theme defined in `src/index.css` via `@theme`). Class merging through `clsx` + `tailwind-merge` (the `cn` helper) and variants via `class-variance-authority`.
- Path alias `@/` → `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`).

## Architecture

**Data layer (`src/api/`).** A single RTK Query API (`appApi` in `api/appApi.ts`) is the root; feature endpoints (`api/auth/authApi.ts`, `api/games/gamesApi.ts`) are added with `injectEndpoints`, exporting typed hooks (`useLoginMutation`, `useGetGamesQuery`, etc.). `api/baseQuery.ts` wraps the shared `axiosInstance` (`api/axios.ts`) in an `axiosBaseQuery` that normalizes failures into a typed `ApiError` (with `isApiError` guard). Every endpoint's `transformResponse` runs the raw payload through a Zod schema from `src/lib/schema/`, so components consume validated, typed data.

**Store (`src/store/`).** `store.ts` wires the `auth` slice and `appApi` reducer/middleware. `authSlice/slice.ts` holds the logged-in `player`; it reacts to `login`/`logout` RTK Query matchers in `extraReducers` and mirrors auth state into cookies (`isAuth`, `player`) via `setCookie`. Use the typed `useAppDispatch` / `useAppSelector` hooks from `src/hooks/`.

**Auth flow.** Login uses React 19's `useActionState` (`pages/login/hooks/useLoginForm.ts` + `loginAction.ts`), not a form library. Session persistence is cookie-based: `ProtectedLayout` (`layouts/auth/`) reads the `isAuth`/`player` cookies, rehydrates the store on mount, and redirects unauthenticated users to `/` (preserving the intended location in router state for post-login redirect).

**Game launch.** The ComeOn game engine is loaded as a plain script in `index.html` (`/lib/comeon.game-1.1.min.js`) and exposed on `window.comeon.game.launch(code)` (typed in `src/comeon.d.ts`). `pages/game-play/components/GameFrame.tsx` calls it inside an effect against a host `div`; the engine injects the game `iframe` there.

**Routing (`src/routes.tsx`).** Nested under `RootLayout` (header/footer + `Suspense`): `NonAuthLayout` → `LoginPage` at index; `ProtectedLayout` → `GamesPage` (`/games`) and `GamePlayPage` (`/games/:code`); a catch-all `NotFoundPage`. Route path constants are in `src/lib/constants/routes.ts`.

**Conventions.** Barrel `index.ts` files re-export from each folder (`@/components`, `@/lib`, `@/api`, etc.) — import from the barrel, not deep paths. Shared UI primitives live in `src/components/ui/` (with `*Variants.ts` CVA definitions kept beside the component); SVG icons in `src/components/svg/icons/`. Page-specific logic (hooks, sub-components, types) is colocated under that page's folder in `src/pages/`.

## Pages

- **LoginPage** (`/`) — credential form; on success redirects to `/games` (or the originally requested route).
- **GamesPage** (`/games`) — authenticated home: user info, logout, searchable game list, and category filtering (`useFilters`), with loading skeletons and per-section error banners.
- **GamePlayPage** (`/games/:code`) — resolves the game by `code` and launches it via `GameFrame`; shows "Game not found" or an error banner otherwise.
- **NotFoundPage** — catch-all 404.
