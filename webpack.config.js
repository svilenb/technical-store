const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'public/javascripts'),
  entry: {
    home_index: './home_index.js',
    categories_products: './categories_products.js',
    admin_categories: "./admin_categories.js",
    admin_category: "./admin_category.js",
    admin_create_category: "./admin_create_category.js",
    signup_index: "./signup_index.js"
  },
  mode: process.env.NODE_ENV || 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{
        from: "../img",
        to: "img",
      }]
    }),
  ]
};
