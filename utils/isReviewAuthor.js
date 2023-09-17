const ReviewDB = require('../models/review');
const isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params
    const review = await ReviewDB.findById(reviewId);
    if (review.username != req.user.id) {
        req.flash('error', 'Lack of sufficient permissions')
        return res.redirect(`/places/${id}`)
    }
    next();
};

module.exports = isReviewAuthor;