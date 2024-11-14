/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#009CBD',
          dark: '#00738A',
        },
        accent: '#FFD100',
        gray: {
          custom: '#E6E7EB',
        },
      },
      borderColor: {
        DEFAULT: '#009CBD',
      },
      ringColor: {
        DEFAULT: '#009CBD',
      },
      ringOffsetColor: {
        DEFAULT: '#009CBD',
      },
    },
  },
  plugins: [],
};