'use client';

import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { BufferGeometry, MathUtils, Vector3, type Group } from 'three';
import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { siteConfig } from '@/data/social';

const nodes = [
  { label: 'Local AI', project: 'Ollama Models Manager', slug: 'ollama-models-manager', detail: 'Verify local model archives before restoring them', target: 'skills', link: 'See technologies', point: [-1.36, 1.00, 0.42] },
  { label: 'Web', project: 'Eco Chemists', slug: 'interactive-eco-site', detail: 'An interactive site for a school research project', target: 'work', link: 'See selected work', point: [0.48, 1.42, -0.30] },
  { label: 'Systems', project: 'Hydrava', slug: 'discord-bot-2026', detail: 'A self-hosted Discord platform with a modular service stack', target: 'work', link: 'See selected work', point: [1.56, 0.56, 0.42] },
  { label: 'Games', project: 'Taiwan Mahjong', slug: 'mahjong', detail: 'One TypeScript rules engine shared by client and server', target: 'lab', link: 'Explore the lab', point: [1.24, -1.00, -0.24] },
  { label: 'Automation', project: 'Avoid Overkill', slug: 'avoid-overkill', detail: 'Review scenarios for engineering judgment in coding agents', target: 'lab', link: 'Explore the lab', point: [-0.42, -1.38, 0.42] },
  { label: 'Mobile', project: 'AI Budget Tracker', slug: 'ai-budget-tracker', detail: 'A local-first mobile ledger with a rule-based fallback', target: 'work', link: 'See selected work', point: [-1.60, -0.60, -0.28] },
] as const;

const accent = '#7ce7d7';

function FlatMap({ selected }: { selected: number }) {
  const points = nodes.map(({ point: [x, y] }) => [x * 62, -y * 62]);
  return (
    <svg className="map-fallback" viewBox="-165 -110 330 220" fill="none">
      <path d={`M${points.map((point) => point.join(' ')).join('L')}Z`} stroke="#5c706e" />
      {points.map(([x, y], index) => <path key={index} d={`M0 0L${x} ${y}`} stroke={selected === index ? accent : '#455453'} />)}
      <path d="M0 -30L26 -15V15L0 30L-26 15V-15Z" fill="#243232" stroke="#627675" />
      {points.map(([x, y], index) => <circle key={index} cx={x} cy={y} r={selected === index ? 9 : 6} fill={selected === index ? accent : '#738584'} />)}
    </svg>
  );
}

class MapBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function BuildMap({ selected, onSelect }: { selected: number; onSelect: (index: number) => void }) {
  const group = useRef<Group>(null);
  const invalidate = useThree((state) => state.invalidate);
  const canvas = useThree((state) => state.gl.domElement);
  const target = useRef({ x: 0, y: 0 });
  const track = useMemo(() => new BufferGeometry().setFromPoints(nodes.map(({ point }) => new Vector3(...point))), []);
  const spokes = useMemo(() => new BufferGeometry().setFromPoints(nodes.flatMap(({ point }) => [new Vector3(), new Vector3(...point)])), []);
  const signal = useMemo(() => new BufferGeometry().setFromPoints([new Vector3(), new Vector3(...nodes[selected].point)]), [selected]);

