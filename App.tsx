import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import VisualizerCanvas, { VisualizerRef } from './components/VisualizerCanvas';
import RevolverNav from './components/RevolverNav';
import GlitchOverlay from './components/ui/GlitchOverlay';
import GestureHandler from './components/ui/GestureHandler';
import { SECTIONS, VISUALIZER_PROFILES } from './constants';
import VibSection from './components/sections/VibSection';

const THEME_KEYS = Object.keys(VISUALIZER_PROFILES) as (keyof typeof VISUALIZER_PROFILES)[];

const App: React.FC = () => {
    const visualizerRef = useRef<VisualizerRef>(null);
    const [activeSection, setActiveSection] = useState(0);
    const [isGlitching, setIsGlitching] = useState(false);
    const activeTheme = VISUALIZER_PROFILES[THEME_KEYS[activeSection]];

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

    const sectionKey = SECTIONS[activeSection].id as keyof typeof VISUALIZER_PROFILES;

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-slate-950 text-white">

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

            <RevolverNav activeIndex={activeSection} onSectionSelect={handleSectionChange} />

            <main
                className={`relative z-10 w-full h-full transition-all duration-200 ${isGlitching ? 'opacity-0 blur-md scale-95' : 'opacity-100 blur-0 scale-100'}`}
            >
                <VibSection sectionId={sectionKey} visualizerRef={visualizerRef} />
            </main>

            <div className="fixed bottom-6 left-6 z-40 text-[10px] font-mono text-cyan-500/40 tracking-widest pointer-events-none">
                VIB34D_ENGINE::ACTIVE<br/>
                RENDER_MODE::WEBGL2
            </div>

            <div className="fixed bottom-6 right-6 z-40 text-[10px] font-mono text-cyan-500/40 tracking-widest pointer-events-none text-right hidden md:block">
                DRAG EDGES TO TRAVERSE<br/>
                SYSTEM_ID::{THEME_KEYS[activeSection].toUpperCase()}
            </div>
        </div>
    );
};

export default App;
