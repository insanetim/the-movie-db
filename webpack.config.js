const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env = {}) => {
  const { mode = 'development' } = env
  const isDev = mode === 'development'

  const getStyleLoaders = () => [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']

  return {
    mode,

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
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

    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
        filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css'
      })
    ],

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
      extensions: ['*', '.js'],
      alias: {
        src: path.resolve(__dirname, 'src')
      }
    },

    devtool: isDev ? 'eval-source-map' : false,

    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
  }
}
