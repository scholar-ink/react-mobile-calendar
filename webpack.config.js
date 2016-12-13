'use strict';
const Path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  
  entry: [
    `webpack-dev-server/client?http://localhost:3030`,
    'webpack/hot/dev-server',
    Path.join(__dirname, './index'),
  ],
  output: {
    path: Path.join(__dirname, './dist'),
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.less$/,
        loader:  'style-loader!css-loader!autoprefixer-loader!less-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader'
      },
      {
        test: /\.png$/,
        loader: 'url?mimetype=image/png'
      }
    ]
  },
  externals: {
    // 'react': 'React'
  },
  resolve: {
    // Allow to omit extensions when requiring these files
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: Path.join(__dirname, './index.html'),
      chunksSortMode: 'none'
    })
  ],
  devServer: {
    contentBase: Path.join(__dirname, './'),
    port: 3030,
    host: '0.0.0.0',
    inline: true,
    progress: true,
    historyApiFallback: true,
  }
};
