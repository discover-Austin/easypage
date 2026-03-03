# EasyPage – Visual Website Builder

> Build beautiful, production-ready websites in minutes — no coding required.

![EasyPage Builder](https://github.com/user-attachments/assets/f8ff6153-a162-4380-a278-38b2845bd160)

## Overview

EasyPage is a browser-based, no-code/low-code website builder that lets complete beginners ship a polished page in under 10 minutes while giving advanced users full control over layout, styles, and components. It generates clean, exportable HTML/CSS that you can host anywhere.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🖱 Drag-and-drop | Drag components from the sidebar onto the canvas; reorder by dragging |
| ✏️ Inline editing | Click any text on canvas to edit it directly |
| 📱 Responsive preview | Toggle Desktop / Tablet / Mobile canvas widths |
| ↩️ Undo / Redo | Full history stack (Ctrl+Z / Ctrl+Y) |
| 🎨 Theme system | Color palette presets, custom pickers, font chooser, border-radius |
| 👁 Live preview | Full-page iframe preview at any viewport size |
| 📦 Export to ZIP | Downloads a self-contained `index.html` with all inline styles |
| 🎓 Onboarding wizard | 4-step guided tour for first-time users |
| 🧩 10 block types | Navbar, Hero, Features, Text, Image, Button, Testimonials, Pricing, Contact Form, Footer |
| ⌨️ Keyboard shortcuts | Delete (remove block), Ctrl+Z (undo), Ctrl+Y (redo) |
| 🔰 Beginner / Advanced mode | Beginner hides complex blocks; Advanced unlocks all blocks + JSON editor |
| 📝 Properties panel | Type-specific form controls; raw JSON editor in Advanced mode |

---

## 🏗 Architecture

### Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 14** (App Router) | File-based routing, SSR/SSG, production-grade bundling |
| Language | **TypeScript** | Full type-safety across the entire codebase |
| Styling | **Tailwind CSS** | Utility-first, zero runtime, consistent design tokens |
| State | **Zustand** | Minimal boilerplate, atomic updates, easy time-travel (undo/redo) |
| Drag-and-drop | **@dnd-kit** | Accessible, composable, works with sortable lists + droppable zones |
| Export | **JSZip** | Client-side ZIP generation, no server round-trip |
| Icons | **lucide-react** | Consistent, tree-shakable SVG icons |

### Key Architectural Decisions

**Component Registry**  
Each block type (`hero`, `features`, `navbar`, …) has a canonical default-props object in `builderStore.ts`. Adding a new block type means: (1) add its key to the `ComponentType` union in `builder.ts`, (2) add its default props to `defaultProps`, (3) add a React component in `src/components/blocks/`, (4) wire it into `BuilderCanvas`. Zero other changes required.

**Undo/Redo via Immutable History**  
The Zustand store keeps `history.past` (array of past `pages` snapshots) and `history.future`. Every mutating action pushes the current pages onto `past` and clears `future`. Undo pops from `past`; redo pops from `future`. No deep-clone libraries needed — React's state model already gives us snapshot semantics.

**Export Engine**  
`exportUtils.ts` walks the current page's component list, renders each block to a static HTML string with inline CSS, wraps it in a full `<!DOCTYPE html>` document including Google Fonts and CSS custom properties for the active theme, and streams the result into a JSZip blob that the browser downloads.

**Theme System**  
`Theme` (`primaryColor`, `secondaryColor`, `fontFamily`, `borderRadius`) is stored in the Zustand store. CSS custom properties (`--primary`, `--secondary`, `--radius`) are injected at the `:root` level of the canvas so every block automatically inherits the active palette without per-block overrides.

---

## 📁 Folder Structure

```
easypage/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root HTML shell
│   │   ├── page.tsx                # Redirects / → /builder
│   │   └── builder/
│   │       └── page.tsx            # Main builder page (DndContext root)
│   ├── components/
│   │   ├── blocks/                 # 10 page-section blocks
│   │   │   ├── HeroBlock.tsx
│   │   │   ├── FeaturesBlock.tsx
│   │   │   ├── NavbarBlock.tsx
│   │   │   ├── FooterBlock.tsx
│   │   │   ├── TextBlock.tsx
│   │   │   ├── ImageBlock.tsx
│   │   │   ├── ButtonBlock.tsx
│   │   │   ├── TestimonialsBlock.tsx
│   │   │   ├── PricingBlock.tsx
│   │   │   └── ContactFormBlock.tsx
│   │   ├── builder/                # Builder UI chrome
│   │   │   ├── BuilderCanvas.tsx   # Sortable drop zone
│   │   │   ├── ComponentLibrary.tsx# Left sidebar
│   │   │   ├── PropertiesPanel.tsx # Right panel
│   │   │   ├── Toolbar.tsx         # Top bar (actions, toggles)
│   │   │   ├── PreviewFrame.tsx    # Iframe live preview modal
│   │   │   ├── OnboardingWizard.tsx# First-run guided tour
│   │   │   └── ThemePanel.tsx      # Color/font pickers
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Modal.tsx
│   │       └── Tooltip.tsx
│   ├── hooks/
│   │   └── useKeyboardShortcuts.ts # Ctrl+Z/Y/Delete
│   └── lib/
│       ├── store/
│       │   └── builderStore.ts     # Zustand store (state + actions)
│       ├── types/
│       │   └── builder.ts          # TypeScript interfaces
│       └── utils/
│           ├── exportUtils.ts      # HTML/ZIP export
│           └── themeUtils.ts       # Palette presets + font list
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Local development

```bash
git clone <your-repo-url>
cd easypage
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to the builder automatically.

### Production build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## 🧩 Adding a New Block

1. **Define the type** — add the key to `ComponentType` in `src/lib/types/builder.ts`.
2. **Add default props** — add an entry to `defaultProps` in `src/lib/store/builderStore.ts`.
3. **Create the React component** — add `src/components/blocks/MyBlock.tsx`. The component receives `{ id, props, isSelected, onSelect, onUpdate }`.
4. **Register in the canvas** — add a `case 'mytype'` to the `renderBlock` switch in `BuilderCanvas.tsx`.
5. **Add to the sidebar** — add an entry to `COMPONENT_TYPES` in `ComponentLibrary.tsx`.
6. **Add HTML export** — add a `case 'mytype'` to `renderComponentHTML` in `exportUtils.ts`.

---

## 🗺 Roadmap

### v2 Features
- [ ] Multi-page projects
- [ ] AI layout generator ("Describe your site" → full page)
- [ ] AI copywriting assistant
- [ ] Accessibility checker (contrast ratio, aria labels)
- [ ] SEO panel (title, description, Open Graph)
- [ ] Custom CSS/JS injection panel
- [ ] Component marketplace
- [ ] Reusable global components (shared header/footer across pages)
- [ ] CMS-style content collections
- [ ] Dynamic data binding
- [ ] Performance analyzer
- [ ] Image optimization
- [ ] Hosting / deployment integration (Vercel / Netlify)
- [ ] Multi-tenant / white-label SaaS layer
- [ ] Role-based permissions
- [ ] Autosave to localStorage / cloud

### Monetization Model (SaaS-ready)
| Tier | Price | Limits |
|---|---|---|
| Free | $0 | 3 pages, EasyPage branding, ZIP export |
| Pro | $12/mo | Unlimited pages, custom domain, no branding |
| Agency | $49/mo | White-label, client seats, priority support |
| Enterprise | Custom | SSO, SLA, dedicated infra |

---

## 🔒 Security

- All user-editable text is rendered via React (XSS-safe in the builder UI).
- The ZIP export generates static HTML — no server-side execution.
- No user data leaves the browser in the current version.

---

## 📄 License

MIT