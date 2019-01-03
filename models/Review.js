const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('slug')

const reviewSchema = new Schema({
  bookName: {
    type: String,
    required: 'You must supply a BookName!'
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author!'
  },
  content: {
    type: String,
    required: 'You must supply Content!'
  },
  created: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
})

reviewSchema.pre('save', async function (next) {
  if (!this.isModified('bookName')) {
    next()
    return
  }
  this.slug = slug(this.bookName)
  // Find other reviews with same book-name
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i')
  const storesWithSlug = await this.constructor.find({ slug: slugRegEx })
  if (storesWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`
  }
  next()
})

function autopopulate (next) {
  this.populate('author')
  next()
}

reviewSchema.pre('find', autopopulate)
reviewSchema.pre('findOne', autopopulate)

module.exports = mongoose.model('Review', reviewSchema)
