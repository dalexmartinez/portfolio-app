/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        'input-bg': 'var(--input-bg)',
        'input-text': 'var(--input-text)',
        'input-placeholder': 'var(--input-placeholder)'
      }
    },
  },
  plugins: [],
}