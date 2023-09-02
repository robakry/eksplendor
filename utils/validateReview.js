const BaseJoi = require('joi');
const AsyncError = require('./asyncError');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': 'Nie może zawierać znaków HTML}'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

const validateReview = (req, res, next) => {
    const reviewSchema = Joi.object({
        reviewtext: Joi.string()
            .min(3)
            .max(1000)
            .required()
            .messages({
                "string.min": "Komentarz musi być dłuższy niż dwa znaki",
                "string.max": "Komentarz nie może być dłuższy niż 1000 znaków",
                "any.required": "Komentarz nie może być pusty"
            })
            .escapeHTML(),
        username: Joi.string()
        .allow(null, '')
        .escapeHTML()
    });
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new AsyncError(msg, 400)
    } else {
        next();
    }
};
module.exports = validateReview;