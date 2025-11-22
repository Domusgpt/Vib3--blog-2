import React, { useEffect, useMemo, useState } from 'react';
import {
    AUTH_ROADMAP,
    COMMENTS_PIPELINE,
    CONTENT_PIPELINE,
    EDITOR_WORKFLOWS,
    OBSERVABILITY_CHECKS,
    PUBLICATION_STANDARDS,
    STORAGE_APIS,
    TeamRole
} from '../../constants';
import { loadState, saveState } from '../../services/localStore';

type TabKey = 'overview' | 'auth' | 'editor' | 'comments' | 'content' | 'publishing' | 'ops';

const tabOrder: TabKey[] = ['overview', 'auth', 'editor', 'comments', 'content', 'publishing', 'ops'];
const badgeStyle = 'px-2 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.25em] bg-white/10 border border-white/10';

type DashboardUser = {
    id: string;
    email: string;
    displayName: string;
    role: 'viewer' | 'editor' | 'admin';
};

type DashboardSession = {
    userId: string;
    token: string;
    lastActive: string;
};

type CommentRecord = {
    id: string;
    post: string;
    author: string;
    body: string;
    status: 'pending' | 'approved' | 'flagged';
};

type ScheduledPost = {
    id: string;
    title: string;
    publishAt: string;
    owner: string;
    status: 'draft' | 'scheduled' | 'published';
};

type ImportRecord = {
    id: string;
    label: string;
    status: 'applied' | 'error' | 'draft';
    createdAt: string;
    detail: string;
};

interface OperationsDashboardProps {
    onClose: () => void;
}

