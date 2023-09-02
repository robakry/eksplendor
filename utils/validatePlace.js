const BaseJoi = require('joi');
const AsyncError = require('./asyncError');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label} nie może zawierać znaków HTML}'
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
                "string.min": "Nazwa miejsca musi być dłuższa niż dwa znaki",
                "string.max": "Nazwa miejsca nie może być dłuższa niż 40 znaków",
                "anyrequired": "Nazwa miejsca nie może być pusta"
            })
            .escapeHTML(),
        location: Joi.string()
            .min(2)
            .max(150)
            .required()
            .messages({
                "string.min": "Lokalizacja miejsca musi być dłuższa niż dwa znaki",
                "string.max": "Lokalizacja miejsca nie może być dłuższa niż 150 znaków",
                "any.required": "Lokalizacja miejsca nie może być pusta"
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