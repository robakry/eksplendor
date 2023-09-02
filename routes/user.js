const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const storeReturnTo = require('../utils/storeReturnTo')
const passport = require('passport');
const user = require('../controllers/user')



// New user form
router.get('/register', user.newForm);

// Adding new user
router.post('/register', catchAsync(user.newUser));

// Login form
router.get('/login', user.loginForm);

// User login
router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/eksplendor/user/login' }), user.loginUser);

// User logout
router.get('/logout', user.userLogout);


module.exports = router;
