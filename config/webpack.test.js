const devConfig = require('./webpack.dev')
const webpack = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


module.exports = Object.assign({}, devConfig, {
  plugins: devConfig.plugins.concat([
    // new BundleAnalyzerPlugin()
  ]),
  devServer:{
    proxy: {
      '/tpm': {
        target: 'http://10.128.106.97:18090/'
      }
    },
    noInfo:false,
    port:3000,
    host:'0.0.0.0',
    stats:{
      chunks:false,
      assets:true,
      source:false,
      reasons:false,
      modules:false
    }
  }
})
