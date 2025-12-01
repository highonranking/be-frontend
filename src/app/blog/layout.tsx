import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Abhinav Dixit | Frontend Development & Software Engineering Articles',
  description: 'Read technical articles by Abhinav Dixit on Frontend Development, React, Next.js, System Design, and Software Engineering best practices.',
  keywords: [
    'Abhinav Dixit Blog',
    'Frontend Development Blog',
    'React Articles',
    'Next.js Tutorials',
    'Software Engineering Blog',
    'System Design Articles',
  ],
  openGraph: {
    title: 'Blog - Abhinav Dixit | Frontend Development Articles',
    description: 'Technical articles on Frontend Development and Software Engineering',
    url: 'https://www.abhinavdixit.com/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
