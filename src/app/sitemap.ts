import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    ...projects.map((project) => ({ url: `${base}/projects/${project.id}`, lastModified: new Date(`${project.year}-01-01`), changeFrequency: 'monthly' as const, priority: project.featured ? 0.8 : 0.6 })),
  ];
}
