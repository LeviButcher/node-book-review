const express = require('express')
const homeController = require('../controllers/homeController')
const reviewController = require('../controllers/reviewController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const { catchErrors } = require('../handlers/errorHandlers')
const router = express.Router()

// Home
router.get('/', catchErrors(homeController.homePage))
router.get('/home', catchErrors(homeController.homePage))

// Review
router.get('/review/add', reviewController.addReviewPage)
router.post('/review/add', catchErrors(reviewController.addReview))
router.get('/review/:id', catchErrors(reviewController.getReview))

// Login and Registration
router.get('/register', userController.registerPage)
router.get('/login', userController.loginPage)

router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
)

router.post('/login', authController.login)

router.get('/logout', authController.logout)

module.exports = router
