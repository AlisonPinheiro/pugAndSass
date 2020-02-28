/* webpack.config.js */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pjson = require('./package.json');
const fs = require('fs')

const nVersion = `${pjson.version}`;
const nProject = `${pjson.name}`


function generateHtmlPlugins (templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map(item => {
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]
    return new HTMLWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
    })
  })
}

const htmlPlugins = generateHtmlPlugins('./src/pug/pages')

module.exports = {
  entry: [ './src/css/index.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `js/${nProject}-${nVersion}.min.js`
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader }, 
          'css-loader', 
          'sass-loader'
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/${nProject}-${nVersion}.min.css`,
    }),
  ]
  // We join our htmlPlugin array to the end
  // of our webpack plugins array.
  .concat(htmlPlugins)
}