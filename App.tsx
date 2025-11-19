
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import VisualizerCanvas, { VisualizerRef } from './components/VisualizerCanvas';
import RevolverNav from './components/RevolverNav';
import GlitchOverlay from './components/ui/GlitchOverlay';
import GestureHandler from './components/ui/GestureHandler';
import { VISUALIZER_PROFILES } from './constants';

// Section Imports
import HeroSection from './components/sections/HeroSection';
import PhilosophySection from './components/sections/PhilosophySection';
import PillarsSection from './components/sections/PillarsSection';
import QualitySection from './components/sections/QualitySection';
import SustainabilitySection from './components/sections/SustainabilitySection';
import ContactSection from './components/sections/ContactSection';

const SECTIONS_COMPONENTS = [
    HeroSection,
    PhilosophySection,
    PillarsSection,
    QualitySection,
    SustainabilitySection,
    ContactSection
];

const THEME_KEYS = Object.keys(VISUALIZER_PROFILES) as (keyof typeof VISUALIZER_PROFILES)[];

const App: React.FC = () => {
    const visualizerRef = useRef<VisualizerRef>(null);
    const [activeSection, setActiveSection] = useState(0);
    const [isGlitching, setIsGlitching] = useState(false);
    const sectionContainerRef = useRef<HTMLDivElement>(null);
    const activeTheme = VISUALIZER_PROFILES[THEME_KEYS[activeSection]];

    // The "Big Switch" Logic
    const handleSectionChange = (index: number) => {
        if (index === activeSection || isGlitching) return;
        
        setIsGlitching(true);
        
        // 1. Trigger Visual Spike via Core
        visualizerRef.current?.triggerBurst();

        // 2. Section Content Switch Timing
        setTimeout(() => {
            setActiveSection(index);
            
            // Update Theme in background while glitch covers it
            const sectionKey = THEME_KEYS[index];
            const targetTheme = VISUALIZER_PROFILES[sectionKey];
            
            // @ts-ignore - accessing loose props
            visualizerRef.current?.updateParams({ 
                ...targetTheme,
                patternIntensity: 2.0, // Start extra intense after glitch
            });

            // Tween intensity back to normal
            gsap.delayedCall(0.4, () => {
                // @ts-ignore
                visualizerRef.current?.updateParams({ patternIntensity: (targetTheme as any).patternIntensity || 1.0 });
            });

        }, 250); // Swap content mid-glitch

        // 3. Cleanup
        setTimeout(() => {
            setIsGlitching(false);
        }, 800);
    };

    const handleNavigate = (direction: 'next' | 'prev') => {
        let nextIndex = activeSection;
        if (direction === 'next') {
            nextIndex = (activeSection + 1) % SECTIONS_COMPONENTS.length;
        } else {
            nextIndex = (activeSection - 1 + SECTIONS_COMPONENTS.length) % SECTIONS_COMPONENTS.length;
        }
        handleSectionChange(nextIndex);
    };

    const ActiveComponent = SECTIONS_COMPONENTS[activeSection];

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-slate-950 text-white">
            
            {/* 1. Transition Overlay */}
            <GlitchOverlay active={isGlitching} />

            {/* 2. VIB34D Visualizer Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <VisualizerCanvas ref={visualizerRef} />
                {/* Global Atmosphere */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_130%)] opacity-90" />
                <div className="absolute inset-0 scanlines opacity-10 mix-blend-soft-light" />
            </div>

            {/* 3. Interaction Layer: Drag to Navigate */}
            <GestureHandler 
                visualizerRef={visualizerRef} 
                onNavigate={handleNavigate} 
                baseParams={activeTheme} 
            />

            {/* 4. Navigation: Revolver Top Bezel */}
            <RevolverNav activeIndex={activeSection} onSectionSelect={handleSectionChange} />

            {/* 5. Main Content Container */}
            <main 
                ref={sectionContainerRef}
                className={`relative z-10 w-full h-full transition-all duration-200 ${isGlitching ? 'opacity-0 blur-md scale-95' : 'opacity-100 blur-0 scale-100'}`}
            >
                <ActiveComponent visualizerRef={visualizerRef} />
            </main>

            {/* 6. HUD / Status Elements */}
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
