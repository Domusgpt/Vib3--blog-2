import React from 'react';
import { VisualizerRef } from '../VisualizerCanvas';
import { SectionId, VISUALIZER_PROFILES } from '../../constants';

export interface ControlSystem {
    name: string;
    role: string;
    geometry: string;
    load: string;
    action: string;
    tune?: {
        rotationSpeed?: number;
        patternIntensity?: number;
        glitchIntensity?: number;
        gridDensity?: number;
    };
}

interface ControlSurfaceProps {
    accent: string;
    sectionId: SectionId;
    systems: ControlSystem[];
    visualizerRef: React.RefObject<VisualizerRef | null>;
}

const ControlSurface: React.FC<ControlSurfaceProps> = ({ accent, sectionId, systems, visualizerRef }) => {
    const baseProfile = VISUALIZER_PROFILES[sectionId];

    const handleHover = (system: ControlSystem) => {
        visualizerRef.current?.updateParams({
            ...baseProfile,
            geometryType: system.geometry,
            rotationSpeed: (baseProfile.rotationSpeed ?? 0.25) + (system.tune?.rotationSpeed ?? 0),
            patternIntensity: (baseProfile.patternIntensity ?? 1) + (system.tune?.patternIntensity ?? 0),
            glitchIntensity: Math.min(0.2, (baseProfile.glitchIntensity ?? 0.02) + (system.tune?.glitchIntensity ?? 0)),
            gridDensity: (baseProfile.gridDensity ?? 20) + (system.tune?.gridDensity ?? 0),
        });
    };

    const handleLeave = () => {
        visualizerRef.current?.updateParams(baseProfile);
    };

    return (
        <div className="p-4 md:p-6 rounded-3xl bg-slate-950/70 border border-white/10 backdrop-blur-xl shadow-[0_16px_70px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-slate-400 font-mono mb-4">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full animate-ping" style={{ background: accent }} />
                    <span>Control Surface</span>
                </div>
                <span className="text-slate-500">systems → geometry</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {systems.map((system) => (
                    <div
                        key={system.name}
                        onMouseEnter={() => handleHover(system)}
                        onFocus={() => handleHover(system)}
                        onMouseLeave={handleLeave}
                        onBlur={handleLeave}
                        className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition shadow-inner outline-none"
                        tabIndex={0}
                    >
                        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-slate-300 font-mono">
                            <span>{system.name}</span>
                            <span className="px-2 py-0.5 rounded-full border border-white/15 bg-white/10 text-white/80">{system.geometry}</span>
                        </div>
                        <p className="mt-3 text-sm text-slate-200 leading-relaxed">{system.role}</p>

                        <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-[0.25em]">
                            <span className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
                                {system.load}
                            </span>
                            <span className="text-white/80">{system.action}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] uppercase tracking-[0.25em] text-slate-300 font-mono">
                {["VIB3HomeMaster", "UnifiedReactivity", "VisualizerPool", "RenderScheduler"].map((chip) => (
                    <span key={chip} className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-center">
                        {chip}
                    </span>
                ))}
            </div>

            <p className="mt-4 text-xs text-slate-400 font-mono leading-relaxed">
                Hover or focus a system to retune geometry and pacing. The panel keeps the visualizer anchored to the active section so the revolver stays coherent.
            </p>
        </div>
    );
};

export default ControlSurface;
