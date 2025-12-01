import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio - Abhinav Dixit | Software Development Projects & Experience',
  description: 'Explore Abhinav Dixit\'s portfolio showcasing software development projects, frontend engineering work, React applications, and professional experience at Yatra, CRED, and StampMy Visa.',
  keywords: [
    'Abhinav Dixit Portfolio',
    'Software Developer Portfolio',
    'Frontend Developer Projects',
    'React Projects',
    'Next.js Projects',
    'Web Development Portfolio',
  ],
  openGraph: {
    title: 'Portfolio - Abhinav Dixit | Software Developer',
    description: 'View professional projects and experience in Frontend Development',
    url: 'https://www.abhinavdixit.com/portfolio',
  },
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
