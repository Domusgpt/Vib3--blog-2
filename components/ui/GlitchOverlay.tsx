
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GlitchOverlayProps {
    active: boolean;
}

const GlitchOverlay: React.FC<GlitchOverlayProps> = ({ active }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const moireRef = useRef<HTMLDivElement>(null);
    const flashRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (active) {
            const tl = gsap.timeline();

            // 1. Hard Flash
            tl.set(containerRef.current, { opacity: 1, pointerEvents: 'all' })
              .to(flashRef.current, { opacity: 1, duration: 0.05, ease: 'power4.in' })
              .to(flashRef.current, { opacity: 0, duration: 0.1 });

            // 2. Moiré Distortion - Scale up and rotate
            tl.to(moireRef.current, { 
                scale: 1.8, 
                rotation: 25, 
                opacity: 0.6, 
                duration: 0.4, 
                ease: 'power2.out' 
            }, 0);

            // 3. RGB Split & Shake Container
            tl.to(containerRef.current, {
                x: () => (Math.random() - 0.5) * 40,
                y: () => (Math.random() - 0.5) * 10,
                duration: 0.05,
                repeat: 6,
                yoyo: true,
                ease: "rough"
            }, 0);

        } else {
            // Cleanup / Reset
            gsap.to(containerRef.current, { 
                opacity: 0, 
                pointerEvents: 'none', 
                duration: 0.3, 
                onComplete: () => {
                     if (moireRef.current) gsap.set(moireRef.current, { scale: 1, rotation: 0 });
                }
            });
        }
    }, [active]);

    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 z-[100] pointer-events-none opacity-0 flex items-center justify-center overflow-hidden bg-black/20 backdrop-blur-[2px]"
        >
            {/* White Flash Layer */}
            <div ref={flashRef} className="absolute inset-0 bg-cyan-100 mix-blend-hard-light opacity-0" />
            
            {/* Moiré Pattern Layer */}
            <div 
                ref={moireRef}
                className="absolute inset-[-50%] w-[200%] h-[200%] moire-grid blend-exclusion opacity-0"
            />

            {/* Chromatic Aberration Lines */}
            <div className={`absolute top-1/3 left-0 w-full h-1 bg-red-500 mix-blend-color-dodge blur-md transition-transform duration-75 ${active ? 'scale-x-110' : 'scale-x-0'}`} />
            <div className={`absolute bottom-1/3 left-0 w-full h-1 bg-blue-500 mix-blend-color-dodge blur-md transition-transform duration-100 ${active ? 'scale-x-110' : 'scale-x-0'}`} />

            {/* Scanlines */}
            <div className="absolute inset-0 scanlines opacity-40" />
        </div>
    );
};

export default GlitchOverlay;
