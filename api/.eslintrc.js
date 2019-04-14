module.exports = {
  extends: [
    "airbnb-base",
    "prettier",
  ],
  plugins: ["prettier"],
  parserOptions: {
    sourceType: "module"
  },
  env: {
    node: true,
    jest: true
  },
  rules: {
    complexity: ["error", 6],
    "max-depth": ["error", { max: 2 }],
    "max-lines": ["error", 120],
    "max-nested-callbacks": ["error", 2],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-use-before-define": 0, // override airbnb
    "prettier/prettier": "error"
  }
};
