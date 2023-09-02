const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const validatePlace = require('../utils/validatePlace');
const isLoggedIn = require('../utils/isLoggedIn');
const isAuthor = require('../utils/isAuthor');
const eksplendor = require('../controllers/eksplendor');
const multer  = require('multer');
const { storage } = require('../cloudinary/cloudinary');
const upload = multer({ storage });



// Show all places
router.get('/', catchAsync(eksplendor.allPlaces));

// Show user's map
router.get('/usermap', isLoggedIn, catchAsync(eksplendor.userMap));

// New place form
router.get('/new', isLoggedIn, eksplendor.newForm);

// Adding new place
router.post('/', isLoggedIn, upload.array('image'), validatePlace, catchAsync(eksplendor.newPlace));

// Show place
router.get('/:id', catchAsync(eksplendor.showPlace));

// Edit place form
router.get('/:id/editplace', isLoggedIn, isAuthor, catchAsync(eksplendor.editForm));

// Editing place
router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validatePlace, catchAsync(eksplendor.editPlace));

// Deleting place
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(eksplendor.deletePlace));


module.exports = router;
