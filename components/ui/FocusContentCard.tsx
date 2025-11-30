import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FocusContent {
    kicker: string;
    title: string;
    meta: string;
    summary: string;
    highlights: string[];
    phases: { label: string; detail: string; cue: string; icon?: string; hue?: number; tilt?: number; }[];
    stats: { label: string; value: string; note: string; }[];
}

interface FocusContentCardProps {
    content: FocusContent;
    accent: string;
    onExpandVisual?: (expanded: boolean) => void;
}

const FocusContentCard: React.FC<FocusContentCardProps> = ({ content, accent, onExpandVisual }) => {
    const [expanded, setExpanded] = useState(false);
    const [progress, setProgress] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setPrefersReducedMotion(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    const accentGradient = useMemo(
        () => `linear-gradient(135deg, ${accent}55 0%, ${accent}15 60%, transparent 100%)`,
        [accent]
    );

    useEffect(() => {
        const root = panelRef.current;
        const scroller = scrollRef.current;
        document.body.style.overflow = expanded ? 'hidden' : 'auto';
        onExpandVisual?.(expanded);

        if (expanded && root && scroller && !prefersReducedMotion) {
            const ctx = gsap.context(() => {
                gsap.fromTo(
                    root,
                    { scale: 0.98, borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },
                    {
                        scale: 1,
                        borderRadius: '32px',
                        boxShadow: `0 28px 120px rgba(0,0,0,0.55), 0 0 60px ${accent}35`,
                        duration: 0.8,
                        ease: 'power3.out'
                    }
                );

                ScrollTrigger.create({
                    trigger: scroller,
                    start: 'top top',
                    end: 'bottom bottom',
                    onUpdate: (self) => setProgress(Math.round(self.progress * 100)),
                });
            }, root);

            const handleScroll = () => {
                const height = scroller.scrollHeight - scroller.clientHeight;
                if (height <= 0) return;
                setProgress(Math.round((scroller.scrollTop / height) * 100));
            };
            scroller.addEventListener('scroll', handleScroll);

            return () => {
                ctx.revert();
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
                scroller.removeEventListener('scroll', handleScroll);
            };
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [expanded, accent, onExpandVisual]);

    const activePhaseIndex = content.phases.length > 0
        ? Math.min(content.phases.length - 1, Math.floor((progress / 100) * content.phases.length))
        : 0;
    const activePhase = content.phases[activePhaseIndex];

    return (
        <div
            className={`relative w-full ${expanded ? 'fixed inset-4 md:inset-10 z-50' : ''}`}
        >
            <div
                ref={panelRef}
                className={`relative overflow-hidden bg-slate-950/75 backdrop-blur-2xl border border-white/10 transition-all duration-700 ${
                    expanded ? 'min-h-[70vh]' : 'min-h-[360px]'
                }`}
            >
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 opacity-80" style={{ background: accentGradient }} />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.12),transparent_55%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_35%,rgba(255,255,255,0.08),transparent_60%)]" />
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-white/10">
                        <div className="h-full bg-white/80" style={{ width: `${progress}%` }} />
                    </div>
                </div>

                <div
                    className={`relative z-10 ${expanded ? 'p-10 md:p-12' : 'p-7 md:p-8'} flex flex-col gap-6`}
                    style={expanded && activePhase?.hue ? { filter: `hue-rotate(${activePhase.hue}deg)`, transform: `rotateX(${activePhase.tilt ?? 0}deg)` } : undefined}
                >
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-slate-300 font-mono">
                        <span className="flex items-center gap-2">
                            {activePhase?.icon && <span className="text-white/70">{activePhase.icon}</span>}
                            {content.kicker}
                        </span>
                        <span className="text-slate-500">{content.meta}</span>
                    </div>

                    <div className="space-y-3">
                        <h3 className={`font-black leading-tight text-white ${expanded ? 'text-4xl md:text-5xl max-w-4xl' : 'text-3xl md:text-4xl max-w-2xl'}`}>
                            {content.title}
                        </h3>
                        <p className={`text-slate-200/90 ${expanded ? 'text-lg md:text-xl max-w-3xl' : 'text-base md:text-lg line-clamp-3'}`}>
                            {content.summary}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {content.highlights.map((item) => (
                            <span
                                key={item}
                                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-[0.26em] text-white/80"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    {expanded ? (
                        <div className="rounded-3xl border border-white/10 bg-slate-900/60 overflow-hidden">
                            <div
                                ref={scrollRef}
                                className="relative h-[60vh] overflow-y-auto custom-scrollbar"
                            >
                                <div className="relative h-[800vh] p-6 md:p-10 text-slate-100 space-y-10">
                                    <div className="sticky top-0 bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-5 shadow-[0_10px_50px_rgba(0,0,0,0.35)]">
                                        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-slate-400 font-mono">
                                            <span>morphing viewport</span>
                                            <span style={{ color: accent }}>progress::{progress}%</span>
                                        </div>
                                        <p className="mt-2 text-sm md:text-base text-slate-100/90">
                                            800vh continuous scroll keeps the Vib3Code.com story anchored in a fixed viewport while layers morph with GSAP-driven gradients.
                                        </p>
                                    </div>

                                    {content.phases.map((phase) => (
                                        <section
                                            key={phase.label}
                                            className="p-5 md:p-6 rounded-2xl border border-white/10 bg-white/5 shadow-inner flex flex-col gap-3"
                                            style={phase.hue ? { filter: `hue-rotate(${phase.hue}deg)` } : undefined}
                                        >
                                            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-slate-300 font-mono">
                                                <span className="flex items-center gap-2">
                                                    {phase.icon && <span className="text-white/80">{phase.icon}</span>}
                                                    {phase.label}
                                                </span>
                                                <span className="px-2 py-1 rounded-full bg-white/10 border border-white/15 text-white/80">{phase.cue}</span>
                                            </div>
                                            <p className="text-sm md:text-base leading-relaxed text-slate-100/90">{phase.detail}</p>
                                        </section>
                                    ))}

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {content.stats.map((stat) => (
                                            <div key={stat.label} className="p-4 rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur">
                                                <div className="text-[11px] uppercase tracking-[0.24em] text-slate-400 font-mono">{stat.label}</div>
                                                <div className="text-2xl font-black text-white mt-1">{stat.value}</div>
                                                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{stat.note}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-200">
                            {content.phases.slice(0, 2).map((phase) => (
                                <div
                                    key={phase.label}
                                    className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3"
                                    style={phase.hue ? { filter: `hue-rotate(${phase.hue}deg)` } : undefined}
                                >
                                    <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
                                    <div>
                                        <div className="text-[11px] uppercase tracking-[0.22em] font-mono text-white/70">{phase.label}</div>
                                        <p className="text-sm text-slate-200/90 leading-relaxed line-clamp-2">{phase.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="pt-2 flex items-center justify-between">
                        <div className="text-[11px] font-mono uppercase tracking-[0.26em] text-slate-400 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full animate-ping" style={{ background: accent }} />
                            <span>{expanded ? 'fixed viewport mode' : 'focus-content ready'}</span>
                        </div>
                        <button
                            onClick={() => setExpanded((prev) => !prev)}
                            className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white font-semibold hover:bg-white/20 transition"
                        >
                            {expanded ? 'Close Focus' : 'Expand Focus'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FocusContentCard;
