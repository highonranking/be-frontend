import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tech Portfolio',
  description: 'A techy, interactive portfolio platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-terminal-bg text-terminal-text font-mono">
        {children}
      </body>
    </html>
  )
}
