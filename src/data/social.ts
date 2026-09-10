export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: 'github';
  description: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/5Gswatergod',
    icon: 'github',
    description: 'Verified public profile and source repositories',
  },
];

export const siteConfig = {
  name: 'HungYuan Lo',
  handle: '5Gswatergod',
  title: 'Creative Developer · AI Engineer · Full-Stack Builder',
  description: 'Creative developer building local AI tools, real-time systems, applications, and interactive digital experiences.',
  github: 'https://github.com/5Gswatergod',
  status: 'PUBLIC BUILD LOG ONLINE',
};

export const navItems = [
  { id: 'work', label: 'WORK', href: '#work' },
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'lab', label: 'LAB', href: '#lab' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
];

export const sections = [
  { id: 'hero', label: '01 / INTRO', index: 1 },
  { id: 'about', label: '02 / ABOUT', index: 2 },
  { id: 'work', label: '03 / WORK', index: 3 },
  { id: 'lab', label: '04 / LAB', index: 4 },
  { id: 'skills', label: '05 / STACK', index: 5 },
  { id: 'github', label: '06 / GITHUB', index: 6 },
  { id: 'contact', label: '07 / CONTACT', index: 7 },
];