const OperationsDashboard: React.FC<OperationsDashboardProps> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState<TabKey>('overview');
    const [users, setUsers] = useState<DashboardUser[]>(() =>
        loadState<DashboardUser[]>('vib3.ops.users', [
            { id: 'u-1', email: 'editor@vib3code.com', displayName: 'Deck Editor', role: 'editor' },
            { id: 'u-2', email: 'admin@vib3code.com', displayName: 'Ops Captain', role: 'admin' }
        ])
    );
    const [session, setSession] = useState<DashboardSession | null>(() => loadState<DashboardSession | null>('vib3.ops.session', null));
    const [comments, setComments] = useState<CommentRecord[]>(() =>
        loadState<CommentRecord[]>('vib3.ops.comments', [
            { id: 'c-1', post: 'Agentic Workflow 2.0', author: 'Ada', body: 'Loving the glitch-safe failovers.', status: 'pending' },
            { id: 'c-2', post: 'Composable Geometry Stack', author: 'Sam', body: 'ShaderLibrary diff looks clean.', status: 'approved' },
            { id: 'c-3', post: 'Vib3Code.com morphing journey', author: 'Kai', body: 'Is the 800vh pass accessible?', status: 'flagged' }
        ])
    );
    const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>(() =>
        loadState<ScheduledPost[]>('vib3.ops.schedule', [
            {
                id: 'p-1',
                title: 'AI Vibe Coding Playbook',
                publishAt: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(),
                owner: 'Deck Editor',
                status: 'scheduled'
            },
            {
                id: 'p-2',
                title: 'Morphing Experience QA',
                publishAt: new Date(Date.now() + 1000 * 60 * 60 * 36).toISOString(),
                owner: 'Ops Captain',
                status: 'draft'
            }
        ])
    );
    const [imports, setImports] = useState<ImportRecord[]>(() =>
        loadState<ImportRecord[]>('vib3.ops.imports', [
            {
                id: 'i-1',
                label: 'Hero focus-content preset',
                status: 'applied',
                detail: 'Updated morphing journey copy + colors',
                createdAt: new Date().toISOString()
            }
        ])
    );

    const [newUser, setNewUser] = useState({ email: '', displayName: '', role: 'viewer' as DashboardUser['role'] });
    const [loginEmail, setLoginEmail] = useState('');
    const [newComment, setNewComment] = useState({ post: '', author: '', body: '' });
    const [jsonDraft, setJsonDraft] = useState('');
    const [jsonStatus, setJsonStatus] = useState<'idle' | 'valid' | 'error'>('idle');
    const [jsonMessage, setJsonMessage] = useState('');
    const [scheduleDraft, setScheduleDraft] = useState({ title: '', publishAt: '', owner: '' });

    useEffect(() => saveState('vib3.ops.users', users), [users]);
    useEffect(() => saveState('vib3.ops.session', session), [session]);
    useEffect(() => saveState('vib3.ops.comments', comments), [comments]);
    useEffect(() => saveState('vib3.ops.schedule', scheduledPosts), [scheduledPosts]);
    useEffect(() => saveState('vib3.ops.imports', imports), [imports]);

    const tabCopy: Record<TabKey, string> = useMemo(
        () => ({
            overview: 'Full-stack readiness',
            auth: 'User + session security',
            editor: 'Dashboard + scheduling',
            comments: 'Community moderation',
            content: 'JSON pipelines',
            publishing: 'SEO + governance',
            ops: 'Storage + observability'
        }),
        []
    );

    const handleAddUser = () => {
        if (!newUser.email || !newUser.displayName) return;
        const id = `u-${Math.random().toString(36).slice(2, 7)}`;
        setUsers([...users, { ...newUser, id }]);
        setNewUser({ email: '', displayName: '', role: 'viewer' });
    };

    const handleLogin = () => {
        const existing = users.find((u) => u.email === loginEmail.trim());
        if (!existing) return;
        const now = new Date().toISOString();
        setSession({ userId: existing.id, token: `session-${existing.id}-${Date.now()}`, lastActive: now });
        setLoginEmail('');
    };

    const handleLogout = () => setSession(null);

    const handleCommentAction = (id: string, status: CommentRecord['status']) => {
        setComments((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    };

    const handleAddComment = () => {
        if (!newComment.post || !newComment.author || !newComment.body) return;
        const id = `c-${Date.now()}`;
        setComments([{ id, status: 'pending', ...newComment }, ...comments]);
        setNewComment({ post: '', author: '', body: '' });
    };

    const handleSchedulePost = () => {
        if (!scheduleDraft.title || !scheduleDraft.publishAt) return;
        const id = `p-${Date.now()}`;
        const next: ScheduledPost = {
            id,
            title: scheduleDraft.title,
            publishAt: scheduleDraft.publishAt,
            owner: scheduleDraft.owner || 'Unassigned',
            status: 'scheduled'
        };
        setScheduledPosts([next, ...scheduledPosts]);
        setScheduleDraft({ title: '', publishAt: '', owner: '' });
    };

    const handleJsonValidate = () => {
        try {
            const parsed = JSON.parse(jsonDraft);
            if (!parsed.sections || !Array.isArray(parsed.sections)) {
                throw new Error('Expected "sections" array');
            }
            const hasIds = parsed.sections.every((s: any) => s.id && s.title);
            if (!hasIds) throw new Error('Each section needs id + title');
            setJsonStatus('valid');
            setJsonMessage('Schema ok. Ready to apply to staging.');
        } catch (error: any) {
            setJsonStatus('error');
            setJsonMessage(error?.message || 'Invalid JSON');
        }
    };

    const handleJsonApply = () => {
        const record: ImportRecord = {
            id: `i-${Date.now()}`,
            label: jsonMessage || 'Imported preset',
            status: jsonStatus === 'valid' ? 'applied' : 'error',
            detail: jsonStatus === 'valid' ? 'Sections + styling queued for render bridge' : 'Fix schema before applying',
            createdAt: new Date().toISOString()
        };
        setImports([record, ...imports].slice(0, 6));
    };

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
                            <div className="space-y-2">{EDITOR_WORKFLOWS.roles.map(renderTeamRole)}</div>
                        </div>
                    </div>
                )}

                {activeTab === 'auth' && (
                    <div className="grid gap-4 xl:grid-cols-3 items-start">
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3 xl:col-span-2">
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
                            <div className="grid gap-2 md:grid-cols-2">
                                {AUTH_ROADMAP.policies.map((item) => (
                                    <div key={item.label} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-slate-200">
                                        <div className="font-semibold text-white">{item.label}</div>
                                        <p className="text-slate-300/80">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-mono">Live session</div>
                                <div className={badgeStyle}>{session ? 'active' : 'idle'}</div>
                            </div>
                            <div className="space-y-2 text-sm text-slate-200">
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                                    <div className="text-xs text-slate-400 font-mono">Add user</div>
                                    <input
                                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
                                        placeholder="email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    />
                                    <input
                                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
                                        placeholder="display name"
                                        value={newUser.displayName}
                                        onChange={(e) => setNewUser({ ...newUser, displayName: e.target.value })}
                                    />
                                    <select
                                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
                                        value={newUser.role}
                                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value as DashboardUser['role'] })}
                                    >
                                        <option value="viewer">viewer</option>
                                        <option value="editor">editor</option>
                                        <option value="admin">admin</option>
                                    </select>
                                    <button onClick={handleAddUser} className="w-full px-3 py-2 rounded-xl bg-white text-slate-900 font-semibold">
                                        Save user
                                    </button>
                                </div>
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                                    <div className="text-xs text-slate-400 font-mono">Login / session</div>
                                    <input
                                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
                                        placeholder="email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                    <button onClick={handleLogin} className="w-full px-3 py-2 rounded-xl bg-emerald-400 text-slate-900 font-semibold">
                                        Start session
                                    </button>
                                    {session && (
                                        <div className="text-xs text-slate-300 space-y-1">
                                            <div>Token: {session.token.slice(0, 16)}...</div>
                                            <div>Last active: {new Date(session.lastActive).toLocaleString()}</div>
                                            <button onClick={handleLogout} className="px-2 py-1 rounded-lg bg-white/10 border border-white/20 mt-1">
                                                End session
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                                    <div className="text-xs text-slate-400 font-mono">Directory</div>
                                    <div className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                                        {users.map((user) => (
                                            <div key={user.id} className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                                                <div>
                                                    <div className="font-semibold text-white">{user.displayName}</div>
                                                    <div className="text-slate-400">{user.email}</div>
                                                </div>
                                                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-300">{user.role}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'editor' && (
                    <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr] items-start">
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
                            <div className="flex items-center justify-between">
                                <div className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-mono">Scheduling queue</div>
                                <div className={badgeStyle}>draft → live</div>
                            </div>
                            <div className="grid gap-2">
                                <input
                                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
                                    placeholder="post title"
                                    value={scheduleDraft.title}
                                    onChange={(e) => setScheduleDraft({ ...scheduleDraft, title: e.target.value })}
                                />
                                <input
                                    type="datetime-local"
                                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
                                    value={scheduleDraft.publishAt}
                                    onChange={(e) => setScheduleDraft({ ...scheduleDraft, publishAt: e.target.value })}
                                />
                                <input
                                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
                                    placeholder="owner"
                                    value={scheduleDraft.owner}
                                    onChange={(e) => setScheduleDraft({ ...scheduleDraft, owner: e.target.value })}
                                />
                                <button onClick={handleSchedulePost} className="w-full px-3 py-2 rounded-xl bg-white text-slate-900 font-semibold">
                                    Queue post
                                </button>
                            </div>
                            <div className="space-y-2 text-sm text-slate-200 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                                {scheduledPosts.map((post) => (
                                    <div key={post.id} className="p-3 rounded-2xl bg-white/5 border border-white/10">
                                        <div className="flex items-center justify-between">
                                            <div className="font-semibold text-white">{post.title}</div>
                                            <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-mono">{post.status}</span>
                                        </div>
                                        <p className="text-slate-300/80">Publish: {new Date(post.publishAt).toLocaleString()}</p>
                                        <p className="text-slate-400 text-xs">Owner: {post.owner}</p>
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
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                                <div className="text-xs text-slate-400 font-mono">Add comment</div>
                                <input
                                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
                                    placeholder="post"
                                    value={newComment.post}
                                    onChange={(e) => setNewComment({ ...newComment, post: e.target.value })}
                                />
                                <div className="grid gap-2 md:grid-cols-2">
                                    <input
                                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
                                        placeholder="author"
                                        value={newComment.author}
                                        onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                                    />
                                    <input
                                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
                                        placeholder="comment"
                                        value={newComment.body}
                                        onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
                                    />
                                </div>
                                <button onClick={handleAddComment} className="w-full px-3 py-2 rounded-xl bg-white text-slate-900 font-semibold">
                                    Submit to queue
                                </button>
                                <div className="space-y-2 max-h-44 overflow-y-auto custom-scrollbar pr-1">
                                    {comments.map((c) => (
                                        <div key={c.id} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200">
                                            <div className="flex items-center justify-between">
                                                <div className="font-semibold text-white">{c.post}</div>
                                                <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-mono">{c.status}</span>
                                            </div>
                                            <p className="text-slate-300/80">{c.body}</p>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <button onClick={() => handleCommentAction(c.id, 'approved')} className="px-2 py-1 rounded-lg bg-emerald-400/80 text-slate-900 font-semibold">
                                                    Approve
                                                </button>
                                                <button onClick={() => handleCommentAction(c.id, 'pending')} className="px-2 py-1 rounded-lg bg-white/10 border border-white/20">
                                                    Reset
                                                </button>
                                                <button onClick={() => handleCommentAction(c.id, 'flagged')} className="px-2 py-1 rounded-lg bg-rose-500/70 text-white">
                                                    Flag
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
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
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                                <div className="text-xs text-slate-400 font-mono">Paste JSON</div>
                                <textarea
                                    rows={6}
                                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none text-xs font-mono"
                                    placeholder='{"sections":[{"id":"hero","title":"Latest"}],"styles":{"accent":"#67e8f9"}}'
                                    value={jsonDraft}
                                    onChange={(e) => setJsonDraft(e.target.value)}
                                />
                                <div className="flex flex-wrap gap-2">
                                    <button onClick={handleJsonValidate} className="px-3 py-2 rounded-xl bg-white text-slate-900 font-semibold">
                                        Validate
                                    </button>
                                    <button onClick={handleJsonApply} className="px-3 py-2 rounded-xl bg-emerald-400 text-slate-900 font-semibold">
                                        Apply
                                    </button>
                                    <span
                                        className={`px-3 py-2 rounded-xl border text-xs font-mono ${
                                            jsonStatus === 'valid'
                                                ? 'bg-emerald-400/20 border-emerald-400/50 text-emerald-200'
                                                : jsonStatus === 'error'
                                                    ? 'bg-rose-500/20 border-rose-400/50 text-rose-200'
                                                    : 'bg-white/5 border-white/10 text-slate-300'
                                        }`}
                                    >
                                        {jsonStatus === 'idle' ? 'waiting' : jsonStatus}
                                    </span>
                                </div>
                                {jsonMessage && <p className="text-xs text-slate-300">{jsonMessage}</p>}
                            </div>
                        </div>
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-mono">Import controls</div>
                                <div className={badgeStyle}>rollback</div>
                            </div>
                            <div className="grid gap-3">
                                {CONTENT_PIPELINE.controls.map((control) => (
                                    <div key={control.label} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-slate-200">
                                        <div className="font-semibold text-white">{control.label}</div>
                                        <p className="text-slate-300/80">{control.detail}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-sm text-slate-200">
                                <div className="text-xs text-slate-400 font-mono">Recent imports</div>
                                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                                    {imports.map((imp) => (
                                        <div key={imp.id} className="p-2 rounded-xl bg-white/5 border border-white/10">
                                            <div className="flex items-center justify-between">
                                                <div className="font-semibold text-white">{imp.label}</div>
                                                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{imp.status}</span>
                                            </div>
                                            <p className="text-slate-300/80">{imp.detail}</p>
                                            <p className="text-[11px] text-slate-500">{new Date(imp.createdAt).toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'publishing' && (
                    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] items-start">
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-mono">Publication standards</div>
                                <div className={badgeStyle}>readiness</div>
                            </div>
                            <div className="space-y-3">
                                {PUBLICATION_STANDARDS.quality.map((item) => (
                                    <div key={item.label} className={`p-4 rounded-2xl border ${item.status === 'ready' ? 'border-emerald-400/40 bg-emerald-400/10' : 'border-amber-400/40 bg-amber-400/10'} flex items-start justify-between gap-3`}>
                                        <div>
                                            <div className="text-[11px] uppercase tracking-[0.25em] font-mono text-white/80">{item.label}</div>
                                            <p className="text-sm text-white/90 leading-relaxed">{item.detail}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full border text-[11px] font-mono uppercase tracking-[0.25em] ${item.status === 'ready' ? 'border-emerald-300 text-emerald-200' : 'border-amber-300 text-amber-200'}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-200">
                                {PUBLICATION_STANDARDS.seo.map((item) => (
                                    <div key={item.label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                        <div className="text-[11px] uppercase tracking-[0.25em] font-mono text-slate-300">{item.label}</div>
                                        <p className="mt-1 text-slate-200 leading-relaxed">{item.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="text-[11px] uppercase tracking-[0.3em] text-slate-300 font-mono">Distribution + governance</div>
                                <div className={badgeStyle}>platform</div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-200">
                                {PUBLICATION_STANDARDS.distribution.map((item) => (
                                    <div key={item.label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                        <div className="text-[11px] uppercase tracking-[0.24em] font-mono text-slate-300">{item.label}</div>
                                        <p className="mt-1 text-slate-200 leading-relaxed">{item.detail}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-sm text-slate-200">
                                <div className="text-xs text-slate-400 font-mono">Governance</div>
                                {PUBLICATION_STANDARDS.governance.map((item) => (
                                    <div key={item.label} className="p-3 rounded-xl bg-white/5 border border-white/10">
                                        <div className="font-semibold text-white">{item.label}</div>
                                        <p className="text-slate-300/80">{item.detail}</p>
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
