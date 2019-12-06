const R = require(`ramda`)
const CopyPlugin = require(`copy-webpack-plugin`)
const HtmlWebPackPlugin = require(`html-webpack-plugin`)
const ErrorOverlayPlugin = require(`error-overlay-webpack-plugin`)
const path = require(`path`)

const rootPath = dir => path.resolve(__dirname, dir)

const common = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: `babel-loader`,
    }],
  },
  output: {
    filename: `[hash].js`,
    publicPath: `/amos-pwa/`,
    path: rootPath (`build`),
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: rootPath(`public/index.html`)
    }),
    new CopyPlugin([{
      from: rootPath(`public`)
    }]),
  ],
}

const develop = {
  mode: `development`,
  devtool: `cheap-module-source-map`,
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new ErrorOverlayPlugin(),
  ],
}

const production = {
  mode: `production`
}

const makeConfigs = R.mergeDeepWith (R.concat, common)

console.log (`Running webpack with process.env.NODE_ENV ${process.env.NODE_ENV}.`)

const config = (
  process.env.NODE_ENV === `production`
    ? makeConfigs(production)
    : makeConfigs(develop)
)

module.exports = config