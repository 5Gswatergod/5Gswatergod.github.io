export type ProjectCategory =
  | 'ai'
  | 'fullstack'
  | 'web'
  | 'mobile'
  | 'game'
  | 'tools'
  | 'experiments';

export type ProjectMedia = {
  src: string;
  alt: string;
  kind: 'repository' | 'concept';
  objectPosition?: string;
};

export interface Project {
  id: string;
  name: string;
  repoName: string;
  tagline: string;
  description: string;
  year: number;
  category: ProjectCategory[];
  technologies: string[];
  github?: string;
  liveUrl?: string;
  featured: boolean;
  fork?: boolean;
  accent: string;
  media?: ProjectMedia;
  highlights?: string[];
  longDescription?: string;
  architecture?: {
    client: string[];
    server: string[];
    realtime: string[];
    infrastructure: string[];
  };
  evidence?: string[];
}

const github = (repo: string) => `https://github.com/5Gswatergod/${repo}`;

/** Public project index reviewed on 2026-11-26. */
export const projects: Project[] = [
  {
    id: 'mahjong',
    name: 'Mahjong',
    repoName: 'Mahjong',
    tagline: 'A shared game core for real-time Taiwan Mahjong',
    description: 'A React, Fastify, and Socket.IO monorepo with shared TypeScript packages for rules, state, and cross-app contracts.',
    longDescription: 'The repository separates the Vite client, Fastify/Socket.IO server, Mahjong rules engine, and shared types into npm workspaces. One production image serves the frontend and the real-time backend, with GitHub workflows for GHCR publishing and Oracle deployment.',
    year: 2026,
    category: ['fullstack', 'game', 'web'],
    technologies: ['TypeScript', 'React', 'Vite', 'Fastify', 'Socket.IO', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    github: github('Mahjong'),
    featured: true,
    accent: '#7ce7d7',
    media: { src: '/projects/mahjong-table.png', alt: 'Game table background from the Mahjong repository', kind: 'repository' },
    highlights: ['npm workspace monorepo', 'Shared rules and state engine', 'Socket.IO client/server', 'Single production container'],
    architecture: {
      client: ['React 18', 'Vite', 'socket.io-client', 'Shared game-core package'],
      server: ['Fastify 5', 'Socket.IO', 'PostgreSQL client', 'Shared game-core package'],
      realtime: ['Socket.IO event transport', 'Shared TypeScript contracts', 'Room and table UI flows'],
      infrastructure: ['Docker image', 'GHCR publish workflow', 'Oracle deploy workflow', 'Typecheck, test, and build scripts'],
    },
    evidence: [
      'README: apps/web, apps/server, packages/game-core, and packages/shared.',
      'Package manifests: React 18, Fastify 5, Socket.IO 4, PostgreSQL client, and Vitest.',
      'Repository workflows publish one image and document Oracle deployment.',
    ],
  },
  {
    id: 'ollama-models-manager',
    name: 'Ollama Models Manager',
    repoName: 'Ollama-Models-Manager',
    tagline: 'Safe, verifiable backup and restore for local models',
    description: 'A Python 3.11+ CLI and desktop UI for Ollama model diagnosis, backup, integrity verification, staging, rollback, restore, quantization, and context benchmarking.',
    longDescription: 'The project treats model archives as untrusted input. It validates manifest and blob size plus SHA-256, writes through a .partial file before atomic commit, deduplicates shared blobs, and uses staging plus rollback aliases before replacing a model through the local Ollama API.',
    year: 2026,
    category: ['ai', 'tools'],
    technologies: ['Python', 'Ollama API', 'Tkinter', 'Zip64', 'SHA-256', 'unittest', 'Ruff'],
    github: github('Ollama-Models-Manager'),
    featured: true,
    accent: '#64b5ff',
    media: { src: '/projects/ollama-manager-concept.png', alt: 'Conceptual visualization of a verified local model archive and staging pipeline', kind: 'concept' },
    highlights: ['Verified Zip64 bundles', 'API staging and rollback', 'LM Studio GGUF import', 'Measured context-length evaluation'],
    architecture: {
      client: ['Command-line interface', 'Tkinter desktop interface', 'JSON automation output'],
      server: ['Loopback-only Ollama API', 'Read-only model-store discovery', 'Offline restore mode'],
      realtime: ['Background GUI jobs', 'Streaming progress', 'eval_count / eval_duration measurements'],
      infrastructure: ['Python standard-library runtime', 'Cross-platform package', 'unittest suite', 'Ruff checks'],
    },
    evidence: [
      'README documents SHA-256 validation, .partial writes, atomic rename, staging, rollback, and fail-closed archive parsing.',
      'pyproject.toml exposes both ollama-manager and ollama-manager-gui entry points with no runtime dependencies.',
      'Tests cover bundles, restore paths, hardware recommendations, LM Studio import, GUI behavior, and benchmarking.',
    ],
  },
  {
    id: 'discord-bot-2026',
    name: 'Hydrava',
    repoName: 'Discord-Bot-2026',
    tagline: 'Self-hosted Discord community infrastructure',
    description: 'A TypeScript monorepo combining a discord.js bot, a Next.js management dashboard, shared packages, PostgreSQL, Redis, and Lavalink.',
    longDescription: 'Hydrava organizes community-management modules around a guild-scoped Prisma schema and a dashboard authenticated through Discord OAuth. The repository includes moderation, logging, leveling, automation, tickets, reaction roles, giveaways, polls, reminders, social alerts, music, and optional AI and membership integrations.',
    year: 2026,
    category: ['fullstack', 'tools', 'web'],
    technologies: ['TypeScript', 'discord.js', 'Next.js', 'NextAuth.js', 'PostgreSQL', 'Prisma', 'Redis', 'Lavalink', 'Docker', 'Caddy'],
    github: github('Discord-Bot-2026'),
    featured: true,
    accent: '#8d9cff',
    media: { src: '/projects/hydrava-avatar.png', alt: 'Hydrava avatar from the Discord-Bot-2026 repository', kind: 'repository' },
    highlights: ['Bot and dashboard monorepo', 'Guild-scoped Prisma data model', 'Redis-backed modules', 'Self-hosted Compose stack'],
    architecture: {
      client: ['Next.js 14 dashboard', 'Discord OAuth via NextAuth.js', 'Guild management views', 'Local UI primitives'],
      server: ['discord.js v14 bot', 'Prisma ORM', 'PostgreSQL', 'Redis'],
      realtime: ['Discord Gateway events', 'Module workers and cooldowns', 'Lavalink playback'],
      infrastructure: ['Docker Compose', 'Caddy HTTPS', 'GitHub Actions', 'Oracle deployment guide'],
    },
    evidence: [
      'README enumerates implemented phases, modules, commands, dashboard settings, and deployment topology.',
      'Workspace manifests confirm discord.js, Next.js 14, NextAuth.js, Prisma, ioredis, ethers, and Lavalink Client.',
      'Compose stacks include bot, dashboard, PostgreSQL, Redis, Lavalink, and production Caddy.',
    ],
  },
  {
    id: 'ai-budget-tracker',
    name: 'AI Budget Tracker',
    repoName: 'AI-Budget-Tracker',
    tagline: 'An offline-capable Expo ledger with assisted insights',
    description: 'A React Native and Expo app with a SQLite ledger, analytics, challenges, subscription states, optional sync, and an assistant that falls back to deterministic local rules.',
    longDescription: 'The repository implements ledger, analytics, assistant, challenge, billing, and admin modules. Sync and remote AI are endpoint-driven; when they are not configured, the app keeps working locally and the assistant produces rule-based summaries from ledger data.',
    year: 2025,
    category: ['mobile', 'ai'],
    technologies: ['TypeScript', 'React Native', 'Expo', 'Expo Router', 'SQLite', 'Zustand', 'TanStack Query', 'NativeWind'],
    github: github('AI-Budget-Tracker'),
    featured: true,
    accent: '#ffb86b',
    highlights: ['Local SQLite ledger', 'Rule-based AI fallback', 'Analytics and challenges', 'Optional endpoint sync'],
    architecture: {
      client: ['React Native 0.74', 'Expo 51', 'Expo Router', 'NativeWind'],
      server: ['Optional sync endpoint', 'Optional AI endpoint', 'Local fallback when unset'],
      realtime: ['Local persistence', 'Explicit sync states', 'Usage-aware assistant UI'],
      infrastructure: ['EAS-ready configuration', 'Jest preset', 'iOS and Android targets'],
    },
    evidence: [
      'Package manifest confirms Expo, React Native, expo-sqlite, React Query, Zustand, NativeWind, and chart dependencies.',
      'Assistant source calls a configured endpoint only for non-free plans and otherwise generates a deterministic ledger summary.',
      'Ledger source persists locally and exposes optional GET/POST sync when a sync endpoint exists.',
    ],
  },
  {
    id: 'motorcycle-test',
    name: 'RideReady',
    repoName: 'MotorcycleTest',
    tagline: 'A local-first Taiwan motorcycle written-test trainer',
    description: 'A React and TypeScript practice app backed by an audited question-bank pipeline assembled from three source PDFs.',
    longDescription: 'RideReady supports random practice and the 2026 Taiwan motorcycle written-test format. Python scripts generate and audit a fixed 1,052-question bank, while browser-local study records can be exported and imported as JSON without accounts or external sync.',
    year: 2026,
    category: ['web', 'tools'],
    technologies: ['TypeScript', 'React', 'Vite', 'Python', 'Vitest', 'GitHub Actions', 'localStorage'],
    github: github('MotorcycleTest'),
    featured: true,
    accent: '#ffd363',
    media: { src: '/projects/motorcycle-hero.png', alt: 'Night road and helmet artwork from the MotorcycleTest repository', kind: 'repository' },
    highlights: ['1,052-question audited bank', 'Random practice and timed exam', 'Local progress backup', 'GitHub Pages workflow'],
    architecture: {
      client: ['React 19', 'TypeScript', 'Vite', 'Browser localStorage'],
      server: ['No account or server database', 'Static generated question bank', 'JSON import/export'],
      realtime: ['Timed 30-minute exam state', 'Immediate answer review', 'Local learning records'],
      infrastructure: ['Python PDF pipeline', 'Dataset audit scripts', 'Vitest', 'GitHub Pages deployment'],
    },
    evidence: [
      'Repository README documents the 50-question, 30-minute, 85-point pass format and local-only storage.',
      'The generator and audit scripts verify 806 general, 120 context-image, and 126 video questions.',
      'Package scripts cover typecheck, tests, data checks, Sites tests, and builds.',
    ],
  },
  {
    id: 'project-skull',
    name: 'Project Skull',
    repoName: 'Project_skull',
    tagline: 'A config-driven local LLM training workbench',
    description: 'A modular Python framework for Chinese and mixed-language corpora, covering tokenization, binary shards, pretraining, continued pretraining, SFT, evaluation, sampling, and a React control panel.',
    longDescription: 'Project Skull keeps the training pipeline visible and configurable. YAML files drive model and run settings, SentencePiece prepares tokenization, PyTorch handles decoder-only training, and the web surface exposes jobs, logs, checkpoints, metrics, and samples.',
    year: 2026,
    category: ['ai', 'tools', 'fullstack'],
    technologies: ['Python', 'PyTorch', 'SentencePiece', 'Transformers', 'FastAPI', 'React', 'Tailwind CSS', 'GSAP'],
    github: github('Project_skull'),
    featured: true,
    accent: '#e79cff',
    highlights: ['YAML-driven training', 'Pretraining, CPT, and SFT', 'Evaluation and sampling CLI', 'React monitoring surface'],
    architecture: {
      client: ['React control panel', 'Tailwind CSS', 'GSAP', 'Run artifact views'],
      server: ['FastAPI web layer', 'PyTorch training modules', 'SentencePiece tokenizer', 'YAML configuration'],
      realtime: ['Job logs', 'Metrics and checkpoints', 'Sample and evaluation output'],
      infrastructure: ['Python package', 'pytest suite', 'Optional Accelerate', 'Vite frontend'],
    },
    evidence: [
      'README documents a complete local pipeline from corpus preparation through evaluation and sampling.',
      'Repository structure includes training configs, data scripts, CLI modules, tests, FastAPI web code, and a React frontend.',
      'The README explicitly describes the project as experiment-oriented and requires path review before training.',
    ],
  },
  {
    id: 'avoid-overkill', name: 'Avoid Overkill', repoName: 'avoid-overkill',
    tagline: 'Engineering judgment for coding agents',
    description: 'A Traditional Chinese skill that helps coding agents decide when to reuse a component, extend it, or build a small replacement.',
    longDescription: 'I adapted the original Avoid Overkill skill for Traditional Chinese workflows. Its review scenarios ask concrete questions: can an existing helper handle an empty array, and is it safe to retry a payment after a timeout? The guidance pairs each decision with a check the agent can perform.',
    year: 2026, category: ['tools', 'ai', 'experiments'], technologies: ['Markdown'], github: github('avoid-overkill'), featured: false, accent: '#7ce7d7',
    evidence: ['SKILL.md contains the agent instructions. The README credits the upstream author and provides review scenarios.'],
  },
  {
    id: 'portfolio', name: 'Interactive Portfolio', repoName: '5Gswatergod.github.io',
    tagline: 'The site behind this project archive',
    description: 'A static portfolio pairing project case studies with an interactive 3D homepage. Each case study links the tools used to examples from the project.',
    year: 2026, category: ['web'], technologies: ['TypeScript', 'Next.js', 'React', 'React Three Fiber', 'GSAP', 'GitHub Actions'], github: github('5Gswatergod.github.io'), featured: false, accent: '#7ce7d7',
  },
  {
    id: 'smartflow-budget-tracker', name: 'SmartFlow Budget Tracker', repoName: 'SmartFlowBudgetTracker', tagline: 'A native SwiftUI budgeting architecture',
    description: 'An iOS project organized into ledger, input, analytics, retention, payment, and sync modules with Core Data persistence and explicit mock/local/remote AI modes.',
    year: 2025, category: ['mobile', 'ai'], technologies: ['Swift', 'SwiftUI', 'Core Data', 'CloudKit', 'StoreKit'], github: github('SmartFlowBudgetTracker'), featured: false, accent: '#ff806f',
    highlights: ['MVVM-style modules', 'Core Data ledger', 'Configurable AI service modes', 'Simulated sync by default'],
  },
  {
    id: 'spinzio', name: 'Spin Rally', repoName: 'spinzio', tagline: 'A desktop-browser spinner arena prototype',
    description: 'An original Phaser prototype with pointer movement, RPM-based boosting, pellets, bot behavior, collisions, eliminations, and respawning.',
    year: 2026, category: ['game', 'experiments'], technologies: ['TypeScript', 'Phaser', 'Vite', 'Vitest'], github: github('spinzio'), featured: false, accent: '#ff6b8f',
  },
  {
    id: 'minecraft-chinese-localization-tool', name: 'Minecraft Chinese Localization Tool', repoName: 'Minecraft-Chinese-Localization-Tool', tagline: 'A review-first localization desktop workbench',
    description: 'An Electron and React app that scans modpacks, extracts translatable strings, supports manual or pluggable AI drafts, and exports a patch without changing the original modpack.',
    year: 2026, category: ['tools', 'ai'], technologies: ['TypeScript', 'Electron', 'React', 'Vite', 'Ollama API', 'XLSX'], github: github('Minecraft-Chinese-Localization-Tool'), featured: false, accent: '#a8d36e',
  },
  {
    id: 'interactive-eco-site', name: 'Eco Chemists', repoName: 'interactive-eco-site', tagline: 'An interactive environmental research story',
    description: 'A React experience combining Three.js scenes, GSAP motion, multiple research routes, and project media for an environmental PBL project.',
    year: 2025, category: ['web', 'experiments'], technologies: ['JavaScript', 'React', 'Three.js', 'React Three Fiber', 'GSAP', 'Tailwind CSS'], github: github('interactive-eco-site'), liveUrl: 'https://5gswatergod.github.io/interactive-eco-site/', featured: false, accent: '#74d7a2',
    media: { src: '/projects/eco-chemists-poster.jpg', alt: 'Poster from the interactive-eco-site repository', kind: 'repository' },
  },
  {
    id: 'eco-current', name: 'EcoCurrent', repoName: 'Eco-Current', tagline: 'A web presentation for cross-disciplinary plastic research',
    description: 'A React and GSAP site presenting chemistry, geography, lab studies, interviews, and GIS-oriented work around plastic pollution.',
    year: 2025, category: ['web', 'experiments'], technologies: ['JavaScript', 'React', 'Vite', 'GSAP', 'Tailwind CSS'], github: github('Eco-Current'), liveUrl: 'https://5gswatergod.github.io/eco-current/', featured: false, accent: '#5bb8e8',
    media: { src: '/projects/eco-current-exhibition.jpg', alt: 'Exhibition photo from the Eco-Current repository', kind: 'repository' },
  },
  {
    id: 'ocr-vaccine', name: 'OCR Vaccine', repoName: 'OCR-Vaccine', tagline: 'OCR experiments for vaccine sticker identification',
    description: 'A multi-version Python computer-vision project containing camera capture, OCR, bounding-box, GUI, and PaddleOCR experiments.',
    year: 2024, category: ['ai', 'tools', 'experiments'], technologies: ['Python', 'PaddleOCR', 'Computer Vision'], github: github('OCR-Vaccine'), featured: false, accent: '#7fc6ff',
  },
  {
    id: 'spaceship-war', name: 'Spaceship War', repoName: 'Spaceship-War', tagline: 'A Chinese-language Pygame arcade shooter',
    description: 'A 60 FPS Pygame project with sprite animation, asteroids, projectiles, sound, shields, weapon upgrades, and lives.',
    year: 2024, category: ['game', 'experiments'], technologies: ['Python', 'Pygame'], github: github('Spaceship-War'), featured: false, accent: '#c2c8ff',
    media: { src: '/projects/spaceship-background.jpg', alt: 'Space background from the Spaceship-War repository', kind: 'repository' },
  },
  { id: 'plastic-simulation', name: 'Plastic Simulation', repoName: 'Plastic-Simulation', tagline: 'A compact browser simulation experiment', description: 'A small JavaScript, HTML, and CSS repository exploring an interactive plastic-themed simulation.', year: 2025, category: ['web', 'experiments'], technologies: ['JavaScript', 'HTML', 'CSS'], github: github('Plastic-Simulation'), featured: false, accent: '#f0ad6c' },
  { id: 'group-b-event-planner', name: 'Event Planner', repoName: 'Group-B---Event-Planner', tagline: 'A file-backed Python event manager', description: 'A Python CLI that creates, lists, updates, and removes dated events with persistent local file storage and tests.', year: 2026, category: ['tools', 'experiments'], technologies: ['Python'], github: github('Group-B---Event-Planner'), featured: false, accent: '#95cfb7' },
  { id: 'login-page', name: 'Login Page', repoName: 'Login-Page', tagline: 'A focused authentication UI exercise', description: 'A standalone login-page implementation built with HTML, CSS, and JavaScript.', year: 2024, category: ['web', 'experiments'], technologies: ['HTML', 'CSS', 'JavaScript'], github: github('Login-Page'), featured: false, accent: '#d0b8ff' },
  { id: 'love-site', name: 'Love Site', repoName: 'love-site', tagline: 'A personal multimedia web experience', description: 'A TypeScript web project built around personal photography, video, music, lyrics, and small interaction sounds.', year: 2025, category: ['web', 'experiments'], technologies: ['TypeScript', 'Vite'], featured: false, accent: '#ff91b8' },
  { id: 'frc-example', name: 'FRC Example', repoName: 'FRC-Example', tagline: 'A WPILib command-based robot reference', description: 'A Java FRC project with Robot, RobotContainer, command, subsystem, Gradle, and WPILib configuration structure.', year: 2025, category: ['tools', 'experiments'], technologies: ['Java', 'WPILib', 'Gradle'], github: github('FRC-Example'), featured: false, accent: '#ffcb64' },
  { id: 'disaster-food-truck-unity', name: 'Disaster Food Truck Unity', repoName: 'DisasterFoodTruck_Unity', tagline: 'A Unity project repository', description: 'A public Unity project repository focused on a disaster food-truck concept; the public API does not expose enough source detail for broader claims.', year: 2025, category: ['game', 'experiments'], technologies: ['Unity'], github: github('DisasterFoodTruck_Unity'), featured: false, accent: '#e8a66d' },
  { id: 'vis-library', name: 'VIS Library', repoName: 'VIS-Library', tagline: 'A school library management system', description: 'A C# and SQL project with account, book, borrowing, report, validation, service, and HTML frontend files.', year: 2025, category: ['fullstack', 'tools'], technologies: ['C#', 'SQL', 'HTML', 'CSS', 'JavaScript'], github: github('VIS-Library'), liveUrl: 'https://vis.tp.edu.tw/', featured: false, accent: '#70b7ff' },
  { id: 'project-zero', name: 'Project Zero', repoName: 'Project-Zero', tagline: 'An early Python experimentation repository', description: 'A public Python repository retained as an early experiment; no project README is available.', year: 2024, category: ['experiments'], technologies: ['Python'], github: github('Project-Zero'), featured: false, accent: '#a8a8b3' },
  { id: 'navigation-menu', name: 'Navigation Menu', repoName: 'Navigation_Menu', tagline: 'An HTML and CSS navigation exercise', description: 'A focused navigation-menu project built with HTML and CSS.', year: 2024, category: ['web', 'experiments'], technologies: ['HTML', 'CSS'], github: github('Navigation_Menu'), featured: false, accent: '#8fb5d2' },
  { id: 'coffee-shop', name: 'Coffee Shop', repoName: 'Coffe-Shop', tagline: 'A coffee-shop website exercise', description: 'A small coffee-shop website built with HTML and CSS.', year: 2024, category: ['web', 'experiments'], technologies: ['HTML', 'CSS'], github: github('Coffe-Shop'), featured: false, accent: '#d2aa7f' },
  { id: 'animated-circular-navigation-menu', name: 'Circular Navigation', repoName: 'Animated-Circular-Navigation-Menu', tagline: 'An animated circular menu experiment', description: 'A focused navigation interaction built with HTML, CSS, and JavaScript.', year: 2024, category: ['web', 'experiments'], technologies: ['HTML', 'CSS', 'JavaScript'], github: github('Animated-Circular-Navigation-Menu'), featured: false, accent: '#c995ff' },
  { id: 'calculator', name: 'Calculator', repoName: 'Calculator', tagline: 'A compact browser calculator', description: 'A standalone calculator built with HTML, CSS, and JavaScript.', year: 2024, category: ['web', 'tools'], technologies: ['HTML', 'CSS', 'JavaScript'], github: github('Calculator'), featured: false, accent: '#72d7d0' },
  { id: 'snake-game', name: 'Snake Game', repoName: 'snake_game', tagline: 'A small Python snake game', description: 'An early public Python game implemented in a single main module.', year: 2024, category: ['game', 'experiments'], technologies: ['Python'], github: github('snake_game'), featured: false, accent: '#8adf78' },
  { id: 'macos-tahoe', name: 'macOS Tahoe', repoName: 'macos-Tahoe', tagline: 'A fork for Apple installer image generation', description: 'A fork that generates bootable macOS installer ISO or DMG images from Apple servers through GitHub Actions.', year: 2026, category: ['tools'], technologies: ['GitHub Actions', 'Shell'], github: github('macos-Tahoe'), featured: false, fork: true, accent: '#b8c0cc' },
  { id: 'bot-automation', name: 'Bot Automation', repoName: 'bot-automation', tagline: 'A forked GitHub Actions check-in bot', description: 'A forked automation repository for scheduled check-ins through GitHub Actions.', year: 2022, category: ['tools', 'experiments'], technologies: ['GitHub Actions'], github: github('bot-automation'), featured: false, fork: true, accent: '#a6adb8' },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const labProjects = projects.filter((project) => project.github && !project.featured && !project.fork && (project.category.includes('experiments') || project.category.includes('game')));
export const archiveProjects = projects.filter((project) => project.github);

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((project) => project.category.includes(category));
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export const allTechnologies = Array.from(new Set(projects.flatMap((project) => project.technologies))).sort();
export const technologyProjects: Record<string, Project[]> = Object.fromEntries(
  allTechnologies.map((technology) => [technology, projects.filter((project) => project.technologies.includes(technology))]),
);
