import { Navigation } from '@/components/navigation/Navigation';
import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
import { Projects } from '@/components/projects/Projects';
import { Lab } from '@/components/projects/Lab';
import { Skills } from '@/components/skills/Skills';
import { GitHubSection } from '@/components/github/GitHubSection';
import { Contact } from '@/components/contact/Contact';
import { Terminal } from '@/components/ui/Terminal';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { ExperienceLayer } from '@/components/ui/ExperienceLayer';
import { getGitHubData } from '@/lib/github';
import { archiveProjects, featuredProjects } from '@/data/projects';

export const dynamic = 'force-static';

export default async function Home() {
  const githubData = await getGitHubData();
  const recentWork = githubData.recentRepos.flatMap((repo) => {
    const project = archiveProjects.find((entry) => entry.repoName === repo.name);
    return project ? [{ id: project.id, name: project.name, tagline: project.tagline }] : [];
  }).slice(0, 3);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'HungYuan Lo',
      url: 'https://github.com/5Gswatergod',
      sameAs: ['https://github.com/5Gswatergod'],
      knowsAbout: ['Artificial intelligence', 'Full-stack development', 'Real-time systems', 'Interactive applications'],
    },
    hasPart: featuredProjects.map((project) => ({ '@type': 'CreativeWork', name: project.name, description: project.description, url: project.github })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <ExperienceLayer />
      <CommandPalette />
      <Terminal />
      <Navigation />
      <main id="main-content" tabIndex={-1} className="relative z-10 min-h-screen">
        <Hero recentWork={recentWork} />
        <About />
        <Projects />
        <Lab />
        <Skills />
        <GitHubSection data={githubData} />
        <Contact />
      </main>
    </>
  );
}
