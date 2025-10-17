import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const cursorLightRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // This scene is ONLY for the grids. It is transparent.
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 30, 50); // Elevated camera position to see grids better

        // CRITICAL: Renderer must have a transparent background (`alpha: true`).
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        let grids: THREE.GridHelper[] = [];
        let mountAnimationProgress = 0;
        let mouse = new THREE.Vector2(0, 0);

        // --- GRID OBJECTS ---
        const gridSize = 200;
        const gridDivisions = 30;
        const gridColor = new THREE.Color('#00e5ff'); // Changed to crystal color for visibility
        
        for (let i = 0; i < 3; i++) {
            const grid = new THREE.GridHelper(gridSize, gridDivisions, gridColor, gridColor);
            grid.material.transparent = true;
            grid.material.opacity = 0;
            grid.scale.set(0.01, 0.01, 0.01);
            // Position grids in front of camera at different depths
            grid.position.set(0, -20 + (i * 10), -30 - (i * 15));
            grid.rotation.x = Math.PI * 0.1; // Slight tilt for better visibility
            grids.push(grid);
            scene.add(grid);
        }

        // --- EVENT LISTENERS FOR INTERACTION ---
        const handleResize = (): void => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        const handleMouseMove = (event: MouseEvent): void => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            if (cursorLightRef.current) {
                cursorLightRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        // --- ANIMATION LOOP ---
        const clock = new THREE.Clock();
        const animate = (): void => {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            
            // Grid mount animation
            const animationDuration = 2.5;
            if (mountAnimationProgress < animationDuration) {
                mountAnimationProgress += delta;
                const totalProgress = Math.min(mountAnimationProgress / animationDuration, 1.0);

                grids.forEach((grid, i) => {
                    const revealDelay = i * 0.15;
                    if (totalProgress > revealDelay) {
                        const gridProgress = Math.min((totalProgress - revealDelay) / 1.0, 1.0);
                        const easedProgress = 1 - Math.pow(1 - gridProgress, 4);
                        grid.scale.set(easedProgress, easedProgress, easedProgress);
                        // Increased opacity for better visibility
                        grid.material.opacity = easedProgress * (0.4 - i * 0.08);
                        grid.rotation.y = (1 - easedProgress) * Math.PI * 0.35 * (i % 2 === 0 ? 1 : -1);
                    }
                });
            }

            // This camera's movement is tied to the mouse, affecting only the grids.
            camera.position.x += (mouse.x * 10 - camera.position.x) * 0.05;
            camera.position.y += (mouse.y * 10 + 30 - camera.position.y) * 0.05;
            camera.lookAt(0, -10, -40); // Look at center of grid area
            
            renderer.render(scene, camera);
        };
        animate();

        // --- CLEANUP ---
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            scene.traverse((object: THREE.Object3D) => {
                if ((object as THREE.Mesh).geometry) {
                    (object as THREE.Mesh).geometry.dispose();
                }
                if ((object as THREE.Mesh).material) {
                    const material = (object as THREE.Mesh).material;
                    if (Array.isArray(material)) {
                        material.forEach((mat) => mat.dispose());
                    } else {
                        material.dispose();
                    }
                }
            });
        };
    }, []);

    return (
        <>
        <style>{`
            :root { --crystal-color: #00e5ff; }
            @keyframes moveUpFadeIn {
                from { opacity: 0; transform: translateY(40px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .ainfinity-h1 { text-shadow: 0 0 10px #fff, 0 0 20px var(--crystal-color), 0 0 40px var(--crystal-color), 0 0 80px var(--crystal-color); }
            .ainfinity-cursor { box-shadow: 0 0 20px 7px white, 0 0 40px 15px var(--crystal-color); }
            .ainfinity-vignette { background: radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.95) 100%); }
            .content-animate { animation: moveUpFadeIn 2s ease-out 0.5s forwards; }

            /* FIX: Defined fluid font sizes in dedicated CSS classes for reliability */
            .ainfinity-title-fluid {
                font-size: clamp(3rem, 10vw, 8rem);
            }
            .ainfinity-subtitle-fluid {
                font-size: clamp(1rem, 2.5vw, 1.5rem);
            }
        `}</style>
        
        {/* This is a normal, scrollable section that takes up the full screen height */}
        <section className="h-screen w-full overflow-hidden flex justify-center items-center text-center font-['Exo_2'] text-white relative">
            
            {/* This div is ONLY for the transparent foreground canvas (grids) */}
            <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none" />
            
            <div className="ainfinity-vignette absolute top-0 left-0 w-full h-full z-[3] pointer-events-none" />
            <div ref={cursorLightRef} className="ainfinity-cursor fixed w-[10px] h-[10px] bg-white rounded-full left-0 top-0 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-[10000] transition-transform duration-100 ease-out" />
            
            <div className="content-animate relative z-[2] flex flex-col items-center p-8 max-w-4xl">
                {/* FIX: Using the new reliable CSS classes instead of Tailwind's arbitrary values */}
                <h1 className="ainfinity-h1 ainfinity-title-fluid font-bold tracking-wider m-0">
                    Ainfinity
                </h1>
                <p className="ainfinity-subtitle-fluid mt-4 leading-relaxed font-light max-w-2xl">
                    Precision in Creation. Beauty in Structure.
                </p>
            </div>
        </section>
        </>
    );
};

export default Hero;