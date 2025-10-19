import React, { useEffect, useRef} from 'react';
import * as THREE from 'three';

const Hero: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const cursorLightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // --- FIX: Reference the container element directly ---
        // We use this variable to avoid repeatedly accessing mountRef.current
        const mountNode = mountRef.current;
        if (!mountNode) {
            return; // Exit if the ref is not yet available
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mountNode.clientWidth / mountNode.clientHeight, 0.1, 1000);
        camera.position.z = 50;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        // --- FIX: Size the renderer to its container, not the window ---
        renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountNode.appendChild(renderer.domElement);

        const grids: THREE.GridHelper[] = [];
        let mountAnimationProgress = 0;
        const mouse = new THREE.Vector2(0, 0);

        // --- GRID OBJECTS ---
        const gridSize = 300;
        const gridDivisions = 100;
        const gridColor = new THREE.Color('#004080');
        // for (let i = 0; i < 2; i++) {
            const grid = new THREE.GridHelper(gridSize, gridDivisions, gridColor, gridColor);
            (grid.material as THREE.LineBasicMaterial).transparent = true;
            (grid.material as THREE.LineBasicMaterial).opacity = 0;
            grid.scale.set(0.01, 0.01, 0.01);
            grid.position.y = (0) * -0.1;
            grids.push(grid);
            scene.add(grid);
        // }

        // --- EVENT LISTENERS FOR INTERACTION ---
        const handleResize = () => {
            // --- FIX: On resize, use the container's new dimensions ---
            if (mountNode) {
                camera.aspect = mountNode.clientWidth / mountNode.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
            }
        };

        const handleMouseMove = (event: MouseEvent) => {
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
        const animate = () => {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            
            const animationDuration = 2.5;
            if (mountAnimationProgress < animationDuration) {
                mountAnimationProgress += delta;
                const totalProgress = Math.min(mountAnimationProgress / animationDuration, 1.0);

                grids.forEach((grid, i) => {
                    const revealDelay = i * 0.05;
                    if (totalProgress > revealDelay) {
                        const gridProgress = Math.min((totalProgress - revealDelay) / 1.0, 1.0);
                        const easedProgress = 1 - Math.pow(1 - gridProgress, 4);
                        grid.scale.set(easedProgress, easedProgress, easedProgress);
                        ((grid.material as THREE.LineBasicMaterial).opacity = easedProgress * (0.3 - i * 0.07));
                        grid.rotation.y = (1 - easedProgress) * Math.PI * 0.35 * (i % 2 === 0 ? 1 : -1);
                    }
                });
            }

            camera.position.x += (mouse.x * 10 - camera.position.x) * 0.05;
            camera.position.y += (mouse.y * 10 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);
            
            renderer.render(scene, camera);
        };
        animate();

        // --- CLEANUP ---
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (mountNode && renderer.domElement && mountNode.contains(renderer.domElement)) {
                mountNode.removeChild(renderer.domElement);
            }
            
            scene.traverse(object => {
                const obj = object as THREE.Mesh;
                if(obj.geometry) obj.geometry.dispose();
                if(obj.material) {
                    if (Array.isArray(obj.material)) {
                        obj.material.forEach(material => material.dispose());
                    } else {
                        obj.material.dispose();
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
                .ainfinity-title-fluid {
                    font-size: clamp(3rem, 10vw, 8rem);
                }
                .ainfinity-subtitle-fluid {
                    font-size: clamp(1rem, 2.5vw, 1.5rem);
                }
            `}</style>
            
            <section className="h-screen relative w-full overflow-hidden flex justify-center items-center text-center font-['Exo_2'] text-white relative overflow-hidden">
                {/* This div is the container for the canvas. It fills the parent section. */}
                <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-[1]" />
                
                {/* <div className="ainfinity-vignette absolute top-0 left-0 w-full h-full z-[3] pointer-events-none" /> */}
                <div ref={cursorLightRef} className="ainfinity-cursor fixed w-[10px] h-[10px] bg-black rounded-full left-0 top-0 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-[10000] transition-transform duration-100 ease-out" />
                
                <div className="content-animate relative z-2 flex flex-col items-center p-8 max-w-4xl">
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