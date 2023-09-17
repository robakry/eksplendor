const BaseJoi = require('joi');
const AsyncError = require('./asyncError');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': 'It cannot contain HTML characters.'
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
                "string.min": "Comment must be longer than two characters.",
                "string.max": "Comment cannot be longer than 1000 characters.",
                "any.required": "Comment cannot be empty."
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