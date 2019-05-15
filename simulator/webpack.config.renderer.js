const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_DIR = path.resolve('./app/renderer');
const BUILD_DIR = path.resolve('./dist');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'electron-renderer',
  context: APP_DIR,
  entry: `./index.js`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    port: 8000,
    historyApiFallback: {
      verbose: true,
      disableDotRule: true,
      rewrites: [{ from: /bundle\.js$/, to: '/bundle.js' }, { from: /bundle\.js.map$/, to: '/bundle.js.map' }]
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /.*\.css/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|png|wav|ico|eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${APP_DIR}/index.html`
    })
  ]
};
