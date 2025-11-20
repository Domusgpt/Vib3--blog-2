export const VISUALIZER_PROFILES = {
    hero: {
        geometryType: 'hypercube',
        gridDensity: 20,
        rotationSpeed: 0.3,
        patternIntensity: 1.2,
        colorScheme: { primary: [0.2, 0.6, 1.0], secondary: [0.8, 0.2, 1.0], background: [0.02, 0.02, 0.1] }
    },
    philosophy: {
        geometryType: 'hypersphere',
        gridDensity: 40,
        rotationSpeed: 0.65,
        morphFactor: 0.8,
        patternIntensity: 1.35,
        colorScheme: { primary: [0.8, 0.1, 0.4], secondary: [0.1, 0.8, 0.9], background: [0.1, 0.0, 0.05] }
    },
    pillars: {
        geometryType: 'hypertetrahedron',
        gridDensity: 32,
        rotationSpeed: 0.45,
        morphFactor: 0.3,
        patternIntensity: 1.1,
        colorScheme: { primary: [0.1, 0.9, 0.5], secondary: [0.9, 0.9, 0.1], background: [0.0, 0.1, 0.05] }
    },
    quality: {
        geometryType: 'hypercube',
        gridDensity: 28,
        rotationSpeed: 1.1,
        glitchIntensity: 0.06,
        patternIntensity: 1.4,
        colorScheme: { primary: [1.0, 0.5, 0.0], secondary: [0.0, 1.0, 1.0], background: [0.05, 0.02, 0.0] }
    },
    sustainability: {
        geometryType: 'hypersphere',
        gridDensity: 24,
        rotationSpeed: 0.34,
        morphFactor: 0.2,
        patternIntensity: 1.05,
        colorScheme: { primary: [0.2, 0.8, 0.4], secondary: [0.2, 0.4, 0.9], background: [0.0, 0.05, 0.1] }
    },
    contact: {
        geometryType: 'hypertetrahedron',
        gridDensity: 14,
        rotationSpeed: 0.18,
        patternIntensity: 1.0,
        colorScheme: { primary: [0.9, 0.9, 0.9], secondary: [0.5, 0.5, 0.5], background: [0.0, 0.0, 0.0] }
    }
};

export const SECTIONS = [
    { id: 'hero', title: 'Latest', icon: '⌘', subtitle: 'Featured Transmissions' },
    { id: 'philosophy', title: 'Concepts', icon: '★', subtitle: 'AI Theory & Ethics' },
    { id: 'pillars', title: 'The Stack', icon: '⬡', subtitle: 'React / Three / GPU' },
    { id: 'quality', title: 'Deep Dives', icon: '✦', subtitle: 'Technical Case Studies' },
    { id: 'sustainability', title: 'Future', icon: '∞', subtitle: 'Signals & Predictions' },
    { id: 'contact', title: 'Join', icon: '✉', subtitle: 'Community Access' }
];

