const path = require('path');
const htmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const copyPlugin = require('copy-webpack-plugin');

module.exports = {
   entry: "./src/index.js",
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      assetModuleFilename: 'assets/images/[hash][ext][query]'
   },
   resolve: {
      extensions: ['.js']
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
                  name: "[name].[ext]",
                  outputPath: "./assets/fonts/",
                  publicPath: "./assets/fonts/",
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
      new MiniCssExtractPlugin(),
      new copyPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, "src","assets/images"),
               to: "assets/images"
            }
         ]
      })
   ]
}
