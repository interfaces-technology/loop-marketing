# Repo Map — read this INSTEAD of crawling the codebase

Update this file in the **same PR** whenever structure changed.

## What this is

Loop marketing site — public Next.js 16 site for `@theinterfaces-lab/loop`.
The library lives in [`interfaces-technology/loop`](https://github.com/interfaces-technology/loop) and is not in this repo.

## Where new things go

| Kind | Path |
| --- | --- |
| Route | `app/<path>/page.tsx` |
| Shared chrome | `components/site-chrome.tsx` |
| Live demos | `components/*-demo.tsx` (client components) |
| Nav / copy constants | `lib/site.ts` |
| Docs copy | `app/docs/**` |

Do not add the Loop library source here. Depend on `@theinterfaces-lab/loop`.

## Routes

- `/` — landing
- `/install` — npm + script tag
- `/docs` — spec: principles, wire, components
- `/docs/api` — public API
- `/examples` — example index
- `/examples/live-text`, `/examples/dpad-square`, `/examples/sliders-cube`
- `/about` — Interfaces Lab, what Loop is not