export const SECTION_CONTENT = {
    hero: {
        badge: 'signal.fresh',
        headline: 'Live transmissions from the VIB3//code deck',
        subline: 'Latest drops, rapid reports, and visual diaries from the field.',
        accent: '#67e8f9',
        gradient: 'from-cyan-500/25 via-slate-900 to-indigo-900/70',
        feature: {
            kicker: 'Hypercard 01',
            title: 'Agentic Workflow 2.0',
            summary: 'How we choreograph multi-agent crews to compose, critique, and deploy production-grade experiences without shipping chaos.',
            meta: 'Edge Deploy · 9 min read',
            body: [
                'Multi-agent loops now get a single source of truth courtesy of the VIB3HomeMaster layer.',
                'Error handling happens at the orchestration plane, keeping downstream visualizers smooth.',
                'We borrow from live-coding culture: fast feedback, staged rollouts, and reversible bursts.'
            ],
            beams: ['Swarm-safe deploys', 'Circuit breaker fallbacks', 'Live visual QA'],
        },
        stream: [
            { title: 'Vibe Coding 101', tag: 'Field Note', desc: 'Programming by intuition with constraint maps that self-heal.' },
            { title: 'Shader Magic', tag: 'WebGL', desc: 'Mathematical art: turning noise into lucid fabric surfaces.' },
            { title: 'Realtime Ops', tag: 'Ops', desc: 'Crash-only restarts and GPU-aware throttling for WebGL apps.' },
            { title: 'Signal Flow', tag: 'DX', desc: 'How we keep designers and engineers in the same visual loop.' },
        ],
        micro: ['Changelog: 0.4.7 deployed', 'VisualizerPool now streams metrics', 'GestureRecognizer learns long-press drift']
    },
    philosophy: {
        badge: 'ethic/intent',
        headline: 'Interfaces that feel alive and accountable.',
        subline: 'Theory drops, ethics drills, and speculative UI prompts.',
        accent: '#f472b6',
        gradient: 'from-fuchsia-500/25 via-slate-900 to-amber-900/40',
        feature: {
            kicker: 'Manifest',
            title: 'Prompt Engineering Is Dead',
            summary: 'Context windows and intent maps replace prompt hacking. We choreograph the experience instead of wordsmithing.',
            meta: 'Ethics Lab · 7 min read',
            body: [
                'EventValidator + GestureRecognizer stack filters intent before it touches the model.',
                'UnifiedReactivityBridge keeps CSS + WebGL aligned, so no hallucinated UI states leak through.',
                'Users keep agency: the system discloses every automated decision in the DebugInterface ribbon.'
            ],
            beams: ['Transparent automation', 'Consentful defaults', 'Context-first orchestration'],
        },
        stream: [
            { title: 'Ghost in the Machine', tag: 'Systems', desc: 'Emergent behavior in multi-agent UI ecosystems.' },
            { title: 'Post-Digital Aesthetics', tag: 'Design', desc: 'Building for interfaces that dream in gradients.' },
            { title: 'Code as Biology', tag: 'Metaphor', desc: 'Treating codebases like living mycelium networks.' },
            { title: 'Attention Economics', tag: 'Focus', desc: 'How immersive layouts re-balance dopamine fatigue.' },
        ],
        micro: ['Ethics board review queued', 'New bias sweeps scheduled', 'Telemetry anonymization tightened']
    },
    pillars: {
        badge: 'stack.signal',
        headline: 'The toolchain that keeps the vibe coherent.',
        subline: 'React, GSAP, WebGL, and GPU-first pathways choreographed as one organism.',
        accent: '#34d399',
        gradient: 'from-emerald-500/20 via-slate-900 to-lime-900/30',
        feature: {
            kicker: 'Build Sheet',
            title: 'Composable Geometry Stack',
            summary: 'GeometryRegistry, ProjectionEngine, and ShaderLibrary form the tri-core engine for all visualizers.',
            meta: 'Tech Stack · 6 min read',
            body: [
                'VisualizerPool manages 7+ WebGL contexts without starving the UI thread.',
                'RenderScheduler keeps 60fps by batching non-critical DOM updates.',
                'PresetDatabase hands designers one-click scene swaps without touching code.'
            ],
            beams: ['WebGPU ready', 'GLSL snippet bank', 'LayoutManager-aware'],
        },
        stream: [
            { title: 'React Three Fiber', tag: 'R3F', desc: 'Declarative 3D with zero friction to design tooling.' },
            { title: 'WebGPU Pipeline', tag: 'GPU', desc: 'Native-level performance without native installs.' },
            { title: 'GSAP Timelines', tag: 'Motion', desc: 'Temporal orchestration for responsive micro-states.' },
            { title: 'TensorFlow.js', tag: 'ML', desc: 'On-device inference to keep latency and data safe.' },
        ],
        micro: ['ShaderLibrary update pushed', 'VisualizerPool heatmap stable', 'Instancing benchmark: 120k pts @58fps']
    },
    quality: {
        badge: 'case.study',
        headline: 'Deep dives into the most demanding builds.',
        subline: 'Postmortems, perf clinics, and brave test rigs.',
        accent: '#fb923c',
        gradient: 'from-orange-500/25 via-slate-900 to-cyan-900/40',
        feature: {
            kicker: 'Lab Report',
            title: 'Building VIB34D',
            summary: 'A 4D hypercube renderer tuned for glitch-reactivity and crisp UX feedback loops.',
            meta: 'Case Study · 11 min read',
            body: [
                'Hypercube edges glow with audio-reactive color ramps for human-legible feedback.',
                'InteractionCoordinator throttles bursts so RenderScheduler never drops below 55fps.',
                'PerformanceMonitor streams FPS + memory into the HUD for real-time QA.'
            ],
            beams: ['Audio-reactive edges', 'Glitch-safe state', 'QA overlays built-in'],
        },
        stream: [
            { title: 'Generative UI', tag: 'Tutorial', desc: 'Noise-driven layouts that never tile.' },
            { title: 'RAG Pipelines', tag: 'Backend', desc: 'Knowledge retrieval tuned for doc-heavy teams.' },
            { title: 'Audio Reactivity', tag: 'DSP', desc: 'FFT analysis driving layered particles.' },
            { title: 'Global State', tag: 'Zustand', desc: 'Transient updates that don’t lock the render thread.' },
        ],
        micro: ['GPU temp stable @64c', 'QA suite: 124 assertions', 'RenderScheduler: 14.2ms avg frame']
    },
    sustainability: {
        badge: 'future.cast',
        headline: 'Signals about the next four quarters (and beyond).',
        subline: 'Predictions, risks, and safeguards for the way we code.',
        accent: '#22d3ee',
        gradient: 'from-sky-400/25 via-slate-900 to-emerald-900/30',
        feature: {
            kicker: 'Forecast',
            title: 'Compute Governance',
            summary: 'Balancing aesthetics with carbon budgets by tuning shader complexity to the device envelope.',
            meta: 'Futures · 5 min read',
            body: [
                'Adaptive detail scaling tied to PerformanceMonitor keeps mobile devices cool.',
                'ProjectionEngine learns to downsample geometry intelligently when signal is low.',
                'We design for longevity: presets that fail gracefully on degraded hardware.'
            ],
            beams: ['Adaptive fidelity', 'Eco budgets', 'Fail-soft defaults'],
        },
        stream: [
            { title: 'Model Collapse', tag: 'Risk', desc: 'What happens when AI trains on AI exhaust?' },
            { title: '1,000x Dev', tag: 'People', desc: 'AI amplification and new engineering rituals.' },
            { title: 'Neural Interfaces', tag: 'BCI', desc: 'Preparing the DOM for brain-computer IO.' },
            { title: 'Latency Futures', tag: 'Edge', desc: 'Predictive caching for immersive AR/VR front-ends.' },
        ],
        micro: ['Green pipelines enabled', 'Latency target: <40ms', 'Edge sim #45 completed']
    },
    contact: {
        badge: 'join.the.loop',
        headline: 'Collaborate with the VIB3 collective.',
        subline: 'Open calls, community drops, and studio access codes.',
        accent: '#e5e7eb',
        gradient: 'from-slate-100/15 via-slate-900 to-indigo-900/60',
        feature: {
            kicker: 'Invitation',
            title: 'Become a Co-Builder',
            summary: 'We run weekly build rooms with designers, engineers, and researchers shipping multi-sensory experiments.',
            meta: 'Community · 4 min read',
            body: [
                'Pair up with visual engineers to wire new geometries into the VisualizerPool.',
                'Ship micro-interactions with GestureRecognizer prototypes and share your findings.',
                'Drop into the DebugInterface to propose presets and stress tests.'
            ],
            beams: ['Weekly build rooms', 'Preset swaps', 'Open telemetry'],
        },
        stream: [
            { title: 'Access Codes', tag: 'Community', desc: 'Apply for a lab slot and gain deploy rights.' },
            { title: 'Office Hours', tag: 'Live', desc: 'Bring a prototype; leave with a performance plan.' },
            { title: 'Contributor Ladder', tag: 'Guild', desc: 'Earn badges for shipping stable presets.' },
            { title: 'Support Desk', tag: 'Help', desc: 'We route issues straight to the SystemOrchestrator.' },
        ],
        micro: ['New co-builder slots open', 'Docs refresh underway', 'Badge minting v2 ready']
    }
} as const;

