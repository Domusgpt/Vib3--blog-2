import React, { useMemo } from 'react';
import { MASTER_PLAN, SECTION_CONTENT, SECTIONS, SectionId } from '../../constants';

interface TelemetryHudProps {
    sectionId: SectionId;
    profile: Record<string, any>;
}

const TelemetryHud: React.FC<TelemetryHudProps> = ({ sectionId, profile }) => {
    const section = SECTION_CONTENT[sectionId];
    const planStep = useMemo(() => {
        const sectionIndex = Math.max(0, SECTIONS.findIndex((entry) => entry.id === sectionId));
        return MASTER_PLAN[Math.min(MASTER_PLAN.length - 1, sectionIndex)] || MASTER_PLAN[0];
    }, [sectionId]);

    const metrics = [
        { label: 'geometry', value: profile.geometryType },
        { label: 'grid', value: profile.gridDensity },
        { label: 'rotation', value: `${profile.rotationSpeed ?? 0}` },
        { label: 'pattern', value: `${profile.patternIntensity ?? 1}` },
    ];

    return (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92vw] md:w-[840px] pointer-events-none">
            <div className="bg-slate-950/70 border border-white/10 backdrop-blur-xl rounded-3xl shadow-[0_12px_60px_rgba(0,0,0,0.35)] overflow-hidden">
                <div className="relative px-4 py-3 md:px-6 md:py-4">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.08),transparent_45%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_120%,rgba(255,255,255,0.06),transparent_50%)]" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6 text-[10px] font-mono uppercase tracking-[0.28em] text-slate-300">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: section?.accent }} />
                            <span>hud::telemetry</span>
                            <span className="hidden md:inline text-slate-500">// live sync</span>
                        </div>
                        <div className="flex items-center gap-2 md:gap-4 text-slate-200/80">
                            {metrics.map((metric) => (
                                <div key={metric.label} className="flex items-center gap-2">
                                    <span className="text-slate-500">{metric.label}</span>
                                    <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/90">
                                        {metric.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 text-slate-400 text-[9px]">
                            <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">plan::{planStep.id}</span>
                            <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">mode::{planStep.mode}</span>
                            <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">cta::{planStep.cta}</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 border-t border-white/5 bg-slate-950/80 text-[10px] font-mono uppercase tracking-[0.24em] text-slate-400">
                    <div className="px-4 py-2 border-r border-white/5 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>nav::drag edges</span>
                    </div>
                    <div className="px-4 py-2 border-r border-white/5 hidden md:flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                        <span>escape closes morph</span>
                    </div>
                    <div className="px-4 py-2 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
                        <span>system::{sectionId}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TelemetryHud;
