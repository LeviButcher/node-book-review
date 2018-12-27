require('dotenv').config({ path: 'variables.env' })

// Get Mongoose connect to DB
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE)
mongoose.Promise = global.Promise
mongoose.connection.on('error', (err) => {
  console.error(`DB connection error ➡️ ${err.message}`)
})

// Import all models
require('./models/Review')

// Get and Start up the App
const app = require('./app')
app.set('port', process.env.PORT || 7777)

const server = app.listen(app.get('port'), () => {
  console.log(`Express running ➡️ PORT ${server.address().port}`)
})
