/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-out': 'fade-out 1.5s forwards',
      },
      keyframes: {
        'fade-out': {
          '0%': {
            opacity: '1',
            transform: 'scale(1) translate(var(--tw-translate-x), var(--tw-translate-y))',
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0.5) translate(var(--tw-translate-x), calc(var(--tw-translate-y) + 30px))',
          },
        },
      },
    },
  },
  plugins: [],
}