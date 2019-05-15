const path = require('path');

const APP_DIR = path.resolve('./app/main');
const BUILD_DIR = path.resolve('./dist');

module.exports = {
  mode: 'development',
  target: 'electron-main',
  context: APP_DIR,
  entry: `./index.js`,
  output: {
    path: BUILD_DIR,
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      {
        test: /\.png$/,
        use: 'url-loader'
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  }
};
