import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';

interface Feature {
    kicker: string;
    title: string;
    summary: string;
    meta: string;
    body: string[];
    beams: string[];
}

interface MorphingFeatureCardProps {
    feature: Feature;
    accent: string;
    onExpandVisual?: (expanded: boolean) => void;
}

const MorphingFeatureCard: React.FC<MorphingFeatureCardProps> = ({ feature, accent, onExpandVisual }) => {
    const [expanded, setExpanded] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardRef.current) return;
        const ctx = gsap.context(() => {
            gsap.to(cardRef.current, {
                boxShadow: expanded
                    ? `0 20px 80px rgba(0,0,0,0.45), 0 0 50px ${accent}40`
                    : '0 10px 40px rgba(0,0,0,0.3)',
                scale: expanded ? 1.02 : 1,
                borderRadius: expanded ? '28px' : '24px',
                duration: 0.6,
                ease: 'power3.out'
            });

            if (orbitRef.current) {
                gsap.to(orbitRef.current, {
                    rotate: expanded ? 360 : 0,
                    duration: expanded ? 16 : 10,
                    ease: 'none',
                    repeat: -1
                });
            }
        }, cardRef);

        return () => ctx.revert();
    }, [expanded, accent]);

    useEffect(() => {
        document.body.style.overflow = expanded ? 'hidden' : 'auto';
        onExpandVisual?.(expanded);
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && expanded) {
                setExpanded(false);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKey);
        };
    }, [expanded, onExpandVisual]);

    const accentGradient = useMemo(
        () => `linear-gradient(135deg, ${accent}33 0%, ${accent}0 60%)`,
        [accent]
    );

    return (
        <div
            ref={cardRef}
            className={`relative ${expanded ? 'fixed inset-4 md:inset-10 z-50' : 'h-[480px]'} ` +
                'bg-slate-950/70 backdrop-blur-2xl border border-white/10 overflow-hidden transition-all duration-700'}
        >
            {/* background energy */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    ref={orbitRef}
                    className="absolute -inset-20 rounded-full mix-blend-screen opacity-70"
                    style={{ background: accentGradient }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.06),transparent_60%)]" />
            </div>

            <div className={`relative z-10 flex flex-col h-full ${expanded ? 'p-10 md:p-12' : 'p-8 md:p-10'}`}>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400 font-mono">
                    <span>{feature.kicker}</span>
                    <span className="text-slate-500">{feature.meta}</span>
                </div>

                <div className="mt-6 space-y-4">
                    <h2 className={`text-3xl md:text-5xl font-black leading-tight ${expanded ? 'max-w-3xl' : 'max-w-xl'}`}>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
                            {feature.title}
                        </span>
                    </h2>
                    <p className={`text-slate-300/90 text-lg md:text-xl leading-relaxed ${expanded ? 'max-w-3xl' : 'line-clamp-3'}`}>
                        {feature.summary}
                    </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    {feature.beams.map((beam) => (
                        <span
                            key={beam}
                            className="px-3 py-1 text-xs font-mono rounded-full border border-white/10 bg-white/5 text-white/80"
                        >
                            {beam}
                        </span>
                    ))}
                </div>

                <div className={`mt-8 grid gap-4 text-sm text-slate-200 ${expanded ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {feature.body.map((line, idx) => (
                        <div
                            key={idx}
                            className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:border-white/20 transition"
                        >
                            {line}
                        </div>
                    ))}
                </div>

                <div className="mt-auto pt-6 flex items-center justify-between">
                    <div className="text-xs font-mono text-slate-400 space-y-1">
                        <div className="h-[3px] w-24 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-white/70 animate-pulse" />
                        </div>
                        <span>morph-state::{expanded ? 'expanded' : 'compact'}</span>
                    </div>
                    <button
                        onClick={() => setExpanded((prev) => !prev)}
                        className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white font-semibold hover:bg-white/20 transition"
                    >
                        {expanded ? 'Close' : 'Expand'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MorphingFeatureCard;
