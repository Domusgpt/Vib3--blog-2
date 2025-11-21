import React, { useMemo, useState } from 'react';
import { AUTH_ROADMAP, COMMENTS_PIPELINE, CONTENT_PIPELINE, EDITOR_WORKFLOWS, OBSERVABILITY_CHECKS, STORAGE_APIS, TeamRole } from '../../constants';

interface OperationsDashboardProps {
    onClose: () => void;
}

const tabOrder = [
    'overview',
    'auth',
    'editor',
    'comments',
    'content',
    'ops'
] as const;

type TabKey = typeof tabOrder[number];

const badgeStyle = 'px-2 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.25em] bg-white/10 border border-white/10';

const OperationsDashboard: React.FC<OperationsDashboardProps> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState<TabKey>('overview');

    const tabCopy: Record<TabKey, string> = useMemo(
        () => ({
            overview: 'Full-stack readiness',
            auth: 'User + session security',
            editor: 'Dashboard + scheduling',
            comments: 'Community moderation',
            content: 'JSON pipelines',
            ops: 'Storage + observability'
        }),
        []
    );

    const renderTeamRole = (role: TeamRole) => (
        <div key={role.name} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-sm text-white/80">
            <div className="space-y-1">
                <div className="text-xs font-semibold">{role.name}</div>
                <div className="text-slate-300/80 text-sm leading-relaxed">{role.scope}</div>
            </div>
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400">{role.cadence}</div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.04),transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(255,255,255,0.05),transparent_45%)]" />

            <div className="relative z-10 max-w-6xl mx-auto py-10 px-6 space-y-6 h-full overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-xs uppercase tracking-[0.35em] text-slate-400 font-mono flex items-center gap-3">
                            <span>Ops Command</span>
                            <span className="h-px w-12 bg-white/20" />
                            <span className="text-white/70">Editor, auth, comments, JSON</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white">Operational Backbone</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-full bg-white/10 border border-white/30 text-sm font-semibold hover:bg-white/20 transition"
                    >
                        Close
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-mono">
                    {tabOrder.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-1 rounded-full border ${
                                activeTab === tab ? 'bg-white text-slate-900 border-white' : 'bg-white/5 border-white/20 text-white'
                            } transition`}
                        >
                            {tabCopy[tab]}
                        </button>
                    ))}
                </div>

                {activeTab === 'overview' && (
                    <div className="grid gap-4 md:grid-cols-[1.2fr_1fr] items-start">
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 shadow-inner space-y-3">
                            <div className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-mono">Stack map</div>
                            <p className="text-slate-200 leading-relaxed">
                                Editor dashboard, authentication, comments, JSON-driven style/content, and observability are staged here.
                                Each lane includes validation hooks so AI agents can push updates safely and humans can approve.
                            </p>
                            <div className="grid grid-cols-2 gap-3 text-sm text-white/80">
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                                    <div className={badgeStyle}>security</div>
                                    <div className="font-semibold mt-2">Sessions, roles, CSRF</div>
                                    <p className="text-slate-300/80">httpOnly cookies, refresh flow, login throttles.</p>
                                </div>
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                                    <div className={badgeStyle}>community</div>
                                    <div className="font-semibold mt-2">Comments + moderation</div>
                                    <p className="text-slate-300/80">Threading, abuse filters, AI labels, soft-delete.</p>
                                </div>
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                                    <div className={badgeStyle}>content</div>
                                    <div className="font-semibold mt-2">JSON import + rollback</div>
                                    <p className="text-slate-300/80">Schema-checked uploads with previews, diffs, snapshots.</p>
                                </div>
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                                    <div className={badgeStyle}>ops</div>
                                    <div className="font-semibold mt-2">Observability + audits</div>
                                    <p className="text-slate-300/80">Activity feed, performance checks, deploy-ready runbooks.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 shadow-inner space-y-3">
                            <div className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-mono">Roles</div>
                            <div className="space-y-2">
                                {EDITOR_WORKFLOWS.roles.map(renderTeamRole)}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'auth' && (
                    <div className="grid gap-4 md:grid-cols-[1.2fr_1fr] items-start">
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-mono">Authentication</div>
                                <div className={badgeStyle}>security</div>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-200 list-disc list-inside">
                                {AUTH_ROADMAP.steps.map((step) => (
                                    <li key={step.title} className="leading-relaxed">
                                        <span className="font-semibold text-white">{step.title}:</span> {step.detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                            <div className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-mono">Session policies</div>
                            <div className="space-y-2">
                                {AUTH_ROADMAP.policies.map((item) => (
                                    <div key={item.label} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-slate-200">
                                        <div className="font-semibold text-white">{item.label}</div>
                                        <p className="text-slate-300/80">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'editor' && (
                    <div className="grid gap-4 md:grid-cols-[1.2fr_1fr] items-start">
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-mono">Dashboard flows</div>
                                <div className={badgeStyle}>scheduling</div>
                            </div>
                            <div className="space-y-3 text-sm text-slate-200">
                                {EDITOR_WORKFLOWS.flows.map((flow) => (
                                    <div key={flow.title} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                        <div className="flex items-center justify-between">
                                            <div className="font-semibold text-white">{flow.title}</div>
                                            <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-mono">{flow.status}</div>
                                        </div>
                                        <p className="text-slate-300/80 leading-relaxed">{flow.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3">
                            <div className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-mono">Scheduling hooks</div>
                            <div className="grid gap-3">
                                {EDITOR_WORKFLOWS.scheduling.map((hook) => (
                                    <div key={hook.label} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-slate-200">
                                        <div className="font-semibold text-white">{hook.label}</div>
                                        <p className="text-slate-300/80">{hook.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'comments' && (
                    <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr] items-start">
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                            <div className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-mono">Moderation pipeline</div>
                            <div className="space-y-3 text-sm text-slate-200">
                                {COMMENTS_PIPELINE.stages.map((stage) => (
                                    <div key={stage.name} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                        <div className="flex items-center justify-between">
                                            <div className="font-semibold text-white">{stage.name}</div>
                                            <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-mono">{stage.flag}</div>
                                        </div>
                                        <p className="text-slate-300/80 leading-relaxed">{stage.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-mono">AI scoring</div>
                                <div className={badgeStyle}>qa</div>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-200 list-disc list-inside">
                                {COMMENTS_PIPELINE.scoring.map((item) => (
                                    <li key={item.label} className="leading-relaxed">
                                        <span className="font-semibold text-white">{item.label}:</span> {item.detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === 'content' && (
                    <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr] items-start">
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-mono">JSON import</div>
                                <div className={badgeStyle}>validation</div>
                            </div>
                            <div className="space-y-3 text-sm text-slate-200">
                                {CONTENT_PIPELINE.schemas.map((schema) => (
                                    <div key={schema.name} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                        <div className="flex items-center justify-between">
                                            <div className="font-semibold text-white">{schema.name}</div>
                                            <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-mono">{schema.version}</div>
                                        </div>
                                        <p className="text-slate-300/80 leading-relaxed">{schema.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3">
                            <div className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-mono">Import controls</div>
                            <div className="grid gap-3">
                                {CONTENT_PIPELINE.controls.map((control) => (
                                    <div key={control.label} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-slate-200">
                                        <div className="font-semibold text-white">{control.label}</div>
                                        <p className="text-slate-300/80">{control.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'ops' && (
                    <div className="grid gap-4 lg:grid-cols-3 items-start">
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3 lg:col-span-2">
                            <div className="flex items-center justify-between">
                                <div className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-mono">Storage + API</div>
                                <div className={badgeStyle}>persistence</div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-200">
                                {STORAGE_APIS.map((item) => (
                                    <div key={item.label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                        <div className="font-semibold text-white flex items-center justify-between">
                                            <span>{item.label}</span>
                                            <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-mono">{item.priority}</span>
                                        </div>
                                        <p className="text-slate-300/80 leading-relaxed">{item.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-mono">Observability</div>
                                <div className={badgeStyle}>ci/cd</div>
                            </div>
                            <div className="space-y-2 text-sm text-slate-200">
                                {OBSERVABILITY_CHECKS.map((check) => (
                                    <div key={check.label} className="p-3 rounded-2xl bg-white/5 border border-white/10">
                                        <div className="font-semibold text-white">{check.label}</div>
                                        <p className="text-slate-300/80">{check.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OperationsDashboard;
