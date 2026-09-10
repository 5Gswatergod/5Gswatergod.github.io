import { projects } from './projects';

export type SkillCategory = 'languages' | 'frameworks' | 'ai' | 'database' | 'infrastructure' | 'creative';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  projects: string[];
}

type SkillDefinition = Omit<Skill, 'projects'> & { match: string[] };

const definitions: SkillDefinition[] = [
  { id: 'typescript', name: 'TypeScript', category: 'languages', description: 'Typed application, tool, game, and monorepo code.', match: ['TypeScript'] },
  { id: 'python', name: 'Python', category: 'languages', description: 'Local AI, data pipelines, computer vision, utilities, and games.', match: ['Python'] },
  { id: 'javascript', name: 'JavaScript', category: 'languages', description: 'Web experiments and interactive research presentations.', match: ['JavaScript'] },
  { id: 'swift', name: 'Swift', category: 'languages', description: 'Native Apple application development.', match: ['Swift'] },
  { id: 'java', name: 'Java', category: 'languages', description: 'WPILib robotics structure and command-based code.', match: ['Java'] },
  { id: 'csharp', name: 'C#', category: 'languages', description: 'Library-management services and models.', match: ['C#'] },
  { id: 'react', name: 'React', category: 'frameworks', description: 'Interfaces across games, dashboards, utilities, and research sites.', match: ['React'] },
  { id: 'nextjs', name: 'Next.js', category: 'frameworks', description: 'Dashboard and portfolio application routing.', match: ['Next.js'] },
  { id: 'react-native', name: 'React Native', category: 'frameworks', description: 'Cross-platform mobile application UI.', match: ['React Native'] },
  { id: 'expo', name: 'Expo', category: 'frameworks', description: 'Mobile routing, device APIs, and build configuration.', match: ['Expo', 'Expo Router'] },
  { id: 'fastify', name: 'Fastify', category: 'frameworks', description: 'Typed HTTP services for real-time applications.', match: ['Fastify'] },
  { id: 'socketio', name: 'Socket.IO', category: 'frameworks', description: 'Bidirectional game transport and shared event contracts.', match: ['Socket.IO'] },
  { id: 'electron', name: 'Electron', category: 'frameworks', description: 'Windows-first desktop tooling with a React renderer.', match: ['Electron'] },
  { id: 'ollama', name: 'Ollama', category: 'ai', description: 'Local model lifecycle, import, quantization, and measurement.', match: ['Ollama API'] },
  { id: 'pytorch', name: 'PyTorch', category: 'ai', description: 'Decoder-only language-model training workflows.', match: ['PyTorch'] },
  { id: 'sentencepiece', name: 'SentencePiece', category: 'ai', description: 'Tokenizer training for Chinese and mixed-language corpora.', match: ['SentencePiece'] },
  { id: 'computer-vision', name: 'Computer Vision', category: 'ai', description: 'OCR, camera, image preprocessing, and bounding-box experiments.', match: ['Computer Vision', 'PaddleOCR'] },
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', description: 'Relational persistence in the Mahjong and Hydrava backends.', match: ['PostgreSQL'] },
  { id: 'redis', name: 'Redis', category: 'database', description: 'Cooldowns, workers, and cache-backed community modules.', match: ['Redis'] },
  { id: 'prisma', name: 'Prisma', category: 'database', description: 'Guild-scoped schema and database access in Hydrava.', match: ['Prisma'] },
  { id: 'sqlite', name: 'SQLite', category: 'database', description: 'Device-local ledger persistence.', match: ['SQLite'] },
  { id: 'core-data', name: 'Core Data', category: 'database', description: 'Native ledger persistence in SmartFlow.', match: ['Core Data'] },
  { id: 'docker', name: 'Docker', category: 'infrastructure', description: 'Single-image game deployment and multi-service self-hosting.', match: ['Docker'] },
  { id: 'github-actions', name: 'GitHub Actions', category: 'infrastructure', description: 'Checks, packaging, image publishing, and static deployment.', match: ['GitHub Actions'] },
  { id: 'caddy', name: 'Caddy', category: 'infrastructure', description: 'Automatic HTTPS for Hydrava production deployment.', match: ['Caddy'] },
  { id: 'cloudkit', name: 'CloudKit', category: 'infrastructure', description: 'Optional native sync path, with simulated mode kept explicit.', match: ['CloudKit'] },
  { id: 'threejs', name: 'Three.js / R3F', category: 'creative', description: 'Interactive 3D scenes for environmental storytelling.', match: ['Three.js', 'React Three Fiber'] },
  { id: 'gsap', name: 'GSAP', category: 'creative', description: 'Scroll and interface motion across interactive web work.', match: ['GSAP'] },
  { id: 'phaser', name: 'Phaser', category: 'creative', description: 'Browser game loop, pointer controls, bots, and collisions.', match: ['Phaser'] },
  { id: 'pygame', name: 'Pygame', category: 'creative', description: 'Sprite, audio, collision, and arcade-loop experimentation.', match: ['Pygame'] },
];

export const skills: Skill[] = definitions.map(({ match, ...skill }) => ({
  ...skill,
  projects: projects.filter((project) => project.technologies.some((technology) => match.includes(technology))).map((project) => project.id),
}));

export const skillCategories: { id: SkillCategory; label: string; description: string }[] = [
  { id: 'languages', label: 'LANGUAGES', description: 'Languages visible across public repositories' },
  { id: 'frameworks', label: 'FRAMEWORKS', description: 'Application and interface foundations' },
  { id: 'ai', label: 'AI / ML', description: 'Local models, training, and vision' },
  { id: 'database', label: 'DATA', description: 'Persistent and cache-backed systems' },
  { id: 'infrastructure', label: 'INFRASTRUCTURE', description: 'Packaging, deployment, and self-hosting' },
  { id: 'creative', label: 'INTERACTION', description: 'Motion, 3D, and game runtimes' },
];

export function getProjectsForSkill(skillId: string): string[] {
  return skills.find((skill) => skill.id === skillId)?.projects ?? [];
}
