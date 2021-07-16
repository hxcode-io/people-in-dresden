const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'marc': ['MarcellusSC']
      },
      colors: {
        'dd': '#FDC400',
        'ddc': '#0039FD'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
