# Vib3code Blog Architecture

This document maps the current interactive blog experience and the moving parts that keep the VIB34D vibe synchronized across navigation, cards, and the WebGL visualizer.

## Core Application Flow
- **App shell (`App.tsx`)** renders the global WebGL visualizer, glitch overlay, gesture handler, revolver navigation, and whichever section is active. Section switches briefly boost pattern intensity to emphasize transitions and then restore the target profile.
- **Visualizer (`components/VisualizerCanvas.tsx`)** exposes `updateParams` and `triggerBurst` methods for section-specific styling changes. Profiles are defined in `constants.ts` and set per section.
- **Revolver navigation (`components/RevolverNav.tsx`)** is the primary UI for switching sections. It responds to hover and scroll wheel input and forwards changes to the app shell.
- **Gesture handler (`components/ui/GestureHandler.tsx`)** listens for keyboard, scroll, and drag signals and forwards them to the revolver navigation callbacks while adjusting base visualizer parameters.
- **Telemetry HUD (`components/ui/TelemetryHud.tsx`)** surfaces the active section’s visualizer profile, QA cues, and navigation hints.

## Section Renderer
Each section is rendered by **`components/sections/VibSection.tsx`**. It pulls its content, control grids, QA cues, and polish passes from `constants.ts` and orchestrates multiple feature blocks:
- **Morphing feature card** (`components/ui/MorphingFeatureCard.tsx`) shows the primary story and animates the visualizer when expanded. It supports Escape-to-close and keeps glitch/pattern tuning synchronized with focus state.
- **Focus content card** (`components/ui/FocusContentCard.tsx`) implements the 800vh, fixed-viewport GSAP ScrollTrigger journey. It displays phases, stats, and sticky brief/cue panels tailored to the section’s `focusContent` dataset.
- **Article rail** renders scrollable micro-cards with tags and descriptions for quick scanning.
- **Execution plan** (`components/ui/ExecutionPlan.tsx`) displays the five-turn MASTER_PLAN with animated progress bars and CTA chips.
- **Control surface** (`components/ui/ControlSurface.tsx`) exposes per-section tuning inputs (geometry, rotation, density, glitch) that echo into the visualizer and present subsystem loads.
- **QA + validation blocks** are fed by `SECTION_QA`, `SECTION_POLISH`, and `SECTION_VALIDATION` to show status, next steps, and rehearsal/failsafe notes.

## Data Model
All content and tuning data lives in **`constants.ts`** to keep rendering components stateless:
- `SECTIONS` describes navigation order and labels.
- `VISUALIZER_PROFILES` defines geometry, density, rotation, intensity, and color schemes per section.
- `SECTION_CONTENT` holds hero headline copy, gradients, feature cards, streams, micro updates, and optional `focusContent` payloads.
- `MASTER_PLAN`, `SECTION_GESTURES`, `SECTION_QA`, `SECTION_POLISH`, `SECTION_VALIDATION`, and `CONTROL_SYSTEMS` provide interaction, testing, and operational metadata rendered in VibSection.

## Styling and Motion
- Tailwind utility classes handle most layout and color work; gradients are section-specific to match the intended mood.
- GSAP powers the fixed-viewport morphing experience, section transition intensity spikes, and subtle easing when sections mount.
- WebGL visualizer parameters are tuned on section load and further adjusted by interactions (focus-content expansion, control surface hover/focus, revolver navigation, and gesture handler cues).

## Event & State Flow
1. User navigates with revolver or gestures → `App` sets active section and updates visualizer parameters.
2. Section renderer pulls the matching dataset and renders feature cards, rails, QA stacks, and optional focus content.
3. Interactions (card expand, control surface hover, focus-content scroll) call `visualizerRef.updateParams` to sync visuals.
4. Telemetry HUD displays the current profile and contextual cues for testing and navigation.

## Extensibility Notes
- New sections can be added by extending `SECTIONS`, `VISUALIZER_PROFILES`, and `SECTION_CONTENT` (plus optional QA/gesture/control datasets) with matching `id` values.
- Additional feature card types can be slotted into `VibSection` alongside Morphing and FocusContent cards if they expose the same visualizer tuning callbacks.
- Global behaviors should continue to push changes through the visualizer ref rather than duplicating state in individual components.