export type SectionId = keyof typeof SECTION_CONTENT;

export const SECTION_GESTURES: Record<SectionId, { gesture: string; response: string; geometry: string; }[]> = {
    hero: [
        { gesture: 'scroll drift', response: 'gridDensity ramps with a cyan haze', geometry: 'hypercube' },
        { gesture: 'edge drag', response: 'rotation spikes then settles into bloom', geometry: 'hypercube' },
        { gesture: 'hover hold', response: 'glitchIntensity feathers to 0.08', geometry: 'hypercube' },
    ],
    philosophy: [
        { gesture: 'soft scroll', response: 'patternIntensity eases toward clarity', geometry: 'hypersphere' },
        { gesture: 'keyboard tap', response: 'projection favors curvature for consent cues', geometry: 'hypersphere' },
        { gesture: 'hover', response: 'colorScheme warms to reveal audit trails', geometry: 'hypersphere' },
    ],
    pillars: [
        { gesture: 'wheel sprint', response: 'gridDensity spikes to show the stack load', geometry: 'hypertetrahedron' },
        { gesture: 'pointer orbit', response: 'morphFactor flickers with shader swaps', geometry: 'hypertetrahedron' },
        { gesture: 'drag', response: 'RenderScheduler pacing rebalances blur shells', geometry: 'hypertetrahedron' },
    ],
    quality: [
        { gesture: 'scroll brake', response: 'glitchIntensity clamps and HUD stabilizes', geometry: 'hypercube' },
        { gesture: 'tap focus', response: 'QA overlays snap into sharpness', geometry: 'hypercube' },
        { gesture: 'hover linger', response: 'patternIntensity pulses against orange seams', geometry: 'hypercube' },
    ],
    sustainability: [
        { gesture: 'slow drag', response: 'adaptive fidelity scales to eco budgets', geometry: 'hypersphere' },
        { gesture: 'touch hold', response: 'projection softens edges for cooler renders', geometry: 'hypersphere' },
        { gesture: 'scroll micro', response: 'PerformanceMonitor throttles beams', geometry: 'hypersphere' },
    ],
    contact: [
        { gesture: 'hover ping', response: 'open telemetry ribbons glow for invites', geometry: 'hypertetrahedron' },
        { gesture: 'scroll seek', response: 'badge minting lights up contributor ladder', geometry: 'hypertetrahedron' },
        { gesture: 'drag nudge', response: 'SystemOrchestrator routes support lanes', geometry: 'hypertetrahedron' },
    ],
};

