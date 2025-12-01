import React from 'react';
import { VisualizerRef } from '../VisualizerCanvas';
import { EmergencyJourney } from '../../constants';

interface EmergencyJourneyProps {
    data: EmergencyJourney;
    accent: string;
    visualizerRef: React.RefObject<VisualizerRef | null>;
}

const EmergencyJourneyTile: React.FC<EmergencyJourneyProps> = ({ data, accent, visualizerRef }) => {
    return (
        <div className="p-5 md:p-6 rounded-3xl bg-slate-950/70 border border-white/10 backdrop-blur-xl shadow-[0_16px_70px_rgba(0,0,0,0.35)] flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <div className="text-[11px] uppercase tracking-[0.3em] font-mono text-white/70">{data.kicker}</div>
                    <h3 className="text-2xl font-bold text-white leading-tight">{data.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed mt-1">{data.summary}</p>
                </div>
                <div className="flex flex-col items-end text-right text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">{data.status}</span>
                    <span className="text-white/50 mt-2">3-session choreography</span>
                </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
                {data.sessions.map((session) => (
                    <button
                        key={session.label}
                        onMouseEnter={() =>
                            visualizerRef.current?.updateParams({
                                patternIntensity: session.intensity,
                                rotationSpeed: session.rotationSpeed,
                                glitchIntensity: session.glitch,
                                gridDensity: session.grid,
                            })
                        }
                        onMouseLeave={() =>
                            visualizerRef.current?.updateParams({
                                patternIntensity: data.reset.patternIntensity,
                                rotationSpeed: data.reset.rotationSpeed,
                                glitchIntensity: data.reset.glitchIntensity,
                                gridDensity: data.reset.gridDensity,
                            })
                        }
                        className="group text-left p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/40 transition relative overflow-hidden"
                        style={{ boxShadow: `0 20px 40px rgba(0,0,0,0.35)` }}
                    >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300" style={{ background: session.gradient }} />
                        <div className="relative z-10 space-y-2">
                            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] font-mono text-slate-300">
                                <span>{session.label}</span>
                                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                            </div>
                            <h4 className="text-lg font-semibold text-white leading-snug">{session.title}</h4>
                            <p className="text-sm text-slate-200/80 leading-relaxed">{session.detail}</p>
                            <div className="flex flex-wrap gap-1 text-[10px] text-white/80 font-mono uppercase tracking-[0.2em]">
                                {session.cues.map((cue) => (
                                    <span key={cue} className="px-2 py-1 rounded-full bg-black/30 border border-white/10">
                                        {cue}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
                {data.metrics.map((metric) => (
                    <div key={metric.label} className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white/90 font-mono">
                        <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">{metric.label}</div>
                        <div className="text-lg font-semibold">{metric.value}</div>
                        <div className="text-[11px] text-white/60">{metric.note}</div>
                    </div>
                ))}
                <span className="flex-1" />
                <a
                    href={data.cta.href}
                    className="px-4 py-3 rounded-full bg-white/10 border border-white/20 text-sm font-semibold uppercase tracking-[0.25em] hover:bg-white/20 transition"
                >
                    {data.cta.label}
                </a>
            </div>
        </div>
    );
};

export default EmergencyJourneyTile;
