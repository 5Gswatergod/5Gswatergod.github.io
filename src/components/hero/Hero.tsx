'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowDownRight } from 'lucide-react';
import { siteConfig } from '@/data/social';

const nodes = [
  { id: 'ai', label: 'AI', position: [0, 1.55, 0] as const, color: '#67c7ff', target: 'skills' },
  { id: 'web', label: 'WEB', position: [1.24, 0.48, 0.55] as const, color: '#7ce7d7', target: 'work' },
  { id: 'systems', label: 'SYSTEMS', position: [-1.24, 0.55, 0.55] as const, color: '#aeb9ff', target: 'work' },
  { id: 'games', label: 'GAMES', position: [-1.12, -0.75, -0.35] as const, color: '#ffb86b', target: 'lab' },
  { id: 'automation', label: 'AUTOMATION', position: [1.14, -0.7, -0.42] as const, color: '#e79cff', target: 'lab' },
  { id: 'mobile', label: 'MOBILE', position: [0, -1.62, 0.05] as const, color: '#ff806f', target: 'work' },
];

const links = [[0, 1], [0, 2], [0, 4], [1, 4], [1, 5], [2, 3], [2, 5], [3, 5]];

function CoreNode({ node, reducedMotion }: { node: (typeof nodes)[number]; reducedMotion: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current || reducedMotion) return;
    mesh.current.rotation.y = clock.elapsedTime * 0.18;
    mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.08;
  });

  return (
    <group position={node.position}>
      <mesh
        ref={mesh}
        onClick={() => document.getElementById(node.target)?.scrollIntoView({ behavior: 'smooth' })}
        onPointerOver={() => { document.body.dataset.cursor = 'view'; }}
        onPointerOut={() => { document.body.dataset.cursor = 'default'; }}
      >
        <icosahedronGeometry args={[0.27, 1]} />
        <meshPhysicalMaterial color={node.color} roughness={0.28} metalness={0.18} transmission={0.42} thickness={0.45} emissive={node.color} emissiveIntensity={0.12} />
      </mesh>
      <Html center distanceFactor={8} position={[0, -0.48, 0]} style={{ pointerEvents: 'none' }}>
        <span className="core-label">{node.label}</span>
      </Html>
    </group>
  );
}

function NetworkLines() {
  const geometry = useMemo(() => {
    const points = links.flatMap(([start, end]) => [
      new THREE.Vector3(...nodes[start].position),
      new THREE.Vector3(...nodes[end].position),
    ]);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#77cfff" transparent opacity={0.2} />
    </lineSegments>
  );
}

function ParticleField({ reducedMotion }: { reducedMotion: boolean }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => Float32Array.from({ length: 240 }, (_, index) => ((((index * 9301 + 49297) % 233280) / 233280) - 0.5) * 7), []);

  useFrame(({ clock }) => {
    if (!points.current || reducedMotion) return;
    points.current.rotation.y = clock.elapsedTime * 0.018;
    points.current.rotation.x = Math.sin(clock.elapsedTime * 0.08) * 0.08;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#d4f6ff" size={0.018} transparent opacity={0.38} sizeAttenuation />
    </points>
  );
}

function DigitalCore({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    const pageProgress = typeof window === 'undefined' ? 0 : Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    const targetScale = 1 - pageProgress * 0.24;
    group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), reducedMotion ? 1 : 0.08);
    if (!reducedMotion) {
      group.current.rotation.y += ((pointer.x * 0.2) + clock.elapsedTime * 0.025 - group.current.rotation.y) * 0.04;
      group.current.rotation.x += ((-pointer.y * 0.16) - group.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <ParticleField reducedMotion={reducedMotion} />
      <NetworkLines />
      <mesh>
        <sphereGeometry args={[0.58, 48, 48]} />
        <meshPhysicalMaterial color="#07131a" roughness={0.18} metalness={0.55} transmission={0.5} thickness={0.8} emissive="#178bb2" emissiveIntensity={0.16} />
      </mesh>
      <mesh rotation={[Math.PI / 2.35, 0.3, 0]}>
        <torusGeometry args={[0.92, 0.012, 8, 120]} />
        <meshBasicMaterial color="#8eefff" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[0.4, 0.2, Math.PI / 2]}>
        <torusGeometry args={[1.12, 0.008, 8, 120]} />
        <meshBasicMaterial color="#8d9cff" transparent opacity={0.34} />
      </mesh>
      {nodes.map((node) => <CoreNode key={node.id} node={node} reducedMotion={reducedMotion} />)}
    </group>
  );
}

function BootOverlay({ onDone }: { onDone: () => void }) {
  const [line, setLine] = useState(0);
  const bootLines = ['MOUNTING PUBLIC REPOSITORIES', 'INDEXING BUILD SYSTEMS', 'CALIBRATING INTERACTIONS', 'READY'];

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (sessionStorage.getItem('hl-booted') || reduced) {
      onDone();
      return;
    }
    const interval = window.setInterval(() => {
      setLine((value) => {
        if (value >= bootLines.length - 1) {
          window.clearInterval(interval);
          window.setTimeout(() => {
            sessionStorage.setItem('hl-booted', '1');
            onDone();
          }, 160);
          return value;
        }
        return value + 1;
      });
    }, 190);
    return () => window.clearInterval(interval);
  }, [onDone, bootLines.length]);

  return (
    <div className="boot-screen" role="status" aria-live="polite">
      <div className="boot-frame">
        <div className="boot-kicker">5GS / PORTFOLIO</div>
        <div className="boot-readout">{bootLines[line]}</div>
        <div className="boot-track"><span style={{ width: `${((line + 1) / bootLines.length) * 100}%` }} /></div>
        <div className="boot-index">0{line + 1} — 0{bootLines.length}</div>
      </div>
    </div>
  );
}

export function Hero() {
  const [booting, setBooting] = useState(true);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const section = useRef<HTMLElement>(null);
  const finishBoot = useCallback(() => setBooting(false), []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '15%' });
    if (section.current) observer.observe(section.current);
    return () => { media.removeEventListener('change', sync); observer.disconnect(); };
  }, []);

  return (
    <>
      {booting && <BootOverlay onDone={finishBoot} />}
      <section id="hero" ref={section} className="hero-shell" aria-labelledby="hero-title">
        <div className="grid-pattern" />
        <div className="hero-vignette" />
        <div className="hero-copy">
          <div className="hero-serial"><span>HL–026</span><span>PUBLIC SYSTEMS INDEX</span></div>
          <h1 id="hero-title" className="hero-name">
            <span>HUNG</span><span>YUAN</span><span>LO</span>
          </h1>
          <div className="hero-role">
            <span>{siteConfig.title}</span>
            <p>I build software where engineering, AI, and interaction meet.</p>
          </div>
        </div>
        <div className="hero-core" aria-hidden="true">
          <Canvas
            camera={{ position: [0, 0, 5.7], fov: 42 }}
            dpr={[1, 1.5]}
            frameloop={visible && !reducedMotion ? 'always' : 'demand'}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          >
            <ambientLight intensity={0.48} />
            <directionalLight position={[4, 5, 6]} intensity={1.2} color="#c6f4ff" />
            <pointLight position={[-4, -2, 3]} intensity={0.8} color="#6277ff" />
            <DigitalCore reducedMotion={reducedMotion} />
          </Canvas>
        </div>
        <div className="hero-footer">
          <div className="system-status"><i />{siteConfig.status}</div>
          <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hero-scroll" data-cursor="view">
            ENTER THE SYSTEM <ArrowDownRight size={16} />
          </button>
        </div>
      </section>
    </>
  );
}
