# Arhamy OS — Personal Portfolio

A personal portfolio reimagined as a **desktop operating system** — *Arhamy OS · Mission Control*.
A GNOME-style top bar, a floating app dock, an in-site window manager, and a live
"control-plane" dashboard that showcases skills through animated widgets.

Built for **Muhammad Ulul Arhamy, S.T.** — Full Stack Developer · Cloud & DevOps · Cybersecurity & AI/ML Enthusiast.

---

## ✨ Features

- **GNOME-style top bar** — live clock & date, a working brightness slider (filters the whole
  screen via CSS `filter`), plus Wi-Fi and battery indicators (inline SVG).
- **Floating dock (left)** with two behaviours:
  - **App icons** → open in-site windows: `About`, `Projects`, `Blog`.
  - **Social icons** → open external links in a new tab: Spotify, GitHub, LinkedIn, Instagram.
  - An **Apps-grid** button at the bottom.
- **Window manager** (`Window.svelte`) — reusable modal with scale + fade animation, blurred
  backdrop, **focus trap**, **Esc to close**, click-outside to close, and **focus restore** to
  the element that opened it. Fully `role="dialog"` / `aria-modal` compliant.
- **Hero** — animated typewriter tagline (looping roles), avatar frame with an "Open to work"
  chip, call-to-action buttons, and a hover-pausing skill marquee.
- **Mission Control dashboard** — ambient bento widgets with subtle live data: a Cloud
  (VPC → EC2 → S3) flow, a Security threat-feed, an AI/ML model accuracy bar, and a dev
  terminal `git log`.
- **Custom cursor follower** — a trailing teal reticle + precise dot that grows over interactive
  elements (auto-disabled on touch devices and when reduced motion is preferred).
- **Download CV** — a reusable button that downloads the real PDF from `static/`.
- **Accessible & responsive** — keyboard focus rings, ARIA labels, mobile dock, and full
  `prefers-reduced-motion` support.

---

## 🧱 Tech stack

