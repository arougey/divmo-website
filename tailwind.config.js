/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#000000', // black background
        surface: '#082f49', // sky-950 for cards/nav/footer
        'text-primary': '#ffffff', // white text
        'text-secondary': '#757575', // gray-600 for muted text
        fuchsia: {
          800: '#86198f',
          light: '#c026d3', // hover
          dark: '#701a75',  // for border
        },
        brand: {
          light: '#c026d3',
          DEFAULT: '#86198f',
          dark: '#701a75',
        },
      },
    },
  },
  plugins: [],
};