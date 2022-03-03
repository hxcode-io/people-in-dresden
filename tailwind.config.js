module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
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
  plugins: [],
}


// const defaultTheme = require('tailwindcss/defaultTheme')
//
// module.exports = {
//   purge: {
//     enabled: true,
//     content: ['./src/**/*.vue']
//   },
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {
//       fontFamily: {
//         'marc': ['MarcellusSC']
//       },
//       colors: {
//         'dd': '#FDC400',
//         'ddc': '#0039FD'
//       }
//     },
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }
