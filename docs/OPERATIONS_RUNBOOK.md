# Operations Runbook

This runbook summarizes how the VIB3 blog should evolve toward a fully managed, editor-friendly stack with AI agent support. It pairs the new in-app Ops Dashboard with concrete storage, API, and workflow expectations.

## 1) Accessing the Ops Dashboard
- Open the main experience and select **Open Ops Dashboard** (bottom-right). The overlay lists tabs for overview, auth, editor flows, comments, JSON content, and ops readiness.
- Each tab mirrors the constants in `constants.ts` so UI copy stays in sync with the operational plan.
- Auth tab now includes a live session tester (add user, start/end session) and a scrollable directory to visualize role coverage.
- Editor tab includes a scheduling form + queue persisted to local storage for rapid rehearsal of publish cadences.
- Comments tab includes a moderation queue where you can add, approve, reset, and flag sample comments to mirror production flows.
- Content tab includes a paste/validate/apply area with recent-import history to rehearse JSON-driven updates before wiring the API.

## 2) Authentication & Roles
- **Flows:** email/password and passwordless magic links; refresh tokens stored in httpOnly cookies; CSRF tokens for mutations.
- **Roles:** `visitor`, `user`, `editor`, `admin`. Editor routes must be gated in the client; admin unlocks role management and config imports.
- **Policies:** login throttling, captcha hook, token rotation, session revocation when credentials change.

## 3) Editor Dashboard Expectations
- Draft intake pane reads agent-produced JSON from a drop folder/API and stages previews before publication.
- Scheduling metadata: `publish_at`, `expire_at`, optional queue hooks for AI agents to pre-validate drafts.
- Activity feed captures create/update/publish/rollback actions with actor + timestamp.
- Access control enforces editor/admin gating; moderators can view comments but cannot publish posts.

## 4) Comments & Moderation
- Pipeline: capture + sanitize → spam/abuse screen → moderation queue → render threads.
- Moderation UI must support approve/reject/flag, inline status chips, pagination, and soft-delete.
- AI labels (toxicity/spam/quality) arrive via webhook and surface in the queue; signals include user age, velocity, repetition.

## 5) JSON-Driven Content & Styles
- Schemas:
  - **Section JSON**: metadata, gradients, rails, feature cards.
  - **Focus-content JSON**: 800vh journeys with phases/stats/visual hooks.
  - **Theme JSON**: colors, gradients, shader knobs, motion presets.
- Controls: upload + preview with validation, snapshots + rollback, watch folder for agent drops, and applied-config history.

## 6) Storage & API
- Persistence: Postgres + Prisma (or equivalent) with models for users, posts, comments, schedules, presets.
- API surface: REST/GraphQL for posts CRUD, scheduling, comments/moderation, and config imports.
- Assets: signed URLs/CDN for covers; migrations + seed scripts for dev/prod parity.

## 7) Observability & Deployment
- Tests: unit + integration for auth, comments, JSON validation, and UI snapshots.
- Analytics + error monitoring with privacy controls and rate limits.
- CI/CD: lint/test/build pipeline with preview deploys per PR.
- Accessibility: keyboard navigation, focus traps in overlays, ARIA labels, and lazy loading where applicable.

## 7b) Triggering GitHub Pages Builds
- Default path: push to `main` or use the **Run workflow** button on the `Build and Deploy` workflow in GitHub Actions.
- CLI path (recommended for agents/humans): run `npm run deploy:dispatch -- --repo <owner/name> --ref <branch>` with `GITHUB_TOKEN` exported. This calls the workflow dispatch API for `.github/workflows/deploy.yml`.
- Required env: `GITHUB_TOKEN` (repo scope), optionally `GITHUB_REPOSITORY` to avoid passing `--repo`. The script reports failures with the API response body for quick debugging.
- Ensure GitHub Pages is enabled in repo settings and configured to use **GitHub Actions** as the source before dispatching.
- The in-app Ops Dashboard now has a **Deploy** tab with a copy-to-clipboard command builder (no secrets stored) plus local-only logging of your last dispatch status for quick rehearsal.

## 8) Collaboration with AI Agents
- Agent queue widget should display incoming drafts/configs, validation status, and required human actions.
- Support assignment tags, due dates, and quick AI assist actions (summarize/expand/suggest titles) with human confirmation.
- Roadmap/progress indicators should tie scheduled tasks to publish milestones and QA gates.

Use this runbook alongside `docs/BLOG_READINESS.md` and `docs/CONTENT_OPERATIONS.md` to align human editors and scheduled agents.
