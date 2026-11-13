# 360 Tour Demo

Lightweight, high-performance 360° virtual tour application designed for industrial facilities and engineering installations. Built with **Preact**, **TypeScript**, **CSS3 (Zero-Framework)**, and **Photo Sphere Viewer (WebGL)**.

---

## Architecture & Technology Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **UI Framework** | [Preact 10](https://preactjs.com/) | Minimal footprint (~3KB core), native JSX, fast reactive state updates |
| **Bundler** | [Vite 6](https://vite.dev/) | Instant HMR and optimized production rollup chunk splitting |
| **360° Engine** | [@photo-sphere-viewer/core](https://photo-sphere-viewer.js.org/) + Three.js | WebGL equirectangular projection with smooth pan/zoom and dynamic transitions |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict static typing across components, models, and viewer lifecycle |
| **Styling** | Pure CSS3 (`tokens.css` + `main.css`) | Zero framework bloat, native CSS variables, flexbox/grid layout, and GPU-accelerated transforms |
| **Linter / Formatter** | [BiomeJS](https://biomejs.dev/) | Sub-millisecond formatting, import organization, and strict lint validation |
| **Package Manager** | [pnpm](https://pnpm.io/) | Fast, deterministic hard-linked package management with security enforcement |

---

## Supply Chain Security Hardening

This repository enforces proactive package isolation policies against zero-day supply chain attacks:

1. **Lifecycle Script Blocking**:
   * `.npmrc` declares `ignore-scripts=true` and `enable-pre-post-scripts=false` to prevent arbitrary code execution during package installs.
   * `pnpm-workspace.yaml` restricts native binary builds exclusively to verified build utilities (`esbuild`, `@biomejs/biome`) via `allowBuilds`.
2. **Package Release Cooldown (Quarantine Gate)**:
   * `minimumReleaseAge: 1440` (24 hours) is enforced in both `pnpm-workspace.yaml` and `.npmrc`.
   * Newly published versions published under 24 hours are blocked from resolution, allowing public security audits to revoke compromised releases.
3. **Exotic Subdependency Rejection**:
   * `block-exotic-subdeps=true` ensures transitive packages cannot pull untracked git references or external URLs.

---

## Project Structure

```text
├── .npmrc                  # Security gates (ignore-scripts, minimum-release-age)
├── pnpm-workspace.yaml     # Package workspace & build script allowlist
├── biome.json              # Biome linter & formatter configuration
├── DESIGN.md               # Minimalist design system guidelines and color tokens
├── Dockerfile              # Multi-stage production container (Node build + Nginx Alpine)
├── nginx.conf              # Nginx server configuration (Gzip, SPA fallback, headers)
├── wrangler.toml           # Cloudflare Pages deployment configuration
├── public/
│   ├── _headers            # Cloudflare security headers & immutable asset cache rules
│   ├── _routes.json        # Cloudflare Pages SPA route map
│   └── images/             # High-resolution 360° equirectangular panoramas
└── src/
    ├── types/              # Domain interfaces (TourStation, ViewerOptions)
    ├── data/               # Station metadata and media references
    ├── services/           # Viewer lifecycle management and WebGL wrappers
    ├── components/         # Modular Preact UI (TopBar, Dock, Drawer, Modal, Hero)
    ├── styles/             # Native CSS3 design tokens and component sheets
    ├── App.tsx             # Root tour coordinator and global keyboard handlers
    └── main.tsx            # Application entry point
```

---

## Keyboard Navigation

* `←` / `→`: Navigate to previous / next station.
* `F`: Toggle full-screen viewport.
* `I`: Toggle station index drawer.
* `V`: Open station technical video/data brief (if available).
* `Esc`: Close open modal or drawer.

---

## Getting Started

### Prerequisites

* Node.js `>= 20.0.0`
* pnpm `>= 9.0.0` (`bun` is intentionally disallowed)

### Development

```bash
# Install dependencies with locked security policies
pnpm install --frozen-lockfile

# Launch local development server (http://localhost:3000)
pnpm dev
```

### Quality & Static Analysis

```bash
# Type check and run Biome linter/formatter
pnpm run check

# Automatically fix format and lint diagnostics
pnpm run lint:fix

# Verify TypeScript types without emitting code
pnpm exec tsc --noEmit
```

### Production Build

```bash
# Build production bundle into dist/
pnpm run build

# Preview production build locally
pnpm run preview
```

---

## Deployment

### Cloudflare Pages

The repository is configured for zero-configuration Cloudflare Pages deployment:

1. **Build command**: `pnpm run build`
2. **Build output directory**: `dist`
3. Static routing and security headers are automatically loaded from `public/_headers` and `public/_routes.json`.
4. To deploy via Wrangler CLI:
   ```bash
   pnpm exec wrangler pages deploy dist
   ```

### Docker

A production-ready, multi-stage `Dockerfile` is provided:

```bash
# Build container image
docker build -t 360-tour-demo:latest .

# Run container on port 8080
docker run -d -p 8080:80 --name 360-tour 360-tour-demo:latest
```

The container runs on `nginx:alpine-slim` with:
* Automated HTTP healthchecks (`/`).
* Gzip compression enabled for all static assets.
* 1-year immutable caching for hashed chunks and panoramas.
* SPA route fallback (`try_files $uri $uri/ /index.html`).

---

## Design System

Detailed design specifications, color swatches, typographic scales, and UI interaction states are documented in [DESIGN.md](./DESIGN.md).

---

## License

Private / Proprietary.