  useEffect(() => () => { track.dispose(); spokes.dispose(); }, [track, spokes]);
  useEffect(() => () => signal.dispose(), [signal]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const { rotation } = group.current;
    const point = nodes[selected].point;
    const x = target.current.x + point[1] * .08;
    const y = target.current.y + point[0] * .10;
    if (Math.abs(rotation.x - x) + Math.abs(rotation.y - y) < 0.002) {
      rotation.set(x, y, 0);
      return;
    }
    rotation.x = MathUtils.damp(rotation.x, x, 11, delta);
    rotation.y = MathUtils.damp(rotation.y, y, 11, delta);
    invalidate();
  });

  return (
    <group
      ref={group}
      onPointerMove={(event) => {
        if (event.pointerType !== 'mouse') return;
        target.current = { x: -event.pointer.y * 0.18, y: event.pointer.x * 0.28 };
        invalidate();
      }}
      onPointerLeave={() => { target.current = { x: 0, y: 0 }; invalidate(); }}
    >
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[8, 5]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      <lineLoop geometry={track}><lineBasicMaterial color="#647e7b" /></lineLoop>
      <lineSegments geometry={spokes}><lineBasicMaterial color="#526867" /></lineSegments>
      <lineSegments geometry={signal}><lineBasicMaterial color={accent} /></lineSegments>
      <mesh rotation={[0.2, 0.4, 0.2]}>
        <icosahedronGeometry args={[0.57, 0]} />
        <meshStandardMaterial color="#45625e" roughness={0.82} flatShading />
      </mesh>
      <mesh rotation={[0.2, 0.4, 0.2]}>
        <icosahedronGeometry args={[0.58, 0]} />
        <meshBasicMaterial color="#92b7b0" wireframe transparent opacity={0.45} />
      </mesh>
      {nodes.map(({ label, point }, index) => (
        <group key={label} position={[...point]}>
          <mesh
            onPointerOver={() => { canvas.style.cursor = 'pointer'; }}
            onPointerOut={() => { canvas.style.cursor = ''; }}
            onClick={(event) => { event.stopPropagation(); onSelect(index); }}
          >
            <icosahedronGeometry args={[0.26, 0]} />
            <meshBasicMaterial visible={false} />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[selected === index ? 0.20 : 0.15, 0]} />
            <meshStandardMaterial color={selected === index ? accent : '#829c98'} roughness={0.76} flatShading />
          </mesh>
          {selected === index && <mesh>
            <ringGeometry args={[0.27, 0.282, 6]} />
            <meshBasicMaterial color={accent} />
          </mesh>}
        </group>
      ))}
    </group>
  );
}

export function Hero({ recentWork }: { recentWork: Pick<Project, 'id' | 'name' | 'tagline'>[] }) {
  const [selected, setSelected] = useState(3);
  const [reducedMotion, setReducedMotion] = useState(true);
  const node = nodes[selected];
  const fallback = <FlatMap selected={selected} />;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return (
    <section id="hero" className="hero-shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-serial">Developer portfolio</p>
        <h1 id="hero-title" className="hero-name">{siteConfig.name}</h1>
        <div className="hero-role">
          <p>I build tools for local AI, software for online communities, and games people play together.</p>
          <a href="#work" className="hero-scroll">Explore selected work <ArrowDownRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
      <section className="hero-map" aria-labelledby="build-map-title">
        <header className="map-heading"><h2 id="build-map-title">Build map</h2><span>Choose a field</span></header>
        <div className="map-stage" aria-hidden="true">
          {fallback}
          {!reducedMotion && <MapBoundary fallback={null}>
            <Canvas camera={{ position: [0, 0, 6.4], fov: 33 }} dpr={[1, 1.5]} frameloop="demand" gl={{ antialias: true }}>
              <color attach="background" args={['#101617']} />
              <ambientLight intensity={1.4} />
              <directionalLight position={[-3, 5, 5]} intensity={2.4} />
              <BuildMap selected={selected} onSelect={setSelected} />
            </Canvas>
          </MapBoundary>}
        </div>
        <div className="map-fields" role="group" aria-label="Project fields">
          {nodes.map(({ label }, index) => <button key={label} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{label}</button>)}
        </div>
        <div className="map-readout">
          <div key={node.label} className="map-description"><strong><Link href={`/projects/${node.slug}/`}>{node.project}</Link></strong><span>{node.detail}</span></div>
          <span className="sr-only" role="status">{node.project}: {node.detail}</span>
          <a href={`#${node.target}`}>{node.link}<ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </section>
      {recentWork.length > 0 && (
        <nav className="hero-recent" aria-label="Recently updated projects">
          <h2>Recently updated</h2>
          {recentWork.map((project) => (
            <a key={project.id} href={`/projects/${project.id}/`}>
              <strong>{project.name}</strong><ArrowUpRight size={16} aria-hidden="true" />
              <span>{project.tagline}</span>
            </a>
          ))}
        </nav>
      )}
    </section>
  );
}
