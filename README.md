# HungYuan Lo portfolio

An evidence-led portfolio built with Next.js 16, React 19, TypeScript, React Three Fiber, GSAP, Lenis, and Tailwind CSS.

Project copy and links are derived from the public repositories at [github.com/5Gswatergod](https://github.com/5Gswatergod). Repository assets are labelled as such; the Ollama Models Manager artwork is explicitly labelled as a concept visual.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The public site is deployed through GitHub Pages at [5gswatergod.github.io](https://5gswatergod.github.io/). Pushes to `master` run the verified static-export workflow in `.github/workflows/pages.yml`.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

## Production metadata

The Pages workflow sets `NEXT_PUBLIC_SITE_URL` to the production origin. For any other host, copy `.env.example` to `.env.local` and set the variable to that deployed origin.

## Interaction shortcuts

- `Ctrl/Cmd + K`: command palette
- `Ctrl/Cmd + backtick`: terminal
- Five quick clicks on the `HL` mark: developer HUD
- Konami sequence: brief signal glitch

Sound is off by default and only begins after the visitor explicitly enables it.
