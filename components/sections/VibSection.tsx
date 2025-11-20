import React, { useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { CONTROL_SYSTEMS, MASTER_PLAN, SECTION_CONTENT, SECTION_GESTURES, SECTION_QA, SectionId, SECTIONS, VISUALIZER_PROFILES } from '../../constants';
import { VisualizerRef } from '../VisualizerCanvas';
import MorphingFeatureCard from '../ui/MorphingFeatureCard';
import ExecutionPlan, { PlanStep } from '../ui/ExecutionPlan';
import ControlSurface from '../ui/ControlSurface';

interface VibSectionProps {
    sectionId: SectionId;
    visualizerRef: React.RefObject<VisualizerRef | null>;
}

const VibSection: React.FC<VibSectionProps> = ({ sectionId, visualizerRef }) => {
    const data = SECTION_CONTENT[sectionId];
    const accent = data?.accent || '#67e8f9';
    const baseProfile = VISUALIZER_PROFILES[sectionId];

    useEffect(() => {
        const profile = VISUALIZER_PROFILES[sectionId];
        if (!profile) return;

        visualizerRef.current?.updateParams({
            ...profile,
            patternIntensity: profile.patternIntensity ?? 1.1,
            glitchIntensity: profile.glitchIntensity ?? 0.02,
        });

        const tween = gsap.to({}, {
            duration: 1.2,
            ease: 'power2.out'
        });

        return () => tween.kill();
    }, [sectionId, visualizerRef]);

    const streamCards = useMemo(() => data.stream || [], [data.stream]);
    const planSteps = useMemo(() => MASTER_PLAN, []);
    const gestureLattice = useMemo(() => SECTION_GESTURES[sectionId] || [], [sectionId]);
    const qaChecks = useMemo(() => SECTION_QA[sectionId] || [], [sectionId]);
    const controlSystems = useMemo(() => CONTROL_SYSTEMS[sectionId] || [], [sectionId]);

    return (
        <div className="w-full h-full overflow-y-auto custom-scrollbar relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient} opacity-80`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(255,255,255,0.05),transparent_45%)]" />

            <div className="relative z-10 min-h-full px-6 md:px-10 py-12 space-y-10">
                {/* header */}
                <header className="grid md:grid-cols-[1.2fr_1fr] gap-6 items-start">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-slate-400 font-mono">
                            <span>{data.badge}</span>
                            <span className="h-px flex-1 bg-gradient-to-r from-white/40 via-white/10 to-transparent" />
                            <span>{SECTIONS.find((s) => s.id === sectionId)?.title}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
                            {data.headline}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-200/80 max-w-3xl leading-relaxed">
                            {data.subline}
                        </p>
                        <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.25em] text-slate-400 font-mono">
                            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">VIB34D architecture</span>
                            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">Revolver navigation</span>
                            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">morphing feature card</span>
                        </div>
                    </div>
                    <div className="justify-self-end text-right space-y-3 hidden md:block">
                        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-[0.3em]">
                            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                            live feed
                        </div>
                        <div className="text-sm text-slate-300 font-mono leading-relaxed">
                            Revolver dial rotates through six thematic decks. Each section syncs the VIB34D visualizer profile to match the tone and density of its stories.
                        </div>
                    </div>
                </header>

                <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr] items-start">
                    <MorphingFeatureCard
                        feature={data.feature}
                        accent={accent}
                        onExpandVisual={(expanded) => {
                            visualizerRef.current?.updateParams({
                                patternIntensity: expanded ? 1.6 : (VISUALIZER_PROFILES[sectionId].patternIntensity ?? 1.1),
                                glitchIntensity: expanded ? 0.12 : (VISUALIZER_PROFILES[sectionId].glitchIntensity ?? 0.02)
                            });
                        }}
                    />

                    <div className="flex flex-col gap-6 h-full">
                        <div className="p-4 rounded-3xl bg-slate-950/60 border border-white/10 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.25)]">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-xs uppercase font-mono tracking-[0.3em] text-slate-400">Article Rail</div>
                                <span className="text-[10px] font-mono text-slate-500">scroll →</span>
                            </div>
                            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
                                {streamCards.map((item) => (
                                    <article
                                        key={item.title}
                                        className="min-w-[240px] snap-start p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition shadow-inner backdrop-blur"
                                    >
                                        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400 mb-3">
                                            <span>{item.tag}</span>
                                            <span className="h-1 w-1 rounded-full" style={{ background: accent }} />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                                        <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">{item.desc}</p>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-3xl bg-slate-950/60 border border-white/10 backdrop-blur-xl h-full shadow-[0_10px_50px_rgba(0,0,0,0.25)]">
                                <div className="text-xs uppercase font-mono tracking-[0.3em] text-slate-400 mb-3">Micro Signals</div>
                                <div className="space-y-3">
                                    {data.micro.map((note) => (
                                        <div key={note} className="p-3 rounded-2xl bg-white/5 border border-white/5 text-sm text-slate-200 flex items-start gap-3">
                                            <span className="h-2 w-2 rounded-full mt-1" style={{ background: accent }} />
                                            <span>{note}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 rounded-3xl bg-slate-950/60 border border-white/10 backdrop-blur-xl h-full shadow-[0_10px_50px_rgba(0,0,0,0.25)] flex flex-col justify-between">
                                <div className="text-xs uppercase font-mono tracking-[0.3em] text-slate-400 mb-3">Section Mood</div>
                                <div className="flex flex-wrap gap-2">
                                    {['VisualizerPool', 'UnifiedReactivity', 'GestureRecognizer', 'EffectCoordinator', 'ProjectionEngine'].map((chip) => (
                                        <span key={chip} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80">
                                            {chip}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-6 text-sm text-slate-300 font-mono leading-relaxed">
                                    Each section inherits a unique pattern density and geometry profile so the revolver navigation feels tactile and responsive.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr] items-stretch">
                    <ExecutionPlan
                        steps={planSteps as PlanStep[]}
                        accent={accent}
                        onFocusStep={(step) => {
                            visualizerRef.current?.updateParams({
                                patternIntensity: 0.9 + step.progress / 120,
                                rotationSpeed: 0.25 + step.progress / 300,
                                glitchIntensity: Math.min(0.14, 0.02 + step.progress / 800)
                            });
                        }}
                    />

                    <div className="p-4 md:p-6 rounded-3xl bg-slate-950/70 border border-white/10 backdrop-blur-xl shadow-[0_16px_70px_rgba(0,0,0,0.35)] flex flex-col gap-4">
                        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-slate-400 font-mono">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full animate-ping" style={{ background: accent }} />
                                <span>VIB34D moodboard</span>
                            </div>
                            <span className="text-slate-500">geometry sync</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm text-slate-200">
                            {["GeometryRegistry", "ProjectionEngine", "VisualizerPool", "EffectCoordinator"].map((item) => (
                                <div key={item} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                                    <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
                                    <span className="font-semibold">{item}</span>
                                </div>
                            ))}
                        </div>

                            <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/5">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.15),transparent_45%)]" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.12),transparent_50%)]" />
                                <div className="relative z-10 h-full p-4 flex flex-col justify-between">
                                    <div>
                                    <div className="text-xs uppercase tracking-[0.35em] text-slate-400 font-mono">Signal Threads</div>
                                    <p className="text-sm text-slate-200 mt-1">GestureRecognizer feeds InteractionCoordinator → UnifiedReactivityBridge → VisualizerPool.</p>
                                </div>
                                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-slate-300 font-mono">
                                    <span>mode::live</span>
                                    <span style={{ color: accent }}>loop::responsive</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] items-stretch">
                    <ControlSurface
                        accent={accent}
                        sectionId={sectionId}
                        systems={controlSystems}
                        visualizerRef={visualizerRef}
                    />

                    <div className="p-4 md:p-6 rounded-3xl bg-slate-950/70 border border-white/10 backdrop-blur-xl shadow-[0_16px_70px_rgba(0,0,0,0.35)] flex flex-col gap-4" onMouseEnter={() => visualizerRef.current?.updateParams({ ...baseProfile, patternIntensity: (baseProfile.patternIntensity ?? 1) + 0.12 })} onMouseLeave={() => visualizerRef.current?.updateParams(baseProfile)}>
                        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-slate-400 font-mono">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: accent }} />
                                <span>Failsafe Matrix</span>
                            </div>
                            <span className="text-slate-500">qa → rollback</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-200">
                            {[`SystemOrchestrator`, `ErrorHandler`, `GestureRecognizer`, `PerformanceMonitor`].map((item) => (
                                <div key={item} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                                    <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
                                    <div>
                                        <div className="text-[11px] uppercase tracking-[0.22em] font-mono text-white/70">{item}</div>
                                        <p className="text-xs text-slate-300">Auto-recovers the revolver if a morph stalls.</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                            <div className="text-[11px] uppercase tracking-[0.25em] text-slate-400 font-mono mb-2">Drill modes</div>
                            <div className="flex flex-wrap gap-2 text-[11px] font-mono uppercase tracking-[0.25em]">
                                {['Load-shed', 'Glitch-safe', 'Eco-pass', 'QA replay'].map((mode) => (
                                    <span
                                        key={mode}
                                        className="px-3 py-1 rounded-full bg-slate-900/70 border border-white/10 hover:border-white/30 transition"
                                    >
                                        {mode}
                                    </span>
                                ))}
                            </div>
                            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                                Modes mirror the MASTER_PLAN turns—select one to rehearse state resets without breaking the morphing feature card choreography.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr] items-stretch">
                    <div className="p-4 md:p-6 rounded-3xl bg-slate-950/65 border border-white/10 backdrop-blur-xl shadow-[0_16px_70px_rgba(0,0,0,0.35)]" onMouseLeave={() => visualizerRef.current?.updateParams(baseProfile)}>
                        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-slate-400 font-mono mb-4">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full animate-ping" style={{ background: accent }} />
                                <span>Interaction Lattice</span>
                            </div>
                            <span className="text-slate-500">gesture → geometry</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {gestureLattice.map((entry) => (
                                <div
                                    key={`${entry.gesture}-${entry.geometry}`}
                                    onMouseEnter={() => {
                                        visualizerRef.current?.updateParams({
                                            patternIntensity: (baseProfile.patternIntensity ?? 1.1) + 0.25,
                                            rotationSpeed: (baseProfile.rotationSpeed ?? 0.25) + 0.2,
                                            glitchIntensity: Math.min(0.15, (baseProfile.glitchIntensity ?? 0.02) + 0.05),
                                            geometryType: entry.geometry,
                                        });
                                    }}
                                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition shadow-inner"
                                >
                                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-slate-400 font-mono">
                                        <span>{entry.gesture}</span>
                                        <span className="px-2 py-0.5 rounded-full border border-white/15 bg-white/10 text-white/80">{entry.geometry}</span>
                                    </div>
                                    <p className="mt-3 text-sm text-slate-200 leading-relaxed">{entry.response}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 md:p-6 rounded-3xl bg-slate-950/65 border border-white/10 backdrop-blur-xl shadow-[0_16px_70px_rgba(0,0,0,0.35)]">
                        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-slate-400 font-mono mb-4">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: accent }} />
                                <span>Telemetry / QA</span>
                            </div>
                            <span className="text-slate-500">hud::live</span>
                        </div>
                        <div className="space-y-3">
                            {qaChecks.map((check) => (
                                <div
                                    key={check.label}
                                    className={`p-4 rounded-2xl border ${check.status === 'warn' ? 'border-amber-400/40 bg-amber-400/10' : 'border-emerald-400/30 bg-emerald-400/10'} flex items-start justify-between gap-3`}
                                >
                                    <div>
                                        <div className="text-[11px] uppercase tracking-[0.22em] font-mono text-white/80">{check.label}</div>
                                        <p className="text-sm text-white/90 leading-relaxed">{check.detail}</p>
                                    </div>
                                    <span className={`h-2 w-2 rounded-full mt-1 ${check.status === 'warn' ? 'bg-amber-300 animate-pulse' : 'bg-emerald-300'}`} />
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] uppercase tracking-[0.25em] text-slate-400 font-mono">
                            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                                <span>RenderScheduler pace</span>
                            </div>
                            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-fuchsia-300" />
                                <span>UnifiedReactivity sync</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VibSection;
