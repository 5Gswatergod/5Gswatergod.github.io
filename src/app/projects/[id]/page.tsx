import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectById, projects } from '@/data/projects';
import { ProjectCaseStudy } from './ProjectCaseStudy';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectById(resolvedParams.id);
  
  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: `${project.name} — HungYuan Lo`,
      description: project.description,
      type: 'website',
      images: project.media ? [{ url: project.media.src, alt: project.media.alt }] : undefined,
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export default async function ProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = getProjectById(resolvedParams.id);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudy project={project} />;
}
