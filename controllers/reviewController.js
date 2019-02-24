const mongoose = require('mongoose');
const Review = mongoose.model('Review');

exports.addReviewPage = (req, res) => {
  res.render('addReview', { title: 'Add Review' });
};

// This should direct you to the review page
exports.addReview = async (req, res) => {
  req.body.author = req.user._id;
  const newReview = new Review(req.body);
  await newReview.save();
  res.redirect(`/Review/${newReview.slug}`);
};

exports.getReview = async (req, res) => {
  const review = await Review.findOne({ slug: req.params.slug });
  res.render('reviewPage', { title: 'Review', review });
};

exports.getTopReviews = async (req, res) => {
  // a page consists of 10 reviews
  // page 1 is the first 10 top rated reviews
  const count = 10;
  const page = req.query.page || 1;
  const skip = page > 1 ? page * count - count : 0;

  const totalPromise = Review.find()
    .sort({ rating: -1 })
    .count();
  const reviewPromise = Review.find()
    .sort({ rating: -1 })
    .skip(skip)
    .limit(count);

  const [total, reviews] = await Promise.all([totalPromise, reviewPromise]);
  const totalPages = total / count;
  res.render('topReviews', {
    title: 'Top Reviews',
    reviews,
    page,
    count,
    totalPages,
  });
};

exports.searchReviews = async (req, res) => {
  const search = req.query.search;
  const count = 1;
  const page = req.query.page || 1;
  const skip = page > 1 ? page * count - count : 0;

  const totalPromise = Review.find({ $text: { $search: search } }).count();
  const reviewPromise = Review.find({ $text: { $search: search } })
    .skip(skip)
    .limit(count);

  const [total, reviews] = await Promise.all([totalPromise, reviewPromise]);

  const totalPages = total / count;
  res.render('searchPage', {
    title: 'Search',
    reviews,
    search,
    page,
    count,
    totalPages,
  });
};
