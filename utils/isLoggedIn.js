const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You have to be logged in');
        return res.redirect('/user/login')
    }
    next();
};

module.exports = isLoggedIn;
