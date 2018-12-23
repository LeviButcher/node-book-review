const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins () { return [autoprefixer({ browsers: 'last 3 versions' })] }
  }
}

const config = {
  mode: 'development',
  entry: './public/javascript/index.js',
  devtool: 'source-map',
  output: {
    filename: 'App.bundle.js',
    path: path.resolve(__dirname, '/public', 'dist'),
    publicPath: '/public/dist/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader?sourceMap', postcss, 'sass-loader?sourceMap' ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'App.bundle.css' })
  ]
}

module.exports = config
