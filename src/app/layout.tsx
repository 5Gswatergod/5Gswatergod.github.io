import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'HungYuan Lo — Creative Developer & AI Engineer',
    template: '%s — HungYuan Lo',
  },
  description:
    'Creative developer building AI tools, real-time systems, web applications and interactive digital experiences.',
  keywords: [
    'creative developer',
    'AI engineer',
    'full-stack developer',
    'TypeScript',
    'React',
    'Node.js',
    'WebGL',
    'interactive systems',
  ],
  authors: [{ name: 'HungYuan Lo' }],
  creator: 'HungYuan Lo',
  publisher: 'HungYuan Lo',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'HungYuan Lo — Creative Developer & AI Engineer',
    description:
      'Creative developer building AI tools, real-time systems, web applications and interactive digital experiences.',
    siteName: 'HungYuan Lo Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HungYuan Lo — Creative Developer & AI Engineer',
    description:
      'Creative developer building AI tools, real-time systems, web applications and interactive digital experiences.',
  },
  alternates: { canonical: '/' },
  manifest: '/manifest.json',
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#111617',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-bg text-fg antialiased">
        {children}
      </body>
    </html>
  );
}
