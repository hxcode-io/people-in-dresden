module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.vue']
  },
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
