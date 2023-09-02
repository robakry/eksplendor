const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ReviewSchema = new Schema({
    reviewtext: String,
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;