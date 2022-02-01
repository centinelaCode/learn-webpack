const path = require('path');
const htmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const copyPlugin = require('copy-webpack-plugin');

module.exports = {
   entry: "./src/index.js",
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
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
