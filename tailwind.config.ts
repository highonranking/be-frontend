import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Improved contrast colors
        'neon-green': '#39FF14', // Brighter, more readable green
        'neon-pink': '#FF3EC8',
        'neon-blue': '#1FB6FF', // Brighter blue for better contrast
        'neon-purple': '#A259F7', // Brighter purple
        'terminal-bg': '#181A20', // Slightly lighter for better contrast
        'terminal-text': '#E2FFE2', // Off-white green for better readability
      },
      fontFamily: {
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 10px #00ff00' },
          '50%': { textShadow: '0 0 20px #00ff00, 0 0 30px #00ffff' },
        },
      },
    },
  },
  plugins: [],
}
export default config
