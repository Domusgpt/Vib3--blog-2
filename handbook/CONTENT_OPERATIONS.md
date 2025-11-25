# Content & Operations Guide

Use this guide to extend sections, add feature cards, and keep QA/validation aligned for the VIB34D-themed blog.

## Sections & Navigation
- **Definition:** Each section is keyed by an `id` in `SECTIONS` and paired with a profile in `VISUALIZER_PROFILES` plus a content block in `SECTION_CONTENT`.
- **Add a section:**
  1) Add a new entry to `SECTIONS` with `id`, `title`, `icon`, and `subtitle`.
  2) Add a matching entry in `VISUALIZER_PROFILES` to control geometry, rotation, density, and colors.
  3) Add a matching entry in `SECTION_CONTENT` with hero copy, feature card data, article rail items, and optional `focusContent` payload.
  4) (Optional) Add QA/gesture/control/polish entries in `SECTION_QA`, `SECTION_GESTURES`, `CONTROL_SYSTEMS`, `SECTION_POLISH`, and `SECTION_VALIDATION`.

## Feature Cards
### Morphing Feature Card
- **Location:** `components/ui/MorphingFeatureCard.tsx`
- **Data:** Provided via `SECTION_CONTENT[sectionId].feature` with `kicker`, `title`, `summary`, `meta`, `body[]`, and `beams[]`.
- **Behavior:** Clicking expands the card and adjusts visualizer `patternIntensity` and `glitchIntensity`. Escape closes it.

### Focus-Content Card (800vh GSAP Journey)
- **Location:** `components/ui/FocusContentCard.tsx`
- **Data:** `SECTION_CONTENT[sectionId].focusContent` with `kicker`, `title`, `meta`, `summary`, `highlights[]`, `phases[]`, and `stats[]`.
- **Behavior:** Uses GSAP ScrollTrigger to run an 800vh fixed-viewport sequence with phase notes, color transitions, and QA telemetry. Each section may omit this by setting `focusContent: null`.

## Article Rails & Micro Updates
- **Article rail:** `SECTION_CONTENT[sectionId].stream[]` supplies `title`, `tag`, and `desc` for horizontally scrollable cards.
- **Micro updates:** `SECTION_CONTENT[sectionId].micro[]` lists short status bullets shown in the section footer.

## Control Surfaces & QA
- **Control surface:** `CONTROL_SYSTEMS[sectionId]` defines subsystem cards with `label`, `load`, `hint`, and `tuning` arrays. Hover/focus retunes the visualizer.
- **Gestures lattice:** `SECTION_GESTURES[sectionId]` lists gesture types, expected behavior, and visualizer tuning on hover.
- **QA/Validation:**
  - `SECTION_QA` feeds the QA checklist grid with status, owners, and timelines.
  - `SECTION_POLISH` defines polish passes that slightly retune visuals on hover.
  - `SECTION_VALIDATION` lists tests (load, doc, usability) and supporting notes.

## Copy & Style Guidelines
- Keep tone terse, technical, and future-focused; prefer action verbs and short sentences.
- Use uppercase tags/kickers sparingly for emphasis; keep gradients aligned to section accent colors.
- When adding GSAP interactions, prefer ScrollTrigger and avoid inline try/catch blocks around imports.

## Accessibility & UX Considerations
- Ensure focus-content timelines remain keyboard navigable (use Escape to exit morphing cards and maintain tabindex for buttons).
- Maintain sufficient contrast for gradients and overlay text. Current palette uses semi-transparent borders; test against dark backgrounds.
- Keep scrollable rails sized for touch with generous hit targets and `snap` behavior to aid trackpads.

## Content QA Checklist
- [ ] New section IDs are present across `SECTIONS`, `VISUALIZER_PROFILES`, and `SECTION_CONTENT`.
- [ ] Feature and focus-content cards have at least 3 body paragraphs or phases to avoid empty layouts.
- [ ] Control surface entries include `tuning` hints to keep visualizer feedback meaningful.
- [ ] QA + validation rows specify status and owner so Telemetry HUD can surface useful signals.
- [ ] `npm run build` passes after content changes; check console for GSAP errors during local testing.
