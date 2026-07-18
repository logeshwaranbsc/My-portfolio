/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bgDark: '#07070c',
        bgDarker: '#030305',
        cardDark: 'rgba(18, 18, 29, 0.7)',
        accent: {
          DEFAULT: '#8B5CF6', // Electric Violet
          light: '#A78BFA',
          dark: '#7C3AED',
          lime: '#A3E635', // Electric Lime for highlights
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