| Area       | Choice                                            |
| ---------- | ------------------------------------------------- |
| Framework  | [SvelteKit](https://svelte.dev/docs/kit) + **Svelte 5 (runes)** |
| Language   | TypeScript                                        |
| Styling    | TailwindCSS v4 + scoped component CSS + CSS tokens |
| Fonts      | [@fontsource](https://fontsource.org) (self-hosted, offline-safe) |
| Tooling    | Vite, ESLint, Prettier, `svelte-check`            |
| Database\* | Drizzle ORM + PostgreSQL (scaffolded, unused by the portfolio) |

\* The Drizzle/Postgres setup ships from the project template and is not required to run the portfolio.

---

## 🎨 Design system — "Mission Control"

A dark, technical control-plane look with a single disciplined accent colour.
All tokens are defined once in [`src/routes/layout.css`](src/routes/layout.css) and reused everywhere.

| Token                     | Value                  | Use                                       |
| ------------------------- | ---------------------- | ----------------------------------------- |
| `--bg` / `--bg-2`         | `#0a0e14` / `#0d1117`  | desktop background                        |
| `--surface` / `--surface-2` | `#11161f` / `#161c26` | cards, windows, dock                      |
| `--ink` / `--muted`       | `#e6edf3` / `#8b949e`  | text                                      |
| `--teal` / `--teal-2`     | `#34d399` / `#5eead4`  | accent: online status, glow, focus ring   |
| `--amber`                 | `#fbbf24`              | thin warning/highlight only               |

**Typography:** Space Grotesk (display / name) · JetBrains Mono (logs, terminal, tagline) · Inter (body).

---

## 📁 Project structure

```
src/
├─ routes/
│  ├─ +layout.svelte          # imports global CSS
│  ├─ +page.svelte            # entry → <Desktop avatar={...} />
│  └─ layout.css              # Tailwind import + design tokens + @fontsource
│
├─ lib/
│  ├─ data/
│  │  └─ profile.ts           # ⭐ single source of truth: identity, links, skills, projects
│  │
│  ├─ avatar.ts               # exported avatar (data URI) passed to <Desktop>
│  │
│  └─ components/
│     ├─ Desktop.svelte       # root: window state + brightness + cursor follower + ambient
│     ├─ TopBar.svelte        # GNOME shell: clock, brightness, wifi, battery
│     ├─ Dock.svelte          # left dock: window-apps + social links + apps-grid
│     ├─ Window.svelte        # reusable modal: focus trap, Esc, backdrop, restore focus
│     ├─ AboutWindow.svelte   # About content (summary, skills grid, achievements, CV)
│     ├─ ProjectsWindow.svelte# Projects content (cards from profile.ts)
│     ├─ BlogWindow.svelte    # "Coming soon" placeholder
│     ├─ Hero.svelte          # hero: name, typewriter, avatar, CTAs, skill ticker
│     ├─ MissionControl.svelte# ambient dashboard widgets
│     ├─ SkillTicker.svelte   # marquee of skills
│     ├─ DownloadCV.svelte    # reusable Download CV button
│     └─ icons/               # inline-SVG icon components (brand + app icons)
│
static/
└─ cv-muhammad-ulul-arhamy.pdf  # the downloadable CV (served from site root)
```

> Note: the page flows `LoadingScreen → InterfaceSelect → Desktop` (intro screens from the
> template). The portfolio itself lives in `Desktop.svelte` and renders at the end of that flow.

---

## 🚀 Getting started

Requires **Node.js 18+**.

```sh
# install dependencies
npm install

# start the dev server
npm run dev

# …or open it in a browser automatically
npm run dev -- --open
```

The app runs at `http://localhost:5173` by default.

### Available scripts

| Command            | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `npm run dev`      | Start the Vite dev server                            |
| `npm run build`    | Production build                                     |
| `npm run preview`  | Preview the production build locally                 |
| `npm run check`    | Type-check + Svelte a11y check (`svelte-check`)      |
| `npm run lint`     | Prettier + ESLint                                    |
| `npm run format`   | Auto-format with Prettier                            |

---

## 🛠️ Customization

Almost everything is data-driven from **[`src/lib/data/profile.ts`](src/lib/data/profile.ts)**.

### Identity, links & skills

Edit `profile` in `profile.ts`:

- `name`, `displayName`, `credentials`, `roles` (typewriter), `summary`, `location`, `email`, `phone`
- `dockLinks` — social URLs (including **`spotifyUrl`** — currently a placeholder
  `https://open.spotify.com/`; replace with your profile URL)
- `skills` — the marquee items
- `skillGroups` — the grouped skills shown in the About window
- `projects` — the cards shown in the Projects window

### Avatar

`<Desktop>` takes an `avatar` prop (a URL **or** a data URI). It's wired in
[`src/routes/+page.svelte`](src/routes/+page.svelte):

```svelte
<Desktop avatar={avatar} />
```

You can either keep the data URI in `src/lib/avatar.ts`, or drop an image at
`static/avatar.jpg` and pass `avatar="/avatar.jpg"`. If `avatar` is empty, the hero falls back to
the initials **UA**.

### Replacing the CV (PDF)

The downloadable CV lives at **`static/cv-muhammad-ulul-arhamy.pdf`**. Anything in `static/`
is served from the site root, so it's available at `/cv-muhammad-ulul-arhamy.pdf` and is
automatically included in `npm run build`.

To update it:

1. **Overwrite** `static/cv-muhammad-ulul-arhamy.pdf` with your latest CV, keeping the **same
   file name**.
2. If you change the file name, update `cvUrl` in `profile.ts` accordingly.

The download button is reused in the hero and the About window via `DownloadCV.svelte`:

```svelte
<a href="/cv-muhammad-ulul-arhamy.pdf" download="CV-Muhammad-Ulul-Arhamy.pdf">
  Download CV (PDF)
</a>
```

The `download` attribute forces a download and gives the saved file a tidy name.

---

## ♿ Accessibility & motion

- Keyboard focus is always visible (teal focus ring); modals trap focus and restore it on close.
- All icon-only controls have `aria-label`s; modals use `role="dialog"` + `aria-modal="true"`.
- `prefers-reduced-motion` disables the marquee, ambient blobs, packet flow, avatar scan-line,
  and the cursor follower, and shows the tagline instantly instead of typing it.
- `npm run check` passes with **0 errors and 0 warnings**.

---

## 📦 Deployment

This project uses [`@sveltejs/adapter-auto`](https://svelte.dev/docs/kit/adapter-auto). For a
specific target (Vercel, Netlify, Node, static, etc.), install the matching
[adapter](https://svelte.dev/docs/kit/adapters) and update `svelte.config`/`vite.config`.

For a fully static deploy, use `@sveltejs/adapter-static`. The CV and any other files in
`static/` are copied into the build output automatically.

---

## 📬 Contact

- **Email:** arhamy131002@gmail.com
- **GitHub:** [@humane15](https://github.com/humane15)
- **LinkedIn:** [muhammad-ulul-arhamy](https://www.linkedin.com/in/muhammad-ulul-arhamy/)
- **Instagram:** [@ulul_arhamy2](https://www.instagram.com/ulul_arhamy2/)
- **Location:** Krueng Barona Jaya, Aceh Besar, Aceh
