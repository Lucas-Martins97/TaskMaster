/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brandBlue: '#3206F1',
        brandPurple: '#8A0FE9',
        bgBlack: '#212121',
      },
    },
  },
  plugins: [],
};
