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
        'neon-green': '#00ff00',
        'neon-pink': '#ff00ff',
        'neon-blue': '#00ffff',
        'neon-purple': '#8b00ff',
        'terminal-bg': '#0a0e27',
        'terminal-text': '#0eff00',
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
