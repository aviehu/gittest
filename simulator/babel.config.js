const pkg = require('./package.json');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          electron: pkg.dependencies.electron
        },
        modules: false,
        loose: true
      }
    ],
    '@babel/preset-react'
  ]
};
