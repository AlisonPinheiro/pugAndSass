// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pug = {
    test: /\.pug$/,
    loader: "pug-loader",
    options: {
      pretty: true
    }
  };
  

  const config = {
    entry: './src/js/app.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [pug]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/pug/index.pug',
        inject: false
      })
   ]
  };
  module.exports = config;