export const SECTION_QA: Record<SectionId, { label: string; status: 'pass' | 'warn'; detail: string; }[]> = {
    hero: [
        { label: 'fps', status: 'pass', detail: '60fps sustained under feature card expansion' },
        { label: 'latency', status: 'pass', detail: 'GestureHandler drag resets under 120ms' },
        { label: 'stability', status: 'warn', detail: 'Glitch burst spikes need smoothing on mobile' },
    ],
    philosophy: [
        { label: 'audit', status: 'pass', detail: 'DebugInterface ribbons stay legible on morph' },
        { label: 'ethics', status: 'pass', detail: 'Consent prompts surface pre-animation' },
        { label: 'perf', status: 'warn', detail: 'Long scrolls trigger mild density jumps' },
    ],
    pillars: [
        { label: 'render', status: 'pass', detail: 'Shader swaps hold 58-60fps during drags' },
        { label: 'layout', status: 'pass', detail: 'Article rails retain snap points on resize' },
        { label: 'ops', status: 'warn', detail: 'Heatmap overlay pending thermal budget' },
    ],
    quality: [
        { label: 'qa', status: 'pass', detail: 'Morphing card overflow resets on close' },
        { label: 'metrics', status: 'pass', detail: 'PerformanceMonitor HUD synced to nav' },
        { label: 'glitch', status: 'warn', detail: 'High glitchIntensity when dragging fast' },
    ],
    sustainability: [
        { label: 'eco', status: 'pass', detail: 'Adaptive fidelity locks below 0.6 on mobile' },
        { label: 'temp', status: 'warn', detail: 'Edge devices warm during dual beams' },
        { label: 'fail-soft', status: 'pass', detail: 'Geometry downsample recovers gracefully' },
    ],
    contact: [
        { label: 'access', status: 'pass', detail: 'Invite flow renders without blocking nav' },
        { label: 'support', status: 'pass', detail: 'HUD surfaces help desk in <2s' },
        { label: 'ops', status: 'warn', detail: 'Badge mint progress needs caching' },
    ],
};

