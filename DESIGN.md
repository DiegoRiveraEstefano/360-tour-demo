# Design System & Guidelines (DESIGN.md)

## 1. Design Philosophy

The design philosophy for **360 Tour Demo** is grounded in **technical minimalism** and **content-first immersion**.
The 360° panoramic canvas is the primary medium; the user interface acts as a transparent, high-precision instrument that provides situational awareness without visual clutter.

* **Frictionless Immersion**: UI controls remain quiet until summoned or interacted with.
* **Subtle Elevation & Glassmorphism**: Translucent panels with background blur (`backdrop-filter`) maintain spatial continuity with the 360° sphere.
* **Typographic Hierarchy**: High-contrast, clean sans-serif typography paired with monospaced data readouts for telemetry and scene coordinates.
* **Pure CSS3**: Zero CSS frameworks. Native CSS custom properties, grid, flexbox, and modern pseudo-classes.

---

## 2. Color Palette

The interface adopts a disciplined, low-saturation monochrome scheme with high optical contrast and a single functional blue accent for active states.

### Core Swatches

| Token | Value | Role |
| :--- | :--- | :--- |
| `--bg-base` | `#09090b` | Deep dark foundation behind viewer and page backgrounds |
| `--bg-surface` | `#121215` | Opaque cards, drawers, and modal bodies |
| `--bg-glass` | `rgba(18, 18, 21, 0.75)` | Translucent floating docks, overlays, and controls |
| `--border-subtle` | `rgba(255, 255, 255, 0.08)` | Default borders, subtle dividers, inactive tabs |
| `--border-focus` | `rgba(255, 255, 255, 0.22)` | Hover and active border boundaries |
| `--text-primary` | `#f4f4f5` | Headings, active scene titles, primary buttons |
| `--text-secondary` | `#a1a1aa` | Explanatory labels, descriptions, metadata |
| `--text-muted` | `#71717a` | Inactive counts, timestamps, keyboard hints |
| `--accent` | `#3b82f6` | Active station indicator, focused state rings |
| `--accent-soft` | `rgba(59, 130, 246, 0.15)` | Subtle accent backgrounds, active thumbnail glow |

---

## 3. Typography & Scale

### Typefaces
* **Interface Body & Headings**:
  ```css
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  ```
* **Telemetry & Numeric Identifiers** (Scene Index, Timers, Coordinates):
  ```css
  font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  ```

### Scale
* **Display**: `2.25rem` (`36px`), line-height: `1.2`, weight: `700`, letter-spacing: `-0.025em`
* **Heading**: `1.25rem` (`20px`), line-height: `1.3`, weight: `600`, letter-spacing: `-0.015em`
* **Body**: `0.875rem` (`14px`), line-height: `1.5`, weight: `400`
* **Caption / Label**: `0.75rem` (`12px`), line-height: `1.4`, weight: `500`, letter-spacing: `0.02em`
* **Code / Telemetry**: `0.8125rem` (`13px`), line-height: `1.4`, weight: `500`

---

## 4. Spacing, Radii & Depth

### Spacing Scale (4px Base Grid)
* `xs`: `4px`
* `sm`: `8px`
* `md`: `12px`
* `lg`: `16px`
* `xl`: `24px`
* `2xl`: `32px`

### Border Radii
* **Controls / Badges (`--radius-sm`)**: `6px`
* **Panels / Modals (`--radius-md`)**: `12px`
* **Floating Pills / Docks (`--radius-full`)**: `9999px`

### Elevations & Backdrops
* **Glass Panel Filter**: `backdrop-filter: blur(16px) saturate(160%)`
* **Drop Shadow**: `box-shadow: 0 8px 32px -4px rgba(0, 0, 0, 0.6), 0 0 0 1px var(--border-subtle)`

---

## 5. UI Components Specification

### 5.1 Floating Dock (Scene Navigation)
* Fixed bottom-centered pill container.
* Height: `44px`, padded with `4px 8px`.
* Buttons: circular or compact pill indicators with current scene highlighting (`--accent-soft` background, `--accent` border, bold white text).
* Next / Previous chevron controls on each end.

### 5.2 Station Drawer (Locations List)
* Slide-out panel anchored to the left or right edge.
* Width: `320px`, full height (`100dvh`).
* Top header with title, scene count badge, and close button (`Esc` key supported).
* List of location cards featuring station name, thumbnail/badge, and type badge (`360° Photo` vs `360° Video`).

### 5.3 Contextual Media / Info Modal
* Centered popover with semi-transparent backdrop (`rgba(0, 0, 0, 0.7)`).
* Embedded high-definition 2D video player or technical data card.
* Unobtrusive header with close cross (`×`) and `Esc` trigger.

### 5.4 Top Minimalist App Bar
* Brand/Tour Title on the left.
* Telemetry readout in the center (`LOCATION 03 / 09`).
* Action buttons on the right: Fullscreen toggle, Station list drawer toggle, Auto-rotation toggle, Info modal toggle.

---

## 6. CSS Architecture Rules

1. **Tokens in `:root`**: All colors, transitions, and measurements must derive from `src/styles/tokens.css`.
2. **No Framework Utility Bloat**: Write clear, semantic component CSS classes (`.dock-container`, `.station-drawer`, `.modal-backdrop`).
3. **Hardware Acceleration**: Always use `transform: translate3d(...)` or `opacity` for animations.
4. **Motion Safety**: Respect user preferences with `@media (prefers-reduced-motion: reduce)`.
