const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_400');
});

const opts = { toJSON: { virtuals: true } };
const EksplendorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: false,
    },
    images: [ImageSchema],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, opts);

EksplendorSchema.virtual('properties.popUpMarkup').get(function () {
    return `<h3><a href="/places/${this.id}">${this.name}</a></h3><p>dodano przez <b>${this.author.username}</b>.</p><p>${this.location}</p>`
});

const Place = mongoose.model('Place', EksplendorSchema);
module.exports = Place;