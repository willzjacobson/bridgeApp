module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/forbid-prop-types': [0],
    'react/require-default-props': [0],
    'global-require': [0],
    'no-console': [0],
    'arrow-parens': [0],
    'function-paren-newline': [0],
    camelcase: [0],
    'object-curly-newline': [0],
    'no-nested-ternary': [0],
  },
};
