
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { VisualizerRef } from '../VisualizerCanvas';

interface GestureHandlerProps {
    visualizerRef: React.RefObject<VisualizerRef | null>;
    onNavigate: (direction: 'next' | 'prev') => void;
    baseParams: any; // The current visualizer theme to revert to
}

const GestureHandler: React.FC<GestureHandlerProps> = ({ visualizerRef, onNavigate, baseParams }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragSide, setDragSide] = useState<'left' | 'right' | null>(null);
    
    const startX = useRef(0);
    const currentX = useRef(0);
    
    // Threshold is 1/3 of screen width
    const getThreshold = () => window.innerWidth / 3;

    useEffect(() => {
        const handlePointerDown = (e: PointerEvent) => {
            // Check if user is interacting with a card or button to prevent accidental nav
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('.liquid-card')) {
                return;
            }

            // Only trigger if starting near the edges (left 10% or right 10%) - Reduced from 15% for better center content access
            const edgeThreshold = window.innerWidth * 0.10;
            const isLeftEdge = e.clientX < edgeThreshold;
            const isRightEdge = e.clientX > window.innerWidth - edgeThreshold;

            if (isLeftEdge || isRightEdge) {
                setIsDragging(true);
                setDragSide(isLeftEdge ? 'left' : 'right');
                startX.current = e.clientX;
                currentX.current = e.clientX;
                document.body.style.cursor = 'grabbing';
                
                // Disable text selection during drag
                document.body.style.userSelect = 'none';
            }
        };

        const handlePointerMove = (e: PointerEvent) => {
            if (!isDragging) return;

            currentX.current = e.clientX;
            const deltaX = currentX.current - startX.current;
            const threshold = getThreshold();
            
            // Normalize progress (0 to 1) based on drag distance towards center
            let progress = 0;
            if (dragSide === 'left') {
                // Dragging right (positive delta)
                progress = Math.max(0, Math.min(deltaX / threshold, 1.0));
            } else {
                // Dragging left (negative delta)
                progress = Math.max(0, Math.min(-deltaX / threshold, 1.0));
            }

            // --- REAL-TIME VISUALIZER COUPLING ---
            if (visualizerRef.current) {
                const baseSpeed = baseParams?.rotationSpeed || 0.2;
                const baseDensity = baseParams?.gridDensity || 10;
                
                visualizerRef.current.updateParams({
                    // Chaotic color shift based on drag intensity
                    colorShift: progress * 2.5, 
                    // Glitch intensity ramps up
                    glitchIntensity: progress * 0.8,
                    // Speed increases dramatically
                    rotationSpeed: baseSpeed + (progress * 8.0),
                    // Grid becomes extremely dense
                    gridDensity: baseDensity + (progress * 40),
                    // Morphing becomes erratic
                    morphFactor: 0.5 + (Math.sin(Date.now() / 50) * progress * 0.5)
                });
            }
        };

        const handlePointerUp = () => {
            if (!isDragging) return;

            const deltaX = currentX.current - startX.current;
            const threshold = getThreshold();
            let shouldNavigate = false;

            if (dragSide === 'left' && deltaX > threshold) {
                onNavigate('prev');
                shouldNavigate = true;
            } else if (dragSide === 'right' && deltaX < -threshold) {
                onNavigate('next');
                shouldNavigate = true;
            }

            if (!shouldNavigate) {
                // --- SNAP BACK ---
                // Revert visualizer to base params smoothly
                if (visualizerRef.current && baseParams) {
                    // We create a dummy object to tween so we can update the engine on each frame
                    const tempState = { progress: 1 }; 
                    gsap.to(tempState, {
                        progress: 0,
                        duration: 0.6,
                        ease: "elastic.out(1, 0.5)",
                        onUpdate: () => {
                            const p = tempState.progress;
                            // Manually interpolate back to base
                            visualizerRef.current?.updateParams({
                                colorShift: p * 0.5,
                                glitchIntensity: p * 0.2,
                                rotationSpeed: baseParams.rotationSpeed,
                                gridDensity: baseParams.gridDensity
                            });
                        },
                        onComplete: () => {
                            // Hard reset to ensure clean state
                            visualizerRef.current?.updateParams(baseParams);
                        }
                    });
                }
            }
            
            setIsDragging(false);
            setDragSide(null);
            document.body.style.cursor = 'default';
            document.body.style.userSelect = '';
        };

        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        // Handle leaving window
        window.addEventListener('pointerleave', handlePointerUp);

        return () => {
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
            window.removeEventListener('pointerleave', handlePointerUp);
        };
    }, [isDragging, dragSide, baseParams, onNavigate, visualizerRef]);

    return (
        <div className="fixed inset-0 z-40 pointer-events-none">
            {/* Visual Hint Zones - Only visible on hover to reduce visual noise */}
            <div 
                className="absolute left-0 top-0 bottom-0 w-[20px] z-50 pointer-events-auto cursor-grab transition-colors duration-300 hover:bg-cyan-500/10 group" 
                title="Drag to Navigate Prev"
            />
            <div 
                className="absolute right-0 top-0 bottom-0 w-[20px] z-50 pointer-events-auto cursor-grab transition-colors duration-300 hover:bg-purple-500/10 group"
                title="Drag to Navigate Next"
            />
            
            {/* Drag Feedback Indicators */}
            <div className={`absolute left-8 top-1/2 -translate-y-1/2 text-cyan-500/50 font-mono text-xs tracking-[0.3em] -rotate-90 transition-opacity duration-300 ${isDragging && dragSide === 'left' ? 'opacity-100' : 'opacity-0'}`}>
                PREVIOUS SYSTEM &gt;&gt;
            </div>
            <div className={`absolute right-8 top-1/2 -translate-y-1/2 text-purple-500/50 font-mono text-xs tracking-[0.3em] rotate-90 transition-opacity duration-300 ${isDragging && dragSide === 'right' ? 'opacity-100' : 'opacity-0'}`}>
                &lt;&lt; NEXT SYSTEM
            </div>
        </div>
    );
};

export default GestureHandler;
