# Lifthouse Architecture & Conventions

This document describes how the app is structured on the `overhaul` branch and the conventions new code should follow.

## Stack

Next.js 16 (App Router, Turbopack), React 19, Ant Design v6, Tailwind CSS (utilities only — preflight disabled so it doesn't fight antd's reset), Supabase (Postgres + Auth via `@supabase/ssr`), Framer Motion, deployed on Vercel.

## Directory layout

```
src/
  app/                     # App Router routes
    animations/            # Shared framer-motion wrappers (page/layout transitions)
    account/               # Public auth pages (login, signup, recovery)
    api/                   # Route handlers (thin: validate -> dbClient -> JSON)
    lifthouse/             # The authenticated app (one folder per feature)
      components/          # Shared shell components (sideNav, header, pageInfo)
      workouts/ 531/ ...   # Feature routes; colocate components/ under each
  lib/
    api.ts                 # apiRoute() wrapper for route handlers
    supabase/              # Client factories + DatabaseClient (all queries live here)
  config.ts                # Validated env access — never read process.env elsewhere
  theme.ts                 # Design tokens (antd ConfigProvider theme)
  proxy.ts                 # Next 16 proxy (middleware): session refresh + auth guard
hooks/                     # Cross-cutting client hooks (useFetch, useLocalStorage)
```

## Data flow conventions

1. **Initial page data is fetched on the server.** Pages are async server components that call `createDatabaseClient()` directly and pass data down as props (see `workouts/page.tsx`).
2. **Mutations prefer server actions** (`actions.ts` next to the feature) with `revalidatePath`, paired with `useOptimistic` for instant UI (see `workouts/workouts.tsx`).
3. **Client-side re-fetching** (charts, date-range widgets) goes through `hooks/useFetch.ts`, which throws a typed `ApiError` on non-2xx responses — always handle it.
4. **All Supabase queries live in `DatabaseClient`** (`src/lib/supabase/db/dbClient.ts`). Route handlers and server actions never query Supabase directly; they call a named method. Snake_case → camelCase mapping happens there too.
5. **Route handlers are wrapped in `apiRoute()`** from `src/lib/api.ts` so unexpected errors return a clean JSON 500 and are logged. Validate request bodies with Joi before touching the database.

## Auth

- `src/proxy.ts` refreshes the Supabase session on every matched request and redirects unauthenticated users to `/`. It also blocks users from loading another user's workout by ID.
- Server components get the user via `createSupabaseServer(cookieStore).auth.getUser()`.

## UI conventions

- **Design tokens live in `src/theme.ts`** and flow into every antd component via `ConfigProvider`. Do not hardcode colors or radii in components — add a token.
- Tailwind mirrors the tokens through CSS variables declared in `globals.css` (`bg-primary`, `text-text-secondary`, etc.).
- The app is **mobile-first**: it's used one-handed mid-workout. Generous tap targets (`controlHeight` token), drawers over modals on small screens, and content reachable near the thumb.
- Page transitions use the wrappers in `src/app/animations/`; `prefers-reduced-motion` is respected globally.
- Every data-loading route should ship a `loading.tsx` (or Suspense skeleton) and rely on the shared `error.tsx` boundary for failures.

## Environment

Copy `.env.example` to `.env.local`. All env access goes through `getConfig()` in `src/config.ts`, which fails fast with a clear message when variables are missing.

## Scripts

```
yarn dev        # local dev
yarn build      # production build
yarn lint       # eslint
yarn typecheck  # tsc --noEmit
```
