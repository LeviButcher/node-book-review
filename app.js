const express = require('express')
const routes = require('./routes/index')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const bodyParser = require('body-parser')
const helpers = require('./helpers')

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

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers
  res.locals.user = req.user || null
  res.locals.currentPath = req.path
  next()
})

// Set up our app to use our routes and and have our routes root be at root(/)
app.use('/', routes)

// Export our set up app!
module.exports = app
