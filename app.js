const express = require('express')
const routes = require('./routes/index')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

// Create the Express App
const app = express()

// webpack config
const config = require('./webpack.config')
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

// Set up pug
app.set('views', path.join(__dirname, 'views/'))
app.set('view engine', 'pug')

// Set up our app to use our routes and and have our routes root be at root(/)
app.use('/', routes)

// Export our set up app!
module.exports = app
