import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import VisualizerCanvas, { VisualizerRef } from './components/VisualizerCanvas';
import RevolverNav from './components/RevolverNav';
import GlitchOverlay from './components/ui/GlitchOverlay';
import GestureHandler from './components/ui/GestureHandler';
import { SECTIONS, VISUALIZER_PROFILES } from './constants';
import VibSection from './components/sections/VibSection';
import TelemetryHud from './components/ui/TelemetryHud';
import OperationsDashboard from './components/admin/OperationsDashboard';

const THEME_KEYS = Object.keys(VISUALIZER_PROFILES) as (keyof typeof VISUALIZER_PROFILES)[];

const App: React.FC = () => {
    const visualizerRef = useRef<VisualizerRef>(null);
    const [activeSection, setActiveSection] = useState(0);
    const [isGlitching, setIsGlitching] = useState(false);
    const [showOps, setShowOps] = useState(false);
    const activeTheme = VISUALIZER_PROFILES[THEME_KEYS[activeSection]];
    const activeSectionId = SECTIONS[activeSection].id as keyof typeof VISUALIZER_PROFILES;
    const [isMobileNav, setIsMobileNav] = useState(false);
    const [isPortrait, setIsPortrait] = useState(false);

    useEffect(() => {
        const syncViewport = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setIsMobileNav(width < 980);
            setIsPortrait(height >= width);
        };

        syncViewport();
        window.addEventListener('resize', syncViewport);
        window.addEventListener('orientationchange', syncViewport);
        return () => {
            window.removeEventListener('resize', syncViewport);
            window.removeEventListener('orientationchange', syncViewport);
        };
    }, []);

    const handleSectionChange = (index: number) => {
        if (index === activeSection || isGlitching) return;

        setIsGlitching(true);
        visualizerRef.current?.triggerBurst();

        setTimeout(() => {
            setActiveSection(index);

            const sectionKey = THEME_KEYS[index];
            const targetTheme = VISUALIZER_PROFILES[sectionKey];

            visualizerRef.current?.updateParams({
                ...targetTheme,
                patternIntensity: 2.0,
            });

            gsap.delayedCall(0.4, () => {
                visualizerRef.current?.updateParams({ patternIntensity: (targetTheme as any).patternIntensity || 1.0 });
            });

        }, 250);

        setTimeout(() => {
            setIsGlitching(false);
        }, 800);
    };

    const handleNavigate = (direction: 'next' | 'prev') => {
        let nextIndex = activeSection;
        if (direction === 'next') {
            nextIndex = (activeSection + 1) % SECTIONS.length;
        } else {
            nextIndex = (activeSection - 1 + SECTIONS.length) % SECTIONS.length;
        }
        handleSectionChange(nextIndex);
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-slate-950 text-white">

            <GlitchOverlay active={isGlitching} />

            <div className="fixed inset-0 z-0 pointer-events-none">
                <VisualizerCanvas ref={visualizerRef} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_130%)] opacity-90" />
                <div className="absolute inset-0 scanlines opacity-10 mix-blend-soft-light" />
            </div>

            <GestureHandler
                visualizerRef={visualizerRef}
                onNavigate={handleNavigate}
                baseParams={activeTheme}
            />

            <RevolverNav
                activeIndex={activeSection}
                onSectionSelect={handleSectionChange}
                isMobile={isMobileNav}
                isPortrait={isPortrait}
            />

            <main
                className={`relative z-10 w-full min-h-screen pb-28 transition-all duration-200 ${isGlitching ? 'opacity-0 blur-md scale-95' : 'opacity-100 blur-0 scale-100'}`}
            >
                <VibSection sectionId={activeSectionId} visualizerRef={visualizerRef} isPortrait={isPortrait} />
            </main>

            <TelemetryHud sectionId={activeSectionId} profile={activeTheme} />

            <div className="fixed inset-x-0 bottom-0 flex justify-end z-30 px-5 pb-4 pointer-events-none">
                <div className="flex items-center gap-3 pointer-events-auto">
                    <div className="hidden sm:flex flex-col text-right text-[11px] uppercase tracking-[0.3em] text-white/60 font-mono">
                        <span>swipe or tap nav to move</span>
                        <span className="text-white/40">mobile-ready + portrait safe</span>
                    </div>
                    <button
                        onClick={() => setShowOps(true)}
                        className="px-4 py-3 rounded-full bg-white/10 border border-white/20 text-sm font-semibold backdrop-blur hover:bg-white/20 transition shadow-lg"
                    >
                        Open Ops Dashboard
                    </button>
                </div>
            </div>

            {showOps && <OperationsDashboard onClose={() => setShowOps(false)} />}
        </div>
    );
};

export default App;
