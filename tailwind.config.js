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
        'totp-orange': '#F6A22D',
        'totp-blue': '#00ABE7',
        'totp-yellow': '#FFD700',
        'totp-cyan': '#00ABE7',
        'totp-bg': '#EFEFEB',
      },
    },
  },
  plugins: [],
}

