const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  bookName: {
    type: String,
    required: 'You must supply a BookName!'
  },
  content: {
    type: String,
    required: 'You must supply Content!'
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Review', reviewSchema)
