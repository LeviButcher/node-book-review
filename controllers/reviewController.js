const mongoose = require('mongoose')
const Review = mongoose.model('Review')

exports.addReviewPage = (req, res) => {
  res.render('addReview', { title: 'Add Review' })
}

// This should direct you to the review page
exports.addReview = async (req, res) => {
  const newReview = new Review(req.body)
  console.log(req.body)
  await newReview.save()
  res.redirect(`/Review/${newReview._id}`)
}

exports.getReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id })
  console.log(review)
  res.render('reviewPage', { title: 'Review', review })
}