export const CONTROL_SYSTEMS: Record<SectionId, { name: string; role: string; geometry: string; load: string; action: string; tune?: { rotationSpeed?: number; patternIntensity?: number; glitchIntensity?: number; gridDensity?: number; }; }[]> = {
    hero: [
        { name: 'VIB3HomeMaster', role: 'Keeps the hero feed coherent under scroll turbulence.', geometry: 'hypercube', load: 'sync load: 0.62', action: 'stabilize', tune: { patternIntensity: 0.2, rotationSpeed: 0.08 } },
        { name: 'VisualizerPool', role: 'Balances shader beams with cyan-led glow rails.', geometry: 'hypercube', load: 'beam load: 0.48', action: 'rebalance', tune: { gridDensity: 6, glitchIntensity: 0.02 } },
        { name: 'RenderScheduler', role: 'Eases scroll locks so the morphing card breathes.', geometry: 'hypercube', load: 'frame pace: 60', action: 'feather', tune: { rotationSpeed: -0.05, patternIntensity: -0.08 } },
    ],
    philosophy: [
        { name: 'GestureRecognizer', role: 'Detects consent-focused gestures before morphs fire.', geometry: 'hypersphere', load: 'intent map: warm', action: 'listen', tune: { glitchIntensity: -0.01, patternIntensity: 0.1 } },
        { name: 'UnifiedReactivity', role: 'Aligns ethics prompts with WebGL curvature cues.', geometry: 'hypersphere', load: 'sync load: 0.57', action: 'align', tune: { rotationSpeed: 0.05, gridDensity: 4 } },
        { name: 'ThemeEngine', role: 'Sweeps gradients for disclosure ribbons during scroll.', geometry: 'hypersphere', load: 'palette: fuchsia', action: 'recolor', tune: { patternIntensity: 0.14 } },
    ],
    pillars: [
        { name: 'GeometryRegistry', role: 'Serves hypertetra presets to the stack rail.', geometry: 'hypertetrahedron', load: 'registry: 8 forms', action: 'swap', tune: { gridDensity: 8, rotationSpeed: 0.12 } },
        { name: 'SystemOrchestrator', role: 'Routes shader swaps without starving layout.', geometry: 'hypertetrahedron', load: 'ops load: 0.51', action: 'route', tune: { glitchIntensity: 0.01, patternIntensity: 0.12 } },
        { name: 'LayoutManager', role: 'Locks snap points as article rails accelerate.', geometry: 'hypertetrahedron', load: 'layout: 1440', action: 'anchor', tune: { rotationSpeed: -0.04 } },
    ],
    quality: [
        { name: 'PerformanceMonitor', role: 'Streams fps + memory into QA ribbons.', geometry: 'hypercube', load: 'telemetry: live', action: 'trace', tune: { glitchIntensity: -0.02, rotationSpeed: 0.09 } },
        { name: 'EffectCoordinator', role: 'Sequencer that gates glitch bursts during drags.', geometry: 'hypercube', load: 'effect load: 0.44', action: 'gate', tune: { patternIntensity: 0.16, glitchIntensity: 0.03 } },
        { name: 'DebugInterface', role: 'Pins warnings to the morphing card header.', geometry: 'hypercube', load: 'alerts: 3', action: 'pin', tune: { rotationSpeed: -0.02 } },
    ],
    sustainability: [
        { name: 'PresetDatabase', role: 'Chooses eco presets before the geometry blooms.', geometry: 'hypersphere', load: 'eco load: 0.32', action: 'budget', tune: { gridDensity: -4, patternIntensity: -0.06 } },
        { name: 'ProjectionEngine', role: 'Downsamples edges when PerformanceMonitor warns.', geometry: 'hypersphere', load: 'projection: adaptive', action: 'cool', tune: { rotationSpeed: -0.03, glitchIntensity: -0.01 } },
        { name: 'EffectCoordinator', role: 'Staggers particle bursts to keep temps under 60c.', geometry: 'hypersphere', load: 'beam load: 0.41', action: 'stagger', tune: { patternIntensity: 0.08 } },
    ],
    contact: [
        { name: 'SystemOrchestrator', role: 'Keeps invite lanes open while cards expand.', geometry: 'hypertetrahedron', load: 'ops load: 0.39', action: 'open', tune: { patternIntensity: 0.12, rotationSpeed: 0.05 } },
        { name: 'PresetDatabase', role: 'Swaps contributor ladders into active presets.', geometry: 'hypertetrahedron', load: 'presets: live', action: 'swap', tune: { gridDensity: 5 } },
        { name: 'ErrorHandler', role: 'Catches modal overflow before it hits the revolver.', geometry: 'hypertetrahedron', load: 'alerts: low', action: 'guard', tune: { glitchIntensity: -0.015, rotationSpeed: -0.02 } },
    ],
};

