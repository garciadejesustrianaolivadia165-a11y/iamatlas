# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # dev server (Vite + React Router, port 5173)
npm run build        # SSR build → ./build/
npm run start        # serve the production build
npm run typecheck    # react-router typegen + tsc (run after adding routes or route types)
```

There are no tests.

## Architecture

**Stack:** React Router v7 (SSR, file-based routing) + Vite + Tailwind CSS v4 + TypeScript.

**Routing** — defined in `app/routes.ts` (not filesystem-based). Key routes:
- `/` → `app/routes/home.tsx` (public landing page)
- `/login`, `/signup` → `app/routes/auth/`
- `/dashboard/**` and all dashboard subroutes → wrapped by `app/routes/dashboard/layout.tsx`

**Dashboard route map:**
| Path | File |
|---|---|
| `/dashboard` | `dashboard/overview.tsx` |
| `/profile` | `dashboard/profile.tsx` |
| `/business-hub` | `dashboard/business-hub/index.tsx` |
| `/business-hub/billing/:id` | `dashboard/business-hub/billing.tsx` |
| `/clubs` | `dashboard/clubs/index.tsx` |
| `/calendar` | `dashboard/calendar/index.tsx` |
| `/settings` | `dashboard/settings/edit-profile.tsx` |
| `/settings/security` | `dashboard/settings/security.tsx` |
| `/legal` | `routes/legal.tsx` (Términos y Condiciones) |

**Landing page (`app/routes/home.tsx`)** — single ~860-line self-contained component. All CSS lives in an inline `<style>` tag, every selector prefixed `.lp-`. Dark mode toggled via `dark` boolean state, driving `.dark` class on root `.lp` div. The landing navbar dropdown items must use the route paths above — `/dashboard` for Overview, `/business-hub` for Business Hub, `/legal` for both Política de Privacidad and Políticas de Seguridad.

**Dashboard layout (`app/routes/dashboard/layout.tsx`)** — wraps every authenticated route. Contains the sticky header, responsive sidebar (220px desktop / slide-out drawer mobile), notification dropdown, and `<Outlet>`. All styling is **inline React.CSSProperties** — no Tailwind classes. The sidebar `navItems` array is the single source of truth for navigation links.

**Timeline section** (`lp-tl`) — renders a fixed 1860×1000 canvas that scales to viewport via `transform: scale(tlScale)`. SVG connectors use orthogonal paths (H/V/Q arcs). Node circles and labels are absolutely-positioned HTML divs over the SVG.

**Styling conventions:**
- Landing page: inline `<style>` tag with `.lp-` prefixed CSS rules
- Dashboard: inline `style={{ ... }}` with `React.CSSProperties` objects — no class names
- Design tokens: primary green `#78C609` / `#64A508`, accent pink `#DA007C`, text dark `#343C6A`

**SVG assets** in `/public/` — filenames are case-sensitive in Vercel/Linux deploys:
- Light mode: `Texto_0X.svg`, `Isolation_Mode_0X.svg`, `isolation_timeline.svg`
- Dark mode: `Texto_0X_dark.svg` (note: underscore before `dark`, no space)
