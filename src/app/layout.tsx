import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Abhinav Dixit - Software Developer | Frontend Engineer | React & Next.js Expert',
  description: 'Abhinav Dixit is a Software Development Engineer specializing in Frontend Development with 3+ years of experience in React, Next.js, TypeScript, and System Design. Previously at Yatra, StampMy Visa, and CRED.',
  keywords: [
    'Abhinav Dixit',
    'abhinavdixit',
    'Software Developer',
    'Frontend Developer',
    'Software Engineer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'JavaScript Developer',
    'Full Stack Developer',
    'Frontend Engineer',
    'Web Developer',
    'UI Developer',
    'Software Development Engineer',
    'SDE',
    'React Expert',
    'Next.js Expert',
    'Frontend System Design',
    'Web Application Developer',
    'Yatra Developer',
    'CRED Developer',
    'StampMy Visa',
    'KIET Ghaziabad',
    'CodeChef 5 star',
    'LeetCode',
    'Competitive Programmer',
  ],
  authors: [{ name: 'Abhinav Dixit' }],
  creator: 'Abhinav Dixit',
  publisher: 'Abhinav Dixit',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.abhinavdixit.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Abhinav Dixit - Software Developer | Frontend Engineer',
    description: 'Software Development Engineer specializing in Frontend Development with React, Next.js, TypeScript. 3+ years experience at Yatra, CRED, StampMy Visa.',
    url: 'https://www.abhinavdixit.com',
    siteName: 'Abhinav Dixit Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Abhinav Dixit - Software Developer & Frontend Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhinav Dixit - Software Developer | Frontend Engineer',
    description: 'Software Development Engineer specializing in Frontend Development with React, Next.js, TypeScript',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.abhinavdixit.com" />
        <meta name="author" content="Abhinav Dixit" />
        <meta name="copyright" content="Abhinav Dixit" />
        <meta property="og:locale" content="en_US" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Abhinav Dixit',
              alternateName: 'abhinavdixit',
              url: 'https://www.abhinavdixit.com',
              image: 'https://www.abhinavdixit.com/profile.jpg',
              sameAs: [
                'https://github.com/highonranking',
                'https://www.linkedin.com/in/highonranking/',
                'https://leetcode.com/u/highonranking/',
                'https://www.codechef.com/users/abhinav230601',
              ],
              jobTitle: 'Software Development Engineer',
              worksFor: {
                '@type': 'Organization',
                name: 'Yatra Online',
              },
              alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'KIET Group Of Institutions',
              },
              knowsAbout: [
                'React',
                'Next.js',
                'TypeScript',
                'JavaScript',
                'Frontend Development',
                'Software Engineering',
                'System Design',
                'Web Development',
              ],
              description:
                'Software Development Engineer specializing in Frontend Development with 3+ years of experience in React, Next.js, TypeScript, and System Design.',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Abhinav Dixit - Software Developer Portfolio',
              url: 'https://www.abhinavdixit.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://www.abhinavdixit.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfilePage',
              mainEntity: {
                '@type': 'Person',
                name: 'Abhinav Dixit',
                alternateName: 'abhinavdixit',
                jobTitle: 'Software Development Engineer',
                description:
                  'Experienced Software Developer and Frontend Engineer specializing in React, Next.js, and TypeScript',
              },
            }),
          }}
        />
      </head>
      <body className="bg-terminal-bg text-terminal-text font-mono">
        {children}
      </body>
    </html>
  )
}
