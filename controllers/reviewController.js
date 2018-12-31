const mongoose = require('mongoose')
const Review = mongoose.model('Review')

exports.addReviewPage = (req, res) => {
  res.render('addReview', { title: 'Add Review' })
}

// This should direct you to the review page
exports.addReview = async (req, res) => {
  req.body.author = req.user._id
  const newReview = new Review(req.body)
  await newReview.save()
  res.redirect(`/Review/${newReview.slug}`)
}

exports.getReview = async (req, res) => {
  const review = await Review.findOne({ slug: req.params.slug })
  console.log(review)
  res.render('reviewPage', { title: 'Review', review })
}
