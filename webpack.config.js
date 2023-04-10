const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env = {}) => {
  const { mode = 'development' } = env
  const isDev = mode === 'development'

  const getStyleLoaders = () => [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1
      }
    },
    'sass-loader',
    'postcss-loader'
  ]

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
        filename: 'index.html',
        favicon: path.join(__dirname, 'public', 'favicon.ico')
      })
    ]

    if (!isDev) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: 'style.css'
        })
      )
    }

    return plugins
  }

  return {
    mode,

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.jsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: getStyleLoaders()
        },
        {
          test: /\.(png|jp(e*)g|svg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[ext]'
              }
            }
          ]
        }
      ]
    },

    plugins: getPlugins(),

    devServer: {
      open: true,
      port: 8080,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, './public')
      }
    },

    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        src: path.resolve(__dirname, 'src')
      }
    },

    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },

    devtool: isDev ? 'eval-source-map' : false
  }
}
