const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/app/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: [
      '.js', '.jsx',
    ],
    alias: {
      src: path.resolve('src'),
      app: path.resolve('src/app'),
      actions: path.resolve('src/app/actions'),
      assets: path.resolve('src/app/assets'),
      components: path.resolve('src/app/components'),
      reducers: path.resolve('src/app/reducers'),
      services: path.resolve('src/app/services'),
      store: path.resolve('src/app/store'),
      constants: path.resolve('src/app/constants'),
      utils: path.resolve('src/app/utils'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {loader: 'css-loader', options: {
              modules: true,
              sourceMap: true,
              minimize: true,
              discardComments: {
                removeAll: true
              },
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"}
            },
            {
              loader: "postcss-loader",
              options: {
                modules: true,
                sourceMap: true,
                minimize: true,
                discardComments: {
                  removeAll: true
                }
              }
            }
          ]
        })
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true,
                discardComments: {
                  removeAll: true
                }
              },
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      }, {
        test: /\.(jsx|js)$/,
        use: 'babel-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
      }, {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        use: ['file-loader?name=images/[name].[ext]', 'image-webpack-loader'],
      }, {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
            }
        }]
      }
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  cache: true,
  devtool: 'source-map',
  plugins: !isProduction
    ? [
      new HtmlWebpackPlugin({
        title: 'Insure Inverstors - Dashboard',
        minify: {
          collapseWhitespace: isProduction,
        },
        hash: false,
        template: './src/index.html',
      }),
      new ExtractTextPlugin({
        filename: 'app.css',
        allChunks: true,
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.DefinePlugin({
        API_URL: JSON.stringify(process.env.API_URL),
      }),
    ]
    : [
      new HtmlWebpackPlugin({
        title: 'Insure Investors Dashboard',
        minify: {
          collapseWhitespace: isProduction,
        },
        hash: false,
        template: './src/index.html',
      }),
      new ExtractTextPlugin({
        filename: 'app.css',
        disable: !isProduction,
        allChunks: true,
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.DefinePlugin({
        API_URL: JSON.stringify(process.env.API_URL),
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
          drop_console: true,
        },
        output: {
          comments: false,
        },
      }),
    ],
};
