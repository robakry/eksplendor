const User = require('../models/user');



// New user form
module.exports.newForm = (req, res) => {
    res.render('eksplendor/users/register')
};

// Adding new user
module.exports.newUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ username, email });
        const registerUser = await User.register(user, password);
        req.login(registerUser, err => {
            if (err) return next(err);
            req.flash('success', 'Pomyślnie utworzono');
            res.redirect('/places');
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/user/register')
    }
};

// Login form
module.exports.loginForm = (req, res) => {
    res.render('eksplendor/users/login')
};

// User login
module.exports.loginUser = async (req, res) => {
    req.flash('success', 'Pomyślnie zalogowano');
    const redirectUrl = res.locals.returnTo || '/places/usermap';
    res.redirect(redirectUrl);
};

// User logout
module.exports.userLogout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Pomyślnie wylogowano');
        res.redirect('/places');
    });
};