const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin' );

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './main.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'images/[hash].[ext]'
  },
  plugins: [
    new HtmlWebpackPlugin({template: './index.html' }),
    new CleanWebpackPlugin ()
  ],
  module: {
    rules: [
      {test: /\.css$/, use: ['style-loader','css-loader']}, 
      {
        test: /\.(png| jpe?g|svg|gif|webp)$/, 
        type: 'asset/resource', 
        generator: {
          filename: 'images/[hash].[ext]',
        },
      }
    ]
  }
};
