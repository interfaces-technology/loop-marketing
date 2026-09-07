# Loop Marketing

Standalone Next.js 16 site for Loop. Live: [loop.theinterfaces.company](https://loop.theinterfaces.company). The library lives at [`interfaces-technology/loop`](https://github.com/interfaces-technology/loop) (`@theinterfaces-lab/loop`). This repository owns marketing, docs, and live examples.

## Setup

```bash
npm install
npm run dev
```

Until the package is on npm, `@theinterfaces-lab/loop` is installed from GitHub (`hamza/site-links` until that lands on main). The library `prepare` script builds `dist/`.

**MCP:** Install docs for AI assistants (`@theinterfaces-lab/loop-mcp`) are on [`/install`](/install). The server package lives in the library repo.

## Routes

`/`, `/install`, `/docs`, `/docs/api`, `/examples`, `/examples/live-text`, `/examples/dpad-square`, `/examples/sliders-cube`, `/about`.

## Quality gates

```bash
npm run lint
npm run typecheck
npm run build
```
