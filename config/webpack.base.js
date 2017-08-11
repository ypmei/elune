const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const I18nPlugin = require("i18n-webpack-plugin")

const lanuages = {
  'cn':null,
  'en':null
}

module.exports = {
  entry:{
    'vendor': [
      'babel-polyfill',
      'whatwg-fetch',
      'react',
      'react-dom',
      'react-router',
      'flux',
      'history',
      'lodash',
      'jquery',
      'moment',
      'highcharts',
      'classnames',
      'cookie',
      'normalize.css'
    ]
  },
  output: {
    publicPath: '',
    path: path.join(process.cwd(), 'dist'),
    libraryTarget: 'umd',
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[name].js'
  },
  plugins:[
    new webpack.ProvidePlugin({
      YPMEI: path.join(process.cwd(), 'app', 'predefine.js')
    }),
    new webpack.DefinePlugin({
      YPMEI_URL_PREFIX: JSON.stringify('api')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new I18nPlugin(lanuages['cn']),
    new ExtractTextPlugin('styles/[name].css')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,//文件名正则，如果以‘.js’结尾则使用该loader
        exclude:[/node_modules/],//不检测node_modules下的文件
        loader: 'babel-loader'//使用babel加载器
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader', {
          publicPath: '../'
        })
      },
      {
        test: /\.ico$/,
        loader: 'file',
        query : {
          context:'app/',
          publicPath: '',
          name:'[path][name].[ext]'
        }
      },
      {
        test   : /\.(woff|woff2|svg|eot|ttf|png|jpg|swf|jpeg)(\?t=[0-9]+)?$/,
        loader : 'file',
        query : {
          context:'app/',
          publicPath: '',
          name:'static/[path][name]-[hash].[ext]'
        }
      }
    ]
  },
  postcss:(webpack) => {
    return [
      require('postcss-import')({
        addDependencyTo: webpack
      }),
      require('precss'),
      require('autoprefixer'),
      require('cssnano')({
        zindex: false
      })
    ]
  },
  devServer:{
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
}
