const EksplendorDB = require('../models/eksplendor');
const isAuthor = async (req, res, next) => {
    const { id } = req.params
    const place = await EksplendorDB.findById(id);
    if (place.author != req.user.id) {
        req.flash('error', 'Brak wystarczających uprawnień')
        return res.redirect('/places')
    }
    next();
};

module.exports = isAuthor;