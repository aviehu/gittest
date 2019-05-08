module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    // 'prettier/unicorn',
    // 'plugin:unicorn/recommended'
  ],
  plugins: ['prettier', 'import', 'react-hooks'],
  rules: {
    'jsx-a11y/href-no-hash': ['off'],
    indent: ['error', 2, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'no-underscore-dangle': ['off'],
    'max-len': ['error', { code: 128 }],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-indent': [2, 2],
    'class-methods-use-this': ['off'],
    'react/prop-types': ['off'],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-filename-extension': 0,
    'complexity': ['error', 6],
    'max-depth': ['error', { max: 2 }],
    // 'max-lines': ['error', 120],
    'max-nested-callbacks': ['error', 2],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-use-before-define': 0, // override airbnb
    'prettier/prettier': 'error',
    'import/no-commonjs': ['error'],
    'prefer-arrow-callback': ['error'],
    'react-hooks/rules-of-hooks': ['error'],
    'react-hooks/exhaustive-deps': ['warn']
  },
};
