
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SECTIONS } from '../constants';

interface RevolverNavProps {
    activeIndex: number;
    onSectionSelect: (index: number) => void;
}

const RevolverNav: React.FC<RevolverNavProps> = ({ activeIndex, onSectionSelect }) => {
    const [isVisible, setIsVisible] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const cylinderRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastScrollY = useRef(0);

    // Hexagonal Cylinder Config
    const radius = 30; // Tight radius for a thin bezel
    const theta = 360 / SECTIONS.length;

    // --- Visibility & Auto-Hide Logic ---
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Detect Scroll UP (reveal) or Top of page
            if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
                showNav();
            } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                // Scroll DOWN (hide)
                hideNav();
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const showNav = () => {
        setIsVisible(true);
        resetAutoHide();
    };

    const hideNav = () => {
        setIsVisible(false);
    };

    const resetAutoHide = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
        }, 3000); // Hide after 3 seconds of inactivity
    };

    // --- Animations ---
    useEffect(() => {
        if (!navRef.current) return;
        
        // Slide bezel in/out
        gsap.to(navRef.current, {
            y: isVisible ? 0 : '-120%',
            opacity: isVisible ? 1 : 0,
            duration: 0.6,
            ease: "power3.inOut"
        });
    }, [isVisible]);

    useEffect(() => {
        if (!cylinderRef.current) return;

        // Rotate the drum to show active section
        gsap.to(cylinderRef.current, {
            rotationX: activeIndex * -theta,
            duration: 1.2,
            ease: "elastic.out(1, 0.7)",
        });
    }, [activeIndex, theta]);

    return (
        <nav
            ref={navRef}
            onMouseEnter={resetAutoHide}
            onMouseMove={resetAutoHide}
            className="fixed top-0 left-0 w-full h-[90px] z-50 flex justify-center pointer-events-none -translate-y-full"
        >
            <div className="relative mt-2 pointer-events-auto">
                <div className="w-[420px] md:w-[680px] h-[62px] bg-slate-950/95 backdrop-blur-xl border-x border-b border-cyan-500/20 rounded-b-2xl shadow-[0_10px_60px_rgba(0,0,0,0.55)] flex items-center justify-center overflow-hidden relative group">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60" />
                    <div className="absolute inset-0 scanlines opacity-15 pointer-events-none" />

                    <div className="absolute inset-y-2 left-6 flex items-center gap-3 text-[11px] uppercase font-mono tracking-[0.3em] text-slate-400">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span>revolver nav</span>
                    </div>

                    <div className="w-full h-full perspective-2000 flex items-center justify-center">
                        <div
                            ref={cylinderRef}
                            className="preserve-3d relative w-full h-full"
                            style={{ transformOrigin: 'center center -30px' }}
                        >
                            {SECTIONS.map((section, index) => {
                                const angle = index * theta;
                                const isActive = index === activeIndex;

                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => {
                                            onSectionSelect(index);
                                            resetAutoHide();
                                        }}
                                        className={`
                                            absolute top-1/2 left-1/2
                                            w-full h-[48px]
                                            -ml-[50%] -mt-[24px]
                                            flex flex-col items-center justify-center gap-0.5
                                            transition-all duration-300
                                            backface-hidden
                                            ${isActive
                                                ? 'text-cyan-300 text-shadow-neon drop-shadow-[0_0_15px_rgba(103,232,249,0.35)]'
                                                : 'text-slate-600 hover:text-slate-300'}
                                        `}
                                        style={{
                                            transform: `rotateX(${angle}deg) translateZ(${radius}px)`
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-sm md:text-base opacity-80">{section.icon}</span>
                                            <span className={`font-sans font-bold uppercase tracking-[0.24em] text-[10px] md:text-sm ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                                                {section.title}
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-200/60">{section.subtitle}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="absolute left-0 top-0 bottom-0 w-4 border-r border-cyan-500/10 bg-gradient-to-r from-cyan-500/5 to-transparent" />
                    <div className="absolute right-0 top-0 bottom-0 w-4 border-l border-cyan-500/10 bg-gradient-to-l from-cyan-500/5 to-transparent" />
                </div>
            </div>
        </nav>
    );
};

export default RevolverNav;
