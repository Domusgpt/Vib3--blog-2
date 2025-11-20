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
