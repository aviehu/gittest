const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const _ = require("lodash/fp");

const APP_DIR = path.resolve(__dirname, './src');
const BUILD_DIR = path.resolve(__dirname, './dist');

const apps = { login: 'login.html', main: 'index.html' };

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  context: APP_DIR,
  entry: _.fromPairs(_.map((app) => [app, `./${app}-client/${process.env.ENTRY || 'index'}.js`], _.keys(apps))),
  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    port: 8000,
    historyApiFallback: {
      verbose: true,
      disableDotRule: true,
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
        test: /\.(gif|png|jpg|wav|ico|eot|svg|ttf|woff|woff2)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
  new CopyPlugin([{ from: "public", to: "." }]),
  ..._.map((app) =>
    new HtmlWebpackPlugin({
      filename: apps[app],
      inject: true,
      template: `${APP_DIR}/${app}-client/index.html`,
      chunks: [app]
    }), _.keys(apps))]
};
