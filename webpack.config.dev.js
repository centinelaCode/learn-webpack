const path = require('path');
const htmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const copyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
   entry: "./src/index.js",
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'assets/images/[hash][ext][query]'
   },
   mode: 'development',
   watch: true,
   resolve: {
      extensions: ['.js'],
      alias: {
         '@utils': path.resolve(__dirname, 'src/utils/'),
         '@templates': path.resolve(__dirname, 'src/templates/'),
         '@styles': path.resolve(__dirname, 'src/styles/'),
         '@images': path.resolve(__dirname, 'src/assets/images/')
      }
   },
   module: {
      rules: [      
         {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader'
            }
         },
         {
            // extencion de file stylus .styl
            test: /\.css|.scss$/i,
            use: [MiniCssExtractPlugin.loader, 
               "css-loader",
               "sass-loader"
            ],
         },
         {
            test: /\.png/,
            type: 'asset/resource'
         },
         {
            test: /\.(woff|woff2)$/,
            use: {
               loader: 'url-loader',
               options: {
                  limit: 10000,
                  mimetype: "application/font-woff",
                  name: "[name].[contenthash].[ext]",
                  outputPath: "./assets/fonts/",
                  publicPath: "../assets/fonts/",
                  esModule: false
               }
            }
         }
      ]
   },
   plugins: [
      new htmlWebPackPlugin({
         inject: true,
         template: './public/index.html',
         filename: './index.html'
      }),
      new MiniCssExtractPlugin({
         filename: 'assets/[name][contenthash].css'
      }),
      new copyPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, "src","assets/images"),
               to: "assets/images"
            }
         ]
      }),
      new Dotenv()
   ]
}
