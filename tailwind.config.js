/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './styles/**/*.{css,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Kade', 'system-ui', 'sans-serif'],
        'kade': ['Kade', 'sans-serif'],
      },
      colors: {
        'pe-bg': '#FBFFEE',
        'pe-text-dark': '#732621',
        'pe-accent': '#DB633E',
        'pe-accent-yellow': '#FFF796',
        'pe-accent-blue': '#3D5EA6',
        'pe-black': '#000000',
        'pe-text-muted': '#C4C4C4',
      },
    },
  },
  plugins: [],
};
