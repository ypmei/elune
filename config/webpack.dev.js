const path = require('path')
const baseConfig = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = Object.assign({}, baseConfig, {
  entry:Object.assign({}, baseConfig.entry, {
    'app':[
      path.join(process.cwd(), 'app', 'polyfill.js'),
      path.join(process.cwd(), 'app', 'index.js')
    ]
  }),
  output: Object.assign({}, baseConfig.output, {
  }),
  plugins: baseConfig.plugins.concat([
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(process.cwd(), 'app', 'index.html'),
      favicon: path.join(process.cwd(), 'app', 'static', 'images', 'favicon.ico'),
      chunks:['vendor', 'app']
    })
  ]),
  devServer: Object.assign({}, baseConfig.devServer, {
    setup: require('../swagger/app')
  })
})
