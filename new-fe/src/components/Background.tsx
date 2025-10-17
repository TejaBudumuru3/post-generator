import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';


export const Background = ({enableMouseMove = false, display = "fixed"})=>{
    const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
    }
    
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.0, 0.5, 0.8);
    const composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(bloomPass);

    const dotCount = 20000;
    const dotGeo = new THREE.BufferGeometry();
    const dotPositions = new Float32Array(dotCount * 3);
    const dotSizes = new Float32Array(dotCount);
    for (let i = 0; i < dotCount; i++) {
        const i3 = i * 3;
        const radius = Math.random() * 400 + 100;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        dotPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        dotPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        dotPositions[i3 + 2] = radius * Math.cos(phi);
        dotSizes[i] = Math.random() * 0.8 + 0.2;
    }
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    dotGeo.setAttribute('size', new THREE.BufferAttribute(dotSizes, 1));
    const customDotMaterial = new THREE.ShaderMaterial({
        uniforms: { color: { value: new THREE.Color(0xffffff) } },
        vertexShader: `attribute float size; void main() { vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * (300.0 / -mvPosition.z); gl_Position = projectionMatrix * mvPosition; }`,
        fragmentShader: `uniform vec3 color; void main() { if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard; gl_FragColor = vec4(color, 1.0); }`,
        blending: THREE.AdditiveBlending, transparent: true, depthWrite: false
    });
    const dots = new THREE.Points(dotGeo, customDotMaterial);
    scene.add(dots);

    let mouse = new THREE.Vector2(0, 0);
    const handleResize = () => { 
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
    };
    const handleMouseMove = (event:any) => { mouse.x = (event.clientX / window.innerWidth) * 2 - 1; mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; };
    
    if (enableMouseMove) {
        window.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    const animate = () => {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        
        if (enableMouseMove) {
            camera.position.x += (mouse.x * 10 - camera.position.x) * 0.05;
            camera.position.y += (mouse.y * 10 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);
        } else {
            dots.rotation.y += delta * 0.01; // Slow ambient rotation
        }

        composer.render();
    };
    animate();

    return () => {
        window.removeEventListener('resize', handleResize);
        if (enableMouseMove) {
            window.removeEventListener('mousemove', handleMouseMove);
        }
        if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
            mountRef.current.removeChild(renderer.domElement);
        }
        scene.traverse(object => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) object.material.dispose();
        });
    };
  }, [enableMouseMove]);

    return(
        <div className={`h-screen w-full ${display} z-[-1]`} ref={mountRef}></div>
    )
}