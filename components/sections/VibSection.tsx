import React, { useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { SECTION_CONTENT, SectionId, SECTIONS, VISUALIZER_PROFILES } from '../../constants';
import { VisualizerRef } from '../VisualizerCanvas';
import MorphingFeatureCard from '../ui/MorphingFeatureCard';

interface VibSectionProps {
    sectionId: SectionId;
    visualizerRef: React.RefObject<VisualizerRef | null>;
}

const VibSection: React.FC<VibSectionProps> = ({ sectionId, visualizerRef }) => {
    const data = SECTION_CONTENT[sectionId];
    const accent = data?.accent || '#67e8f9';

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
            </div>
        </div>
    );
};

export default VibSection;
