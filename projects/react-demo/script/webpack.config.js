const cpus = require('os').cpus();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const { HotModuleReplacementPlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const HtmlConfig = require('../script/html-env');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'js/index.[chunkhash].js',
    publicPath: '/',
  },
  devServer: {
    open: false,
    hot: true,
    host: 'localhost',
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 40000,
      cacheGroups: {
        react: {
          chunks: 'all',
          name: `react`,
          test: /[\\/]react[\\/]/,
          priority: 0,
          maxSize: 40000,
        },
        default: {
          maxSize: 40000,
          chunks: 'all',
          name: 'common',
          priority: -1,
        },
      },
    },
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
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        configFile: 'tsconfig.json',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(xml)$/,
        loader: path.resolve(__dirname, './string.js'),
      },
      {
        test: /\.(tsx?|js)$/,
        exclude: ['/node_modules/'],
        use: [
          {
            loader: 'cache-loader',
          },
          {
            loader: 'thread-loader',
            options: {
              workers: cpus - 1,
            },
          },
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              extends: path.resolve(__dirname, '.babelrc'),
            },
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
              projectReferences: true,
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]__[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]__[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
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