export const MASTER_PLAN = [
    {
        id: 'turn-1',
        title: 'Immersion + Palette',
        goal: 'Align the revolver, hero gradient field, and morphing card motion with the VIB34D tone.',
        actions: [
            'Refine revolver bezel depth + scanline glow to echo the domus vibe.',
            'Synchronize visualizer colorScheme and patternIntensity to each section change.',
            'Ship one flagship morphing card that can burst full-screen and throttle glitches gracefully.'
        ],
        progress: 72,
        mode: 'Live',
        cta: 'sync',
    },
    {
        id: 'turn-2',
        title: 'Section Ecosystems',
        goal: 'Give every deck its own scrollable article rail, micro-signal log, and tactile accents.',
        actions: [
            'Wire per-section stream rails with snap scrolling and accent pulses.',
            'Expose micro signals that mirror the InteractionCoordinator + GestureRecognizer stack.',
            'Balance layout density for desktop + touch with responsive blur shells.'
        ],
        progress: 61,
        mode: 'Build',
        cta: 'route',
    },
    {
        id: 'turn-3',
        title: 'Visualizer Choreography',
        goal: 'Map gestures to geometry swaps while keeping the UnifiedReactivityBridge coherent.',
        actions: [
            'Pulse patternIntensity + glitchIntensity when cards expand or collapse.',
            'Expose geometryType + gridDensity combos inspired by the VIB34D registry.',
            'Ensure RenderScheduler-like pacing by easing GSAP tweens across sections.'
        ],
        progress: 48,
        mode: 'Lab',
        cta: 'tune',
    },
    {
        id: 'turn-4',
        title: 'Telemetry + QA',
        goal: 'Overlay a HUD that reports system IDs, navigation intents, and performance cues.',
        actions: [
            'Keep footer HUD alive with section IDs and traversal hints.',
            'Add roadmap callouts that reflect DebugInterface-inspired clarity.',
            'Ensure the morphing card never blocks scroll when closed (body overflow resets).'
        ],
        progress: 54,
        mode: 'QA',
        cta: 'verify',
    },
    {
        id: 'turn-5',
        title: 'Experience Polish',
        goal: 'Layer subtle gradients, orbital beams, and neon seams for the full VIB3 sheen.',
        actions: [
            'Blend radial textures with accent-colored orbitals inside every hero block.',
            'Give CTA chips and beams consistent uppercase mono rungs.',
            'Finish with tactile shadows that respond to hover and focus states.'
        ],
        progress: 33,
        mode: 'Polish',
        cta: 'shine',
    }
] as const;
