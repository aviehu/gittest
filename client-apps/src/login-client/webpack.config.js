const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_DIR = path.resolve(__dirname, './src');
const BUILD_DIR = path.resolve('./dist');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  context: APP_DIR,
  entry: `./${process.env.ENTRY || 'index'}.jsx`,
  output: {
    path: BUILD_DIR,
    filename: 'login.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    port: 8000,
    historyApiFallback: {
      verbose: true,
      disableDotRule: true,
      rewrites: [{ from: /login\.js$/, to: '/login.js' }, { from: /login\.js.map$/, to: '/login.js.map' }]
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
        test: /\.(gif|png|wav|ico|eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: `${APP_DIR}/index.html`
    })
  ]
};
