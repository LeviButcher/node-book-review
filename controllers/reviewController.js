const mongoose = require("mongoose");
const Review = mongoose.model("Review");

exports.addReviewPage = (req, res) => {
  res.render("addReview", { title: "Add Review" });
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
  res.render("reviewPage", { title: "Review", review });
};

exports.getTopReviews = async (req, res) => {
  // a page consists of 10 reviews
  // page 1 is the first 10 top rated reviews
  const count = 1;
  const page = req.query.page || 1;
  const skip = page > 1 ? page * count - count : 0;

  const reviews = await Review.find()
    .sort({ rating: -1 })
    .skip(skip)
    .limit(count);
  res.render("topReviews", { title: "Top Reviews", reviews, page, count });
};
