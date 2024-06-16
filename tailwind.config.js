const { default: constants } = require('./src/data/constants');

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: constants.THEME_COLOR_PRIMARY,
        secondary: constants.THEME_COLOR_SECONDARY,
      },
      backgroundImage: {
        'card-body-gradient': "linear-gradient(0deg, rgb(0 0 0) 0%, rgb(1 1 1 / 0%) 90%)",
        'header-gradient': "linear-gradient(0deg, rgb(255 255 255 / 0%) 0%, rgb(1 1 1) 150%)",
      },
    },
  },
  plugins: [require('daisyui'),],
}

