const devConfig = require('./webpack.dev')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = Object.assign({}, devConfig, {
  output: Object.assign({}, devConfig.output, {
    filename: 'scripts/[name]-[chunkhash].js',
    chunkFilename: 'scripts/[name]-[chunkhash].js'
  }),
  plugins:devConfig.plugins.filter((p) => {
    return p.constructor !== ExtractTextPlugin && p.constructor !== webpack.DefinePlugin
  }).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap:false,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.DefinePlugin({
      YPMEI_TITLE: JSON.stringify('monitor')
    }),
    new ExtractTextPlugin('styles/[name]-[chunkhash].css')
  ])
})
