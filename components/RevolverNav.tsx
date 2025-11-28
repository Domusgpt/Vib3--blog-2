
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SECTIONS } from '../constants';

interface RevolverNavProps {
    activeIndex: number;
    onSectionSelect: (index: number) => void;
    isMobile?: boolean;
    isPortrait?: boolean;
}

const RevolverNav: React.FC<RevolverNavProps> = ({ activeIndex, onSectionSelect, isMobile = false, isPortrait = false }) => {
    const [isVisible, setIsVisible] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const cylinderRef = useRef<HTMLDivElement>(null);
    const mobileRailRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastScrollY = useRef(0);
    const touchStartX = useRef<number | null>(null);
    const touchStartTime = useRef<number | null>(null);

    // Hexagonal Cylinder Config
    const radius = 30; // Tight radius for a thin bezel
    const theta = 360 / SECTIONS.length;

    // --- Visibility & Auto-Hide Logic ---
    useEffect(() => {
        setIsVisible(true);
        resetAutoHide();
    }, []);

    useEffect(() => {
        if (isMobile) return;

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
    }, [isMobile]);

    useEffect(() => {
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                onSectionSelect((activeIndex - 1 + SECTIONS.length) % SECTIONS.length);
            }
            if (event.key === 'ArrowRight') {
                onSectionSelect((activeIndex + 1) % SECTIONS.length);
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [activeIndex, isMobile, onSectionSelect]);

    useEffect(() => {
        if (!isMobile) return;

        const handleTouchStart = (event: TouchEvent) => {
            if (!event.touches[0]) return;
            touchStartX.current = event.touches[0].clientX;
            touchStartTime.current = Date.now();
        };

        const handleTouchEnd = (event: TouchEvent) => {
            if (touchStartX.current === null || touchStartTime.current === null) return;

            const deltaX = (event.changedTouches[0]?.clientX || 0) - touchStartX.current;
            const deltaTime = Date.now() - touchStartTime.current;

            if (deltaTime < 600 && Math.abs(deltaX) > 50) {
                if (deltaX < 0) {
                    onSectionSelect((activeIndex + 1) % SECTIONS.length);
                } else {
                    onSectionSelect((activeIndex - 1 + SECTIONS.length) % SECTIONS.length);
                }
            }

            touchStartX.current = null;
            touchStartTime.current = null;
        };

        const target = mobileRailRef.current || window;
        target.addEventListener('touchstart', handleTouchStart, { passive: true });
        target.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            target.removeEventListener('touchstart', handleTouchStart);
            target.removeEventListener('touchend', handleTouchEnd);
        };
    }, [activeIndex, isMobile, onSectionSelect]);

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
        if (!navRef.current || isMobile) return;

        // Slide bezel in/out
        gsap.to(navRef.current, {
            y: isVisible ? 0 : '-120%',
            opacity: isVisible ? 1 : 0,
            duration: 0.6,
            ease: "power3.inOut"
        });
    }, [isVisible, isMobile]);

    useEffect(() => {
        if (!cylinderRef.current) return;

        // Rotate the drum to show active section
        gsap.to(cylinderRef.current, {
            rotationX: activeIndex * -theta,
            duration: 1.2,
            ease: "elastic.out(1, 0.7)",
        });
    }, [activeIndex, theta]);

    if (isMobile) {
        return (
            <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 pointer-events-none">
                <div
                    ref={mobileRailRef}
                    className="pointer-events-auto bg-slate-950/95 border border-white/10 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.45)] p-3 space-y-2"
                    style={{ paddingBottom: 'calc(12px + var(--safe-bottom))' }}
                >
                    <div className="flex items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400">
                        <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan-400" />Navigation</span>
                        <span className="text-slate-500">swipe • tap • arrows</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <button
                            onClick={() => onSectionSelect((activeIndex - 1 + SECTIONS.length) % SECTIONS.length)}
                            className="px-3 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white/10"
                            aria-label="Previous section"
                        >
                            Prev
                        </button>
                        <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar">
                            {SECTIONS.map((section, index) => {
                                const isActive = index === activeIndex;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => onSectionSelect(index)}
                                        className={`px-4 py-2 rounded-2xl border text-[11px] font-semibold whitespace-nowrap transition-all duration-200 ${isActive ? 'bg-cyan-500/20 border-cyan-400/60 text-white shadow-[0_0_0_1px_rgba(103,232,249,0.45)]' : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'}`}
                                        aria-current={isActive}
                                    >
                                        <span className="font-mono mr-2 text-xs opacity-80">{section.icon}</span>
                                        {section.title}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            onClick={() => onSectionSelect((activeIndex + 1) % SECTIONS.length)}
                            className="px-3 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white/10"
                            aria-label="Next section"
                        >
                            Next
                        </button>
                    </div>
                    <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-center text-slate-400">
                        Swipe or tap • Portrait safe mode {isPortrait ? 'on' : 'off'}
                    </div>
                </div>
            </div>
        );
    }

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
