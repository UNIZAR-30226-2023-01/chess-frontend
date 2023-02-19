const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'details': 'rgba(197,243,255,0.65)',
        'colors': {
          orange: colors.orange,
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
