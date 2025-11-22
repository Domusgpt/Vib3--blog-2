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
- To deploy: enable GitHub Pages in the repo settings, point it to the `GitHub Actions` source, and ensure the default branch is `main`.
- The workflow builds with `npm ci && npm run build`, uploads `dist/` as the Pages artifact, and deploys via `actions/deploy-pages` on pushes to `main` or manual dispatch.
- If you change dependencies, commit the updated `package-lock.json` so the CI cache and installs stay deterministic.

## Documentation
- [Architecture](docs/ARCHITECTURE.md): component map, event/state flow, and extensibility notes.
- [Content & Operations](docs/CONTENT_OPERATIONS.md): how to add sections, cards, QA data, and copy guidelines.
- [Blog Readiness & Roadmap](docs/BLOG_READINESS.md): current coverage vs. what’s left for a full production blog.
- [Operations Runbook](docs/OPERATIONS_RUNBOOK.md): auth, editor dashboard, comments, JSON pipelines, and observability targets.
- [Publication Platform](docs/PUBLISHING_PLATFORM.md): governance, SEO, distribution, and collaboration standards for a professional launch.

## Testing & QA Expectations
- Run `npm run build` before committing content or interaction changes.
- Validate GSAP ScrollTrigger behavior on the 800vh focus-content card (hero section) and ensure Escape closes morphing cards.
- Exercise the Ops Dashboard publishing tab to confirm SEO, governance, and distribution checklists render as expected.
- Verify revolver navigation via scroll, hover, and keyboard gestures; confirm Telemetry HUD reflects the active section profile.

## Visual Notes
- Gradients, glow, and density respond to the visualizer profiles in `constants.ts`.
- Focus-content interactions tune the visualizer—review the hero section’s `focusContent` dataset for the Vib3Code.com journey template.
