# ComeOn Casino Test Task

This repository is solution to the ComeOn frontend assignment: a miniature online casino where the player signs in, picks a game in the lobby, and plays it on a dedicated screen. It is a single-page application written in **React 19 + TypeScript**, with **RTK Query** responsible for all server communication. The backend is the `json-server` mock that ships with the assignment.

## Functionality

- Sign-in with client-side validation and readable server errors; logout from the lobby.
- Guarded routing: protected pages redirect anonymous visitors to the login screen, and after authentication the player lands back on the URL they originally requested. A page refresh does not end the session.
- Free-text search and category filters in the lobby. Filter state is written into the query string, so any filtered view of the catalogue is linkable and refresh-proof.
- A game screen that resolves the requested game code and starts it through the casino's launcher script (`comeon.game-1.1.min.js`), which mounts the game inside an iframe. Missing engine and unknown codes degrade into explicit error states.
- Skeleton loaders, per-section error banners, an application-level error boundary, and a 404 route.
- A test suite (Vitest, Testing Library, MSW) and a CI pipeline that keeps the main branch green.

## Technology choices

- **React 19 + TypeScript (strict).** The core of the task. Native approuch React 19's `useActionState` used to model login form's pending and error states.
- **Vite 8.** Build tooling: instant HMR in development, a static bundle for production.
- **Redux Toolkit + RTK Query.** RTK Query owns everything fetched from the server: typed hooks are generated per endpoint, and caching, request deduplication, and loading/error lifecycles come built in. The Redux store itself holds only the authenticated player.
- **Axios.** The transport underneath RTK Query via a hand-written `axiosBaseQuery`; every failed request is converted into a single typed `ApiError` object, giving the whole UI one error contract.
- **Zod.** Each response is parsed by a schema inside `transformResponse` before it may enter the cache, so malformed or untyped data never reaches application code. The same schema re-validates the session cookie on startup.
- **React Router 7.** A nested route tree where `NonAuthLayout` / `ProtectedLayout` implement the guarding, and the lobby's filter state is persisted in search params.
- **Tailwind CSS v4 + class-variance-authority (with clsx / tailwind-merge).** Styling plus a small set of design-system primitives — button, input, banner, skeleton — whose variants are declared through CVA. Theme tokens are defined with `@theme` in `src/index.css`; v4 needs no config file.
- **Vitest + React Testing Library + MSW.** Tests exercise behaviour through the DOM, and MSW intercepts traffic at the network level, so the data layer is tested exactly as it runs in the browser.
- **GitHub Actions CI** (`.github/workflows/ci.yml`). Runs ESLint, the type-check + build, and the test suite on every push and on every pull request, so a branch cannot be merged with failing checks.
- **json-server 0.17.4.** The assignment's mock API (games, categories, `/login`, `/logout`). The version is pinned because later releases dropped the `--middlewares` flag that the auth middleware depends on.
- **ESLint + typescript-eslint.** Static analysis including the react-hooks rules, enforced locally and in CI.

### Project structure

```
src/
├─ api/         RTK Query root (appApi) + injected auth/games endpoints, axios base query
├─ store/       store wiring and the auth slice
├─ pages/       login, games, game-play, not-found — each with its own hooks, components, tests
├─ layouts/     RootLayout, NonAuthLayout, ProtectedLayout
├─ components/  shared UI primitives, SVG icons, forms, error boundary
├─ lib/         Zod schemas, constants, utilities
├─ hooks/       typed store hooks and selectors
└─ test/        Vitest setup, MSW server and handlers, render helpers
```

The `auth` slice contains no login logic of its own — it listens to RTK Query matchers (`login.matchFulfilled`, `logout.matchFulfilled/Rejected`) and stays a projection of what the API layer did. Folders expose barrel `index.ts` files, and imports go through the `@/` alias.

## Running locally

You need **Node.js 20.19+** (the CI pipeline runs Node 22) and npm.

1. `npm install`
2. `cp .env.example .env` — the only variable is `VITE_API_URL`, pointing at the mock API (`http://localhost:3001` by default).
3. `npm run mock` — starts json-server on port 3001; run it in a separate terminal.
4. `npm run dev` — serves the app at `http://localhost:5173`.

Demo credentials defined by the mock backend: `rebecka / secret`, `eric / dad`, `stoffe / rock`.

Other scripts:

- `npm run test` / `npm run test:watch` — Vitest, single run or watch mode.
- `npm run lint` — ESLint.
- `npm run build` — `tsc -b` followed by `vite build`; doubles as the type-check.
- `npm run preview` — serves the production bundle.

## Trade-offs

**1. Game content cannot actually load — the vendor's CDN rejects the request.**

On the game screen the launcher does its part: the script is loaded globally, `window.comeon.game.launch(code)` is invoked, and an iframe appears in the mount node. What that iframe receives from the game vendor's CloudFront distribution, however, is an HTTP 403:

> 403 ERROR — The request could not be satisfied. Request blocked. We can't connect to the server for this app or website at this time… Generated by cloudfront (CloudFront)
> (Screenshot of error message in project root named as screenshot.png)

The games are licensed content, and the CDN serves them only to approved origins and regions, so this failure sits entirely outside the application boundary. Everything up to that boundary — resolving the code, invoking the launcher, the error states, iframe cleanup on unmount — is implemented and covered by tests.

**2. The signed-in player is persisted in ordinary cookies.**

The mock API has no way to answer "who am I?": it exposes `/login` and `/logout`, issues no session identifier, and offers no endpoint for restoring a session. Without client-side persistence, every refresh would sign the player out. My compromise: after a successful login the player object is mirrored into cookies (an `isAuth` flag plus a serialized `player`), and on startup the store is initialized from them, with the cookie payload re-validated by the same Zod schema as the login response. I treat this strictly as UX-level persistence — a JS-readable cookie is not an authentication mechanism — and the proper design is described below.

## From test task to production

**Server side:**

- Genuine registration and authentication, with sessions issued by the server as `HttpOnly` / `Secure` / `SameSite` cookies so that identity material never touches JavaScript.
- An endpoint such as `GET /me` that derives the current player from the session cookie; the client restores a session with one request instead of reading cookies itself.
- Catalogue pagination and filtering implemented by the API, rather than delivering the complete game list to every client.
- Request throttling per client IP — above all on `/login` — against brute force and scraping.
- Media (game tiles, avatars) served from AWS S3 behind CloudFront instead of from the application server.
- A Selenium e2e suite that walks the primary user journey: authentication → filtering the lobby → opening a game → logout.

**Client side:**

- Lobby pagination built on top of the server-side implementation above.
- Session restore through the `GET /me` request, replacing the cookie mechanism.
- Migration to Next.js — for first-class SSR, the SEO optimizations that come with it (server-rendered markup, per-route metadata), and out-of-the-box compatibility with hosting platforms such as Vercel or AWS Amplify Hosting; plus file-system routing and per-route layouts.
- A structured AI development workflow: area-scoped `CLAUDE.md` files plus dedicated skills and hook scripts, so that coding agents operate with narrow, accurate context.
- Storybook as living documentation for the design-system primitives and their variants.

## A remark on scope

Some architectural decisions, such as using Redux Toolkit with RTK Query, are more than this three-screen application strictly needs. Local state and simple API calls would have been sufficient.

These choices were made to keep the project ready for future growth. The structure reflects how the application would typically evolve as it expands into a larger production codebase, rather than being optimized only for its current size.
