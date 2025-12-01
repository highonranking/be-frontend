import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - Abhinav Dixit | GitHub Repositories & Open Source Work',
  description: 'Browse Abhinav Dixit\'s GitHub projects and open-source contributions. Full-stack applications built with React, Next.js, TypeScript, Node.js, and modern web technologies.',
  keywords: [
    'Abhinav Dixit Projects',
    'GitHub Projects',
    'Open Source Developer',
    'React Projects',
    'Next.js Applications',
    'Full Stack Projects',
  ],
  openGraph: {
    title: 'Projects - Abhinav Dixit | GitHub Repositories',
    description: 'Open-source projects and contributions by Abhinav Dixit',
    url: 'https://www.abhinavdixit.com/projects',
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
