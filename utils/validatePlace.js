const BaseJoi = require('joi');
const AsyncError = require('./asyncError');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': 'It cannot contain HTML characters'
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

const validatePlace = (req, res, next) => {
    const placeSchema = Joi.object({
        name: Joi.string()
            .min(2)
            .max(40)
            .required()
            .messages({
                "string.min": "Place name must be longer than two characters",
                "string.max": "Place name cannot be longer than 40 characters",
                "any.required": "Place name cannot be empty"
            })
            .escapeHTML(),
        location: Joi.string()
            .min(2)
            .max(150)
            .required()
            .messages({
                "string.min": "Location of the place must be longer than two characters",
                "string.max": "Location of the place cannot be longer than 150 characters",
                "any.required": "Location of the place cannot be empty"
            })
            .escapeHTML(),
        geometry: Joi.string()
            .allow(null, ''),
        user: Joi.string()
            .allow(null, ''),
        description: Joi.string()
            .allow(null, '')
            .escapeHTML(),
        images: Joi.string()
            .allow(null, ''),
        reviews: Joi.string()
            .allow(null, ''),
        deleteImages: Joi.array()
            .allow(null, '')
    });
    const { error } = placeSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new AsyncError(msg, 400)
    } else {
        next();
    }
};
module.exports = validatePlace;