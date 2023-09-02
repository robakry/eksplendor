const EksplendorDB = require('../models/eksplendor');
const ReviewDB = require('../models/review')




// Adding new rewiev
module.exports.newReview = async (req, res, next) => {
    const { id } = req.params
    const place = await EksplendorDB.findById(id)
    const review = new ReviewDB({
        reviewtext: req.body.reviewtext,
        username: req.user.id
    })
    place.reviews.push(review);
    await place.save()
    await review.save()
    req.flash('success', 'Pomyślnie dodano')
    res.redirect(`/places/${place.id}`)
};

//Deleting review
module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params
    const place = await EksplendorDB.findById(id)
    const deletedReviewEksDB = await EksplendorDB.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    const deletedReview = await ReviewDB.findByIdAndDelete(reviewId)
    req.flash('success', "Pomyślnie usunięto")
    res.redirect(`/places/${place.id}`)
};