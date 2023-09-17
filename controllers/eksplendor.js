const EksplendorDB = require('../models/eksplendor');
const ReviewDB = require('../models/review');
const { cloudinary } = require('../cloudinary/cloudinary');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.mapboxtoken;
const geocoder = mbxGeocoding({accessToken: mapBoxToken});



// Show all places
module.exports.allPlaces = async (req, res) => {
    const places = await EksplendorDB.find({}).populate('author')
    res.render('eksplendor/places', { places })
};

// Show user's map
module.exports.userMap = async (req, res) => {
    const userId = req.user
    const places = await EksplendorDB.find({ author: userId }).populate('author')
    res.render('eksplendor/usermap', { places });
};

// New place form
module.exports.newForm = (req, res) => {
    res.render('eksplendor/addplace')
};

// Adding new place
module.exports.newPlace = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.location,
        limit: 1
    }).send()
    const newImages = req.files.map(file => ({ url: file.path, filename: file.filename }));
    const newPlace = new EksplendorDB({
        name: req.body.name,
        location: req.body.location,
        geometry: geoData.body.features[0].geometry,
        author: req.user.id,
        images: newImages,
        description: req.body.description
    })
    await newPlace.save()
    req.flash('success', 'Successfully added')
    res.redirect(`/places/${newPlace.id}`)
};

// Show place
module.exports.showPlace = async (req, res, next) => {
    const { id } = req.params
    const place = await EksplendorDB.findById(id)
        .populate('author')
        .populate({ path: 'reviews', populate: { path: 'username' } })
    res.render('eksplendor/showplace', { place })
};

// Edit place form
module.exports.editForm = async (req, res, next) => {
    const { id } = req.params
    const place = await EksplendorDB.findById(id)
    res.render('eksplendor/editplace', { place })
};

// Editing place
module.exports.editPlace = async (req, res, next) => {
    const newImages = req.files.map(file => ({ url: file.path, filename: file.filename }));
    const { id } = req.params
    const geoData = await geocoder.forwardGeocode({
        query: req.body.location,
        limit: 1
    }).send()
    const editedPlace = await EksplendorDB.findByIdAndUpdate(id, {
        name: req.body.name,
        location: req.body.location,
        geometry: geoData.body.features[0].geometry,
        author: req.user.id,
        description: req.body.description
    }, {
        new: true,
        runValidators: true
    })
    editedPlace.images.push(...newImages)
    await editedPlace.save()
    if (req.body.deleteImages) {
        for(let filename of req.body.deleteImages) {
           await cloudinary.uploader.destroy(filename);
        }
        await editedPlace.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated')
    res.redirect(`/places/${editedPlace.id}`)
};

// Deleting place
module.exports.deletePlace = async (req, res) => {
    const { id } = req.params
    const place = await EksplendorDB.findById(id)
    for (let image of place.images) {
        const filename = image.filename;
        await cloudinary.uploader.destroy(filename);
      }
    const deletedPlace = await EksplendorDB.findByIdAndDelete(id)
    await ReviewDB.deleteMany({
        _id: {
            $in: deletedPlace.reviews
        }
    })
    req.flash('success', 'Successfully deleted')
    res.redirect('/places')
};