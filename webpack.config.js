const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const getFileName = ext =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const getStyleLoaders = () => [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
    },
  },
  'sass-loader',
  'postcss-loader',
]

const getPlugins = () => {
  const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, 'public/favicon.ico'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd,
      },
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new ESLintPlugin({ fix: true }),
    new Dotenv(),
  ]

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: getFileName('css'),
      })
    )
  }

  return plugins
}

const getOptimization = () => {
  const config = {
    minimize: isProd,
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'all',
          minSize: 0,
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
        },
      },
      chunks: 'all',
    },
  }

  if (isProd) {
    config.minimizer = ['...', new CssMinimizerPlugin()]
  }

  return config
}

module.exports = {
  devServer: {
    historyApiFallback: true,
    open: true,
    port: 8080,
    static: {
      directory: path.resolve(__dirname, './public'),
    },
  },

  devtool: isDev ? 'source-map' : false,

  mode: isDev ? 'development' : 'production',

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },

  optimization: getOptimization(),

  output: {
    assetModuleFilename: 'images/[name][ext]',
    chunkFilename: getFileName('js'),
    filename: getFileName('js'),
    path: path.resolve(__dirname, 'dist'),
  },

  performance: {
    hints: false,
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },

  plugins: getPlugins(),

  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
}
