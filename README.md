# 🗓️ Interactive Wall Calendar

An award-winning, production-grade interactive wall calendar built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Translates the tactile warmth of a physical spiral-bound wall calendar into a breathtaking digital experience.

## ✨ Features

- **Wall Calendar Aesthetic** — Spiral binding, paper texture, curated hero images per month
- **Date Range Selection** — Click-click range selection with live ghost preview on hover
- **Integrated Notes** — Monthly notes + range-specific notes, persisted to localStorage
- **Light/Dark Theme** — Smooth animated toggle with localStorage persistence
- **Holiday Markers** — Indian + international holidays with colored dot indicators
- **Dynamic Month Tints** — Subtle color shifts per month (warm summers, cool winters)
- **Today Pulse** — Animated highlight ring on the current date
- **Fully Responsive** — Desktop (side-by-side), tablet, and mobile (bottom sheet notes)
- **Keyboard Accessible** — Full grid navigation with arrow keys, proper ARIA attributes
- **Print Stylesheet** — Clean, printer-friendly output
- **Reduced Motion** — Respects `prefers-reduced-motion` system preference

## 🏗️ Architecture

```
src/
├── app/              Layout + Page (Next.js App Router)
├── components/
│   ├── calendar/     CalendarRoot, Grid, Header, HeroImage, Notes, RangeBar, DayCell
│   └── ui/           SpiralBind, PaperTexture, ThemeToggle
├── hooks/            useCalendar, useRangeSelection, useNotes, useLocalStorage
├── store/            Zustand store (calendarStore)
├── lib/              dateUtils, constants, types
└── styles/           globals.css
```

### Design Decisions

| Choice | Rationale |
|--------|-----------|
| **Zustand** | Minimal boilerplate, selector-based re-renders for perf, no Context overhead |
| **date-fns** | Tree-shakeable, lightweight (~6KB for the functions used), no moment.js bloat |
| **Framer Motion** | Physics-based animations with transform/opacity only for 60fps |
| **CSS Custom Properties** | Theme system via `data-theme` attribute, instant theme switching |
| **React.memo** | Applied on DayCell to prevent 42-cell re-renders on every hover |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| ≥ 1024px | Two-panel side-by-side (hero left, grid right) |
| 768–1023px | Stacked: hero → grid → notes |
| < 768px | Compact stacked with bottom sheet notes |

## ♿ Accessibility

- `role="grid"` / `role="gridcell"` / `role="columnheader"` semantics
- `aria-label` on all interactive elements
- `aria-selected` / `aria-disabled` states
- Full keyboard navigation (Tab, Enter/Space, Arrow keys)
- 4.5:1+ contrast ratios maintained across both themes
- Reduced motion support

## 🔮 Future Improvements

- Drag-to-select range (mousedown → mousemove → mouseup)
- Mini month overview component
- Recurring event support
- Export calendar as image/PDF
- Internationalization (i18n) for month/day names
- Backend sync via API

## 📄 License

MIT
