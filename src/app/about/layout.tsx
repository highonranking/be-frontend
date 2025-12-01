import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Abhinav Dixit - Software Developer & Frontend Engineer | React Expert',
  description: 'Learn about Abhinav Dixit, a Software Development Engineer with 3+ years of experience in Frontend Development. Expert in React, Next.js, TypeScript, and System Design. Previously worked at Yatra, CRED, and StampMy Visa.',
  keywords: [
    'About Abhinav Dixit',
    'Abhinav Dixit Bio',
    'Software Developer Abhinav Dixit',
    'Frontend Developer',
    'React Developer',
    'Software Engineer',
    'Yatra Developer',
    'CRED Engineer',
  ],
  openGraph: {
    title: 'About Abhinav Dixit - Software Developer & Frontend Engineer',
    description: 'Software Development Engineer specializing in Frontend Development with React, Next.js, TypeScript',
    url: 'https://www.abhinavdixit.com/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
