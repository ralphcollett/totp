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
        'totp-orange': '#FF8800',
        'totp-blue': '#1155AA',
        'totp-yellow': '#EEFF00',
        'totp-cyan': '#00AAEE',
        'totp-bg': '#EFEFEB',
      },
    },
  },
  plugins: [],
}

