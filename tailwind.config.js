/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      placeSelfFlexEnd: {
        'flex-end': 'place-self: flex-end',
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        }
      },
      animation: {
        'fade-out': 'fadeOut 1s ease-in-out 3s forwards',
      }
    },
  },
  plugins: [],
}

