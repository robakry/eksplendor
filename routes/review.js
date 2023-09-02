const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const validateReview = require('../utils/validateReview');
const isLoggedIn = require('../utils/isLoggedIn')
const isReviewAuthor = require('../utils/isReviewAuthor')
const review = require('../controllers/review')



// New review form
router.get('/new', isLoggedIn, catchAsync(review.newForm));

// Adding new rewiev
router.post('/', isLoggedIn, validateReview, catchAsync(review.newReview));

//Deleting review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(review.deleteReview));


module.exports = router;
