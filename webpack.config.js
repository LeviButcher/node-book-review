const path = require('path')

const config = {
  mode: 'development',
  entry: './public/javascript/index.js',
  devtool: 'source-map',
  output: {
    filename: 'App.bundle.js',
    path: path.resolve(__dirname, '/public', 'dist'),
    publicPath: '/public/dist/'
  }
}

module.exports = config
