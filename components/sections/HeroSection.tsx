
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VisualizerRef } from '../VisualizerCanvas';
import { BLOG_CONTENT, VISUALIZER_PROFILES } from '../../constants';

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
    visualizerRef: React.RefObject<VisualizerRef | null>;
}

const HeroSection: React.FC<SectionProps> = ({ visualizerRef }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        
        // Choreograph Visualizer to Scroll
        ScrollTrigger.create({
            trigger: textRef.current,
            scroller: container,
            start: "top center",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
                // Mutate visualizer params based on scroll progress
                visualizerRef.current?.updateParams({
                    rotationSpeed: 0.2 + (self.progress * 0.5),
                    morphFactor: self.progress * 0.8,
                    gridDensity: 18 + (self.progress * 10)
                });
            }
        });

        // Parallax Elements
        gsap.utils.toArray('.parallax-item').forEach((item: any, i) => {
            gsap.to(item, {
                y: (i + 1) * -100,
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    scroller: container,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    // --- DYNAMIC CARD PHYSICS ---
    const handleCardMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg tilt
        const rotateY = ((x - centerX) / centerX) * 10;

        // Morph border radius based on position to simulate liquid tension
        // e.g., moving top-left creates tension there
        const pX = (x / rect.width) * 100;
        const pY = (y / rect.height) * 100;
        
        // Dynamic organic shape
        const radiusValue = `${50 + (pX - 50) * 0.5}% ${50 - (pX - 50) * 0.5}% ${50 + (pY - 50) * 0.5}% ${50 - (pY - 50) * 0.5}% / ${50 + (pY - 50) * 0.5}% ${50 - (pY - 50) * 0.5}% ${50 + (pX - 50) * 0.5}% ${50 - (pX - 50) * 0.5}%`;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.05,
            borderRadius: radiusValue,
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", // Return to base liquid shape
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
        });

        // Revert visualizer to base hero state
        // We can read base state from constants or just hardcode the revert here for speed
        visualizerRef.current?.updateParams({
            glitchIntensity: 0.0,
            colorShift: 0.0,
            patternIntensity: 1.0
        });
    };

    const handleCardEnter = () => {
        // CONGRUENT VISUALIZER REACTION
        // When hovering a card, the background system spikes in chaos
        visualizerRef.current?.updateParams({
            glitchIntensity: 0.3,
            colorShift: 0.5,
            patternIntensity: 1.5
        });
    };

    return (
        <div ref={containerRef} className="w-full h-full overflow-y-auto custom-scrollbar relative">
            {/* Scrollable Content Area */}
            <div className="min-h-[150vh] w-full flex flex-col items-center pt-[30vh]">
                
                {/* Floating Parallax Elements */}
                <div className="fixed top-[20%] left-[15%] text-6xl opacity-10 parallax-item animate-float-1 font-mono">{"{ }"}</div>
                <div className="fixed top-[60%] right-[10%] text-8xl opacity-5 parallax-item animate-float-2 font-mono">&lt;/&gt;</div>
                <div className="fixed bottom-[20%] left-[25%] text-4xl opacity-10 parallax-item animate-float-3 font-mono">0x</div>

                <div ref={textRef} className="text-center z-10 max-w-4xl px-6">
                    <div className="flex items-center justify-center gap-4 mb-6 opacity-80">
                        <span className="text-cyan-400 text-2xl">::</span>
                        <span className="text-white font-mono tracking-widest">SYSTEM.INIT</span>
                        <span className="text-cyan-200 text-sm">v1.4</span>
                    </div>
                    
                    <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-cyan-100 to-cyan-900 select-none">
                        VIB3<br/>CODE
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto mb-24">
                        Explorations in <strong className="text-cyan-400">AI</strong>, <strong className="text-purple-400">Generative Art</strong>, and the <strong className="text-teal-400">Future of Web</strong>.<br/>
                        Coding at the speed of thought.
                    </p>

                    <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-slate-500 mb-12">Featured Articles</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 mb-48 w-full perspective-1000">
                        {BLOG_CONTENT.hero.featured.map((post, i) => (
                            <div 
                                key={i} 
                                onMouseMove={(e) => handleCardMove(e, i)}
                                onMouseLeave={handleCardMove} // Initially pass move handler to clear but refined below
                                onMouseEnter={handleCardEnter}
                                // Override leave to use specific logic
                                onMouseOut={(e: any) => { if(e.target === e.currentTarget) handleCardLeave(e); }}
                                // Use onMouseLeave properly on the div
                                onMouseLeaveCapture={handleCardLeave}
                                className="liquid-card p-8 flex flex-col items-start text-left group cursor-pointer preserve-3d relative bg-slate-900/40 border border-cyan-500/10 shadow-[0_0_30px_rgba(0,0,0,0.2)]"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Glitch Overlay for Card on Hover */}
                                <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay" />
                                
                                {/* Article Metadata */}
                                <div className="flex justify-between w-full mb-4 text-xs font-mono text-cyan-500/70 z-10 pointer-events-none">
                                    <span>{post.category.toUpperCase()}</span>
                                    <span>{post.date}</span>
                                </div>
                                
                                <h3 
                                    className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors z-10 glitch-hover"
                                    data-text={post.title}
                                >
                                    {post.title}
                                </h3>
                                <p className="text-sm text-slate-400 line-clamp-4 mb-6 z-10 leading-relaxed group-hover:text-slate-200 transition-colors">
                                    {post.desc}
                                </p>
                                
                                <div className="mt-auto text-cyan-400 text-sm opacity-60 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 z-10 font-mono">
                                    <span className="group-hover:tracking-widest transition-all duration-300">INITIALIZE</span> <span>→</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
