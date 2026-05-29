/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          blue: '#0052FF',
          dark: '#0A0A0A',
          card: '#111111',
          border: '#1F1F1F',
          muted: '#3A3A3A',
          text: '#E8E8E8',
          sub: '#888888',
        }
      }
    },
  },
  plugins: [],
}
