const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const { HotModuleReplacementPlugin } = require('webpack');

const HtmlConfig = require('../script/html-env');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'index.[chunkhash].js',
  },
  devServer: {
    open: false,
    hot: true,
    host: 'localhost',
  },
  plugins: [
    new WebpackBar({}),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      cache: true,
      inject: true,
      title: HtmlConfig.title,
      favicon: HtmlConfig.icon,
      template: 'static/index.html',
    }),
    new HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: ['/node_modules/'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'json'],
  },
};
