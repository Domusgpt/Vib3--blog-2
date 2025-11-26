<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Vib3code Blog (VIB34D Experience)

Revolver-driven, WebGL-backed blog experience with morphing feature cards, GSAP focus-content journeys, control surfaces, and telemetry overlays inspired by the VIB34D system.

## Run Locally
**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. Set `GEMINI_API_KEY` in `.env.local` (if using Gemini-backed services)
3. Start dev server: `npm run dev`
4. Build for production: `npm run build`

## Deployment (GitHub Actions + Pages)
- A ready-to-enable GitHub Actions workflow lives at `.github/workflows/deploy.yml`.
- Enable GitHub Pages → Source: **GitHub Actions**. Ensure the default branch is `main` (or update the workflow ref if you ship from another branch).
- The workflow builds with `npm ci && npm run build`, uploads `dist/` as the Pages artifact, and deploys via `actions/deploy-pages` on pushes to `main` or manual dispatch.
- Vite’s `base` is configurable via `VITE_PUBLIC_BASE`. It defaults to `/Vib3--blog-2/` for the Actions-driven deploy, and the `build:pages` script forces a relative base (`./`) so assets resolve when you host from the `/docs` folder.
- No-Actions fallback: run `npm run build:pages` to emit a static bundle into `/docs` (with `.nojekyll` and `404.html`). Set Pages source to `/docs` or load `https://domusgpt.github.io/Vib3--blog-2/docs/` directly; the root index will auto-redirect to `/docs` when served statically so you don’t see a blank screen if Pages is pointed at the repo root.
- If you change dependencies, commit the updated `package-lock.json` so the CI cache and installs stay deterministic.
- To trigger a deploy without a commit, export a repo-scoped `GITHUB_TOKEN` and run:
  ```bash
  npm run deploy:dispatch -- --repo <owner/name> --ref <branch>
  ```
  You can also hit **Run workflow** in GitHub Actions UI. The Ops Dashboard now includes a Deploy tab with a copy-ready command builder that never stores secrets.

## Documentation
- [Architecture](handbook/ARCHITECTURE.md): component map, event/state flow, and extensibility notes.
- [Content & Operations](handbook/CONTENT_OPERATIONS.md): how to add sections, cards, QA data, and copy guidelines.
- [Blog Readiness & Roadmap](handbook/BLOG_READINESS.md): current coverage vs. what’s left for a full production blog.
- [Operations Runbook](handbook/OPERATIONS_RUNBOOK.md): auth, editor dashboard, comments, JSON pipelines, and observability targets.
- [Publication Platform](handbook/PUBLISHING_PLATFORM.md): governance, SEO, distribution, and collaboration standards for a professional launch.

## Testing & QA Expectations
- Run `npm run build` before committing content or interaction changes.
- Validate GSAP ScrollTrigger behavior on the 800vh focus-content card (hero section) and ensure Escape closes morphing cards.
- Exercise the Ops Dashboard publishing tab to confirm SEO, governance, and distribution checklists render as expected.
- Verify revolver navigation via scroll, hover, and keyboard gestures; confirm Telemetry HUD reflects the active section profile.

## Visual Notes
- Gradients, glow, and density respond to the visualizer profiles in `constants.ts`.
- Focus-content interactions tune the visualizer—review the hero section’s `focusContent` dataset for the Vib3Code.com journey template.
