module.exports = {
  important: true,
  purge: ['./src/components/**/*.tsx', './src/pages/**/*.tsx'],
  theme: {
    extend: {
      inset: {
        '1/2': '50%'
      },
      lineHeight: {
        'semi-loose': '1.8'
      }
    }
  },
  variants: {},
  plugins: []
};
