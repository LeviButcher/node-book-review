const express = require('express')
const promisify = require('es6-promisify')
const routes = require('./routes/index')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const bodyParser = require('body-parser')
const helpers = require('./helpers')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const expressValidator = require('express-validator')
const errorHandlers = require('./handlers/errorHandlers')
require('./handlers/passport')

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

// Expose validator methods
app.use(expressValidator())

// populates req.cookies with any cookies that came along
app.use(cookieParser())

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Passport JS stuff
app.use(passport.initialize())
app.use(passport.session())

// Flash pop ups
app.use(flash())

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers
  res.locals.flashes = req.flash()
  res.locals.user = req.user || null
  res.locals.currentPath = req.path
  next()
})

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req)
  next()
})

// Set up our app to use our routes and and have our routes root be at root(/)
app.use('/', routes)

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound)

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors)

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors)
}

// production error handler
app.use(errorHandlers.productionErrors)

// Export our set up app!
module.exports = app
