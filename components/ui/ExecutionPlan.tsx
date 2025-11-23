import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export interface PlanStep {
    id: string;
    title: string;
    goal: string;
    actions: string[];
    progress: number;
    mode: string;
    cta: string;
}

interface ExecutionPlanProps {
    steps: PlanStep[];
    accent: string;
    onFocusStep?: (step: PlanStep) => void;
}

const ExecutionPlan: React.FC<ExecutionPlanProps> = ({ steps, accent, onFocusStep }) => {
    const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        progressRefs.current.forEach((node, idx) => {
            if (!node) return;
            gsap.fromTo(
                node,
                { width: '0%' },
                {
                    width: `${steps[idx]?.progress ?? 0}%`,
                    duration: 1.2,
                    ease: 'power3.out',
                    delay: idx * 0.05,
                }
            );
        });
    }, [steps]);

    return (
        <div className="p-4 md:p-6 rounded-3xl bg-slate-950/70 border border-white/10 backdrop-blur-xl shadow-[0_16px_70px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-400 font-mono">
                    <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: accent }} />
                    <span>Execution Plan</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">5-turn roadmap</span>
            </div>

            <div className="space-y-3">
                {steps.map((step, index) => (
                    <article
                        key={step.id}
                        onMouseEnter={() => onFocusStep?.(step)}
                        className="p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition duration-300"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <span
                                    className="h-10 w-10 rounded-2xl grid place-items-center font-mono text-xs text-white"
                                    style={{
                                        background: `linear-gradient(160deg, ${accent}25, ${accent}08)`
                                    }}
                                >
                                    {index + 1}
                                </span>
                                <div>
                                    <div className="text-[11px] uppercase tracking-[0.25em] text-slate-400 font-mono">{step.mode}</div>
                                    <h3 className="text-lg font-semibold text-white leading-tight">{step.title}</h3>
                                    <p className="text-sm text-slate-300/90">{step.goal}</p>
                                </div>
                            </div>
                            <button
                                className="px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold border border-white/15 bg-white/10 text-white hover:bg-white/20 transition"
                                style={{ boxShadow: `0 0 0 1px ${accent}20` }}
                            >
                                {step.cta}
                            </button>
                        </div>

                        <div className="mt-3 text-xs text-slate-300/90 leading-relaxed">
                            <ul className="list-disc pl-5 space-y-1">
                                {step.actions.map((action) => (
                                    <li key={action}>{action}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-3">
                            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-slate-400 font-mono mb-1">
                                <span>progress</span>
                                <span>{step.progress}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                                <div
                                    ref={(el) => (progressRefs.current[index] = el)}
                                    className="h-full rounded-full"
                                    style={{ background: accent, width: `${step.progress}%` }}
                                />
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default ExecutionPlan;
