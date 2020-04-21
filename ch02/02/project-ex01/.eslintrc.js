module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    /*
    "indent": [2, 4],
    "semi": [0],
    "keyword-spacing": [0],
    "space-before-function-paren": [0]
    */
 }
}
