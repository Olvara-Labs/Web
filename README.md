# Olvara Labs Web

Marketing site for Olvara Labs, built as a Bun-powered Vite SPA with a compact enterprise-security presentation.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Bun for install, scripts, and local workflow

## Project Notes

- Client-side paths: `/`, `/products`, `/about`
- Shared global backdrop across all pages
- Vercel SPA rewrites enabled in [vercel.json](/home/nonan23x/Projects/Olvara-Labs/Web/vercel.json)
- Public product surface intentionally keeps non-flagship programs confidentiality-safe

## Commands

```bash
bun install
bun run dev
bun run build
bun run lint
```

## Deployment

Vercel is configured to:

- install with `bun install`
- build with `bun run build`
- rewrite all paths to `index.html` for SPA navigation
