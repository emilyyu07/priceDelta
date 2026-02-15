/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E0F7FA', // light blue (primary background)
          200: '#B2EBF2',
          300: '#80DEEA',
          400: '#4DD0E1',
          500: '#26C6DA', // vibrant light blue (primary elements)
          600: '#00BCD4',
          700: '#00ACC1',
          800: '#0097A7',
          900: '#00838F',
        },
        accent: {
          100: '#E1F5FE', // light blue (accents)
          200: '#B3E5FC',
          300: '#81D4FA',
          400: '#4FC3F7',
          500: '#29B6F6',
          600: '#03A9F4',
          700: '#039BE5',
          800: '#0288D1',
          900: '#01579B',
        },
        background: '#E0F7FA', // default background 
      },
    },
  },
  plugins: [],
}