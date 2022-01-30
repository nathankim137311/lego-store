// Validation 
const Joi = require('joi');

// Register Validation 
const registerValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(10).required(),
        country: Joi.string().required(), 
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;