import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0D1B3E',
        'navy-dark': '#080f20',
        blue: '#2A6DD9',
        orange: '#E86518',
        coral: '#C5603A',
        cream: '#F0E8CE',
      },
      fontFamily: {
        display: ['"Pirata One"', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
