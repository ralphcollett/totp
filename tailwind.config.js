/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        retro: ['"Press Start 2P"', 'monospace'],
        chart: ['"Bebas Neue"', 'sans-serif'],
      },
      colors: {
        'chart-gold': '#FFD700',
        'chart-silver': '#C0C0C0',
        'chart-bronze': '#CD7F32',
        'chart-bg': '#1a0a2e',
        'chart-card': '#2d1b69',
      },
    },
  },
  plugins: [],
}

