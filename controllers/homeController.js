const mongoose = require('mongoose')
const Review = mongoose.model('Review')

exports.homePage = async (req, res) => {
  const reviews = await Review.find().sort({ created: 'desc' }).limit(10)
  res.render('home', { title: 'Home', reviews })
}
