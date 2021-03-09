module.exports = {
  root: true,
  env: {
    node: true,
    jquery:true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'camelcase': [0, {properties: 'always'}],
    'semi': ["error", "always"],
    'generator-star-spacing':'off',
    'space-before-function-paren': 0,
    "quotes": [1, "single"], //引号类型 `` "" ''
     "no-console":"off",
     'indent': 'off',
     "extends": "eslint:recommended"
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
