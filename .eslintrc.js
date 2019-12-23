module.exports = {
  root: true,
  // extends: '@react-native-community',
  extends: 'eslint:recommended',
  rules: {
    'semi': 0,
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single'],
    'no-unused-vars': 0
  },
  plugins: ['react'],
  'parserOptions': {
    'ecmaVersion': 7,
    'sourceType': 'module',
    'ecmaFeatures': {
        'jsx': true,
    }
  }
};
