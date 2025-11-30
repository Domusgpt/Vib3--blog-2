import React, { useMemo, useState } from 'react';

interface HeroBrandPanelProps {
    accent: string;
    brand: {
        crest: string;
        blueprint: string;
        cta: { label: string; href: string; note: string };
        microCards: { title: string; detail: string; token: string }[];
    };
}

const HeroBrandPanel: React.FC<HeroBrandPanelProps> = ({ accent, brand }) => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
        setOffset({ x, y });
    };

    const parallaxStyle = useMemo(() => ({
        transform: `rotateX(${offset.y * -8}deg) rotateY(${offset.x * 10}deg) translateZ(0)`,
    }), [offset]);

    return (
        <div
            className="relative w-full rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl shadow-[0_16px_60px_rgba(0,0,0,0.4)] overflow-hidden"
            onMouseMove={handleMove}
            onMouseLeave={() => setOffset({ x: 0, y: 0 })}
            style={{ perspective: 1200 }}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(255,255,255,0.14),transparent_45%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.08),transparent_50%)]" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accent}22, transparent 55%)` }} />

            <div className="relative z-10 p-6 md:p-8 flex flex-col gap-6" style={{ transformStyle: 'preserve-3d' }}>
                <div className="flex items-center justify-between gap-3 flex-wrap" style={parallaxStyle}>
                    <div className="flex items-center gap-3 text-sm md:text-base font-black uppercase tracking-[0.28em] text-white">
                        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 font-mono text-[11px]">Brand</span>
                        <span className="text-white/80">{brand.crest}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.26em] text-slate-300">
                        <span className="h-2 w-2 rounded-full animate-ping" style={{ background: accent }} />
                        {brand.blueprint}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" style={parallaxStyle}>
                    {brand.microCards.map((card) => (
                        <div
                            key={card.title}
                            className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner hover:border-white/30 transition"
                        >
                            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-slate-300 font-mono">
                                <span>{card.title}</span>
                                <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/80">{card.token}</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-200 leading-relaxed">{card.detail}</p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between gap-3 flex-wrap" style={parallaxStyle}>
                    <div className="text-xs font-mono uppercase tracking-[0.26em] text-slate-400">
                        Clear Seas crest · Blueprint track
                    </div>
                    <a
                        href={brand.cta.href}
                        className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-semibold hover:bg-white/20 transition"
                    >
                        {brand.cta.label}
                    </a>
                </div>
                <p className="text-xs text-slate-300 font-mono leading-relaxed" style={parallaxStyle}>
                    {brand.cta.note}
                </p>
            </div>
        </div>
    );
};

export default HeroBrandPanel;
