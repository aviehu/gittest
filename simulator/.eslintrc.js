module.exports = {
  extends: ["airbnb", "prettier", "plugin:react/recommended"],
  plugins: ["prettier"],
  parserOptions: {
    sourceType: "module"
  },
  env: {
    es6: true,
    jest: true,
    browser: true
  },
  rules: {
    complexity: ["error", 6],
    "unicorn/filename-case": 0,
    "max-depth": ["error", { max: 2 }],
    "max-lines": ["error", 120],
    "max-nested-callbacks": ["error", 2],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-use-before-define": 0, // override airbnb
    "prettier/prettier": "error",
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-filename-extension": 0,
    "react/prop-types": 0
  }
};
