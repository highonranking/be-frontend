export default function manifest() {
  return {
    name: 'Abhinav Dixit - Software Developer Portfolio',
    short_name: 'Abhinav Dixit',
    description: 'Software Development Engineer specializing in Frontend Development with React, Next.js, and TypeScript',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0e27',
    theme_color: '#00ff9f',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
