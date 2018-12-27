const express = require('express')
const homeController = require('../controllers/homeController')
const reviewController = require('../controllers/reviewController')
const { catchErrors } = require('../handlers/errorHandlers')
const router = express.Router()

// Home
router.get('/', catchErrors(homeController.homePage))
router.get('/home', catchErrors(homeController.homePage))

// Review
router.get('/review/add', reviewController.addReviewPage)
router.post('/review/add', catchErrors(reviewController.addReview))
router.get('/review/:id', catchErrors(reviewController.getReview))

module.exports = router
