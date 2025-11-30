import React from 'react';
import { VisualizerRef } from '../VisualizerCanvas';
import { SectionId, VISUALIZER_PROFILES } from '../../constants';

export interface LabPhase {
    phase: string;
    palette: string;
    caption: string;
    cue: string;
    mask: number;
    blur: number;
}

interface LabHandshakePanelProps {
    accent: string;
    sectionId: SectionId;
    phases: LabPhase[];
    visualizerRef: React.RefObject<VisualizerRef | null>;
}

const LabHandshakePanel: React.FC<LabHandshakePanelProps> = ({ accent, sectionId, phases, visualizerRef }) => {
    const baseProfile = VISUALIZER_PROFILES[sectionId];

    const handleHover = (phase: LabPhase) => {
        visualizerRef.current?.updateParams({
            ...baseProfile,
            patternIntensity: (baseProfile.patternIntensity ?? 1) + phase.mask * 0.1,
            glitchIntensity: Math.max(0, (baseProfile.glitchIntensity ?? 0.02) + phase.blur * 0.02),
            rotationSpeed: (baseProfile.rotationSpeed ?? 0.2) + 0.05,
        });
    };

    const handleLeave = () => visualizerRef.current?.updateParams(baseProfile);

    return (
        <div className="p-4 md:p-6 rounded-3xl bg-slate-950/70 border border-white/10 backdrop-blur-xl shadow-[0_16px_70px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-slate-400 font-mono mb-4">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full animate-ping" style={{ background: accent }} />
                    <span>Immersive Lab</span>
                </div>
                <span className="text-slate-500">morph ↔ crystal</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {phases.map((phase) => (
                    <div
                        key={phase.phase}
                        onMouseEnter={() => handleHover(phase)}
                        onFocus={() => handleHover(phase)}
                        onMouseLeave={handleLeave}
                        onBlur={handleLeave}
                        tabIndex={0}
                        className="group relative p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition shadow-inner overflow-hidden outline-none"
                    >
                        <div className="absolute inset-0 opacity-60" style={{ background: phase.palette }} />
                        <div className="absolute inset-0 backdrop-blur-sm" style={{ opacity: 0.25 + phase.blur * 0.1 }} />
                        <div className="relative z-10 space-y-2">
                            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-white/80 font-mono">
                                <span>{phase.phase}</span>
                                <span className="px-2 py-0.5 rounded-full bg-slate-900/60 border border-white/20 text-white/80">{phase.cue}</span>
                            </div>
                            <p className="text-sm text-white leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">{phase.caption}</p>
                            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                                <div className="h-full" style={{ width: `${40 + phase.mask * 20}%`, background: accent }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <p className="mt-4 text-xs text-slate-400 font-mono leading-relaxed">
                Legend chips now carry palette labels while the dual-visualizer swap synchronizes blur + mask intensity for a cleaner invert effect.
            </p>
        </div>
    );
};

export default LabHandshakePanel;